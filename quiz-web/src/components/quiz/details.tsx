// TODO: improve socket connection and disconnection
import { IAgoraRTCClient, IAgoraRTCRemoteUser, createClient } from 'agora-rtc-sdk-ng/esm';
import { Button, Progress, message } from 'antd';
import { AxiosResponse } from 'axios';
import { Drawer } from 'antd';
import { Avatar } from 'antd';
import frame from '../../assets/figma/Frame.svg';
import vector from '../../assets/figma/Vector.svg';
import vector1 from '../../assets/figma/Vector1.svg';
import moment, { Duration } from 'moment';
import coinImg from '../../assets/coin.svg';
import tipHost from '../../assets/tiphost.svg';
import ticketImg from '../../assets/ticket.svg';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ic_speakerOff from '../../assets/ic_speakerOff.svg';
import ic_speakerOn from '../../assets/ic_speakerOn.svg';
import liveIcon from '../../assets/live-icon.svg';
import { Modal } from 'antd';
import CountUp from 'react-countup';
import userCountIcon from '../../assets/user-count-icon.svg';
import { OPTION_PROGRESS_COLORS, SOCKET_EMITTERS, SOCKET_LISTENERS } from '../../constants/enum';
import { SocketContext } from '../../context/socket.context';
import { convertDate, getQuizBackgroundImage, showMessages } from '../../helpers/utils';
import { setUserData } from '../../redux/actions/auth.action';
import { setMiscellaneousData } from '../../redux/actions/miscellaneous.action';
import { RootState } from '../../redux/reducers';
import sideMenuSvg from '../../assets/side-menu.svg';
import {
  getAgoraRtcToken,
  getQuizDetail,
  getQuizState,
  getQuestionWithOption,
  getOnlyQuestion,
} from '../../service/quiz/quiz.service';
import { createShadowUser } from '../../service/user/user.service';
import { IOption, IQuestionResponse, IQuestionStats, IQuiz } from '../../types/quiz.types';
import { QuizLiveStart, QuizLiveChange, USERLiveViewCount } from '../../types/socket.types';
import { ILoginResponse, TCreateUser } from '../../types/user.type';
import BackTab from '../back-tab';
import Leaderboard from '../leaderboard';
import './style.css';
import group_red from '../../assets/figma/Group_red.svg';
import group_yel from '../../assets/figma/Ellipse1.svg';
import facebookImg from '../../assets/social/facebook.svg';
import instagramImg from '../../assets/social/instagram.svg';
import twitterImg from '../../assets/social/twitter.svg';
import whatsappImg from '../../assets/social/whatsapp.svg';
import { getTicket, getHandleTip } from '../../service/user/user.service';
import { reduceTicket, getexistUser } from '../../service/user/user.service';
import { getModalData } from '../../service/quiz/quiz.service';
import { checkOutBuyticketSessionSocket } from '../../service/payment/payment.service';
import soundFile from '../../assets/coundown_timer_mixdown.mp3';
import './1.css';
import backEclipse from '../../assets/backelipse.svg';
import smallEclipse from '../../assets/return.svg';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
const channelName = 'test';
const appId = 'b75cc48b972d4ccc92edb71a1c75fb23';

// now connect to socket server

const QuizDetail: React.FC = (): React.ReactElement => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const stateRef = useRef();
  const socket = useContext(SocketContext)?.socket;
  const [open, setOpen] = useState(false);
  const [quizData, setQuizData] = useState<IQuiz>();
  const [isVideoSubed, setIsVideoSubed] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [isShowpool, setIsShowpool] = useState(false);
  const [viewQuestions, setViewQuestions] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<IQuestionResponse>();
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [totalNumberOfQuestions, setTotalNumberOfQuestions] = useState<number>(0);
  const [isOptionSubmitted, setIsOptionSubmitted] = useState(false);
  const [optionStartTime, setOptionStartTime] = useState<moment.Moment>();
  const [timeTakenToAnswer, setTimeTakenToAnswer] = useState<Duration>(moment.duration(0));
  const [timerProgress, setTimerProgress] = useState<number>(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showCalcuation, setShowCalcuation] = useState(false);
  const [liveUserCount, setLiveUserCount] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isTip, setIsTip] = useState(false);
  const [numberParticipants, setNumberParticipants] = useState(0);
  const [ticket, setTicket] = useState(0);
  const [amount, setAmount] = useState(50);
  const [credit, setCredit] = useState(0);
  const [userAmount, setUserAmount] = useState(0);
  const [startAnimation, setStartAnimation] = useState(false);
  const [currentQuizContent, setCurrentQuizContent] = useState({
    correct: 0,
    avatar: sideMenuSvg,
    totalQuestion: 0,
    rank: 1000000000000000,
    rewardAmount: 0,
    ticket: 0,
    credit: 0,
    amount: 0,
    rewardCredit: 0,
  });
  const [newShadowUser, setNewShadowUser] = useState({
    id: '',
    username: '',
  });
  const navigate = useNavigate();
  const [isParticipants, setIsParticipants] = useState(false);
  const [isSocketConnected, setIsSocketConnected] = useState<boolean | undefined>(undefined);
  const [isticket, setIsticket] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const [isPaused, setIsPaused] = useState(false);
  const [value, setValue] = useState(1);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [audio] = useState(new Audio(soundFile));
  const [isSpinning, setIsSpinning] = useState(false);
  const videoRef = useRef<any>(null);
  const [timerInterval, setTimerInterval] = useState<any>(null);
  const timerRef = useRef<any>(null);
  const trackRef = useRef<any>(null);
  const viewQuestionRef = useRef<any>(null);
  const [remoteVideoTracks, setRemoteVideoTracks] = useState<any>(null);
  const [remoteAudioTracks, setRemoteAudioTracks] = useState<any>(null);

  useEffect(() => {
    socket?.on('amount_update_user_broadcast', (data) => {
      setAmount(data.amount);
      setNumberParticipants(data.playCount);
    });

    return () => {
      socket?.off('amount_update_user_broadcast');
    };
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 5000); // 3000ms equals 3 seconds.

    // This will clear Timeout when component unmount like in willComponentUnmount
    return () => {
      clearTimeout(timer);
    };
  }, []);
  useEffect(() => {
    stateRef.current = remoteAudioTracks;
  }, [remoteAudioTracks]);
  useEffect(() => {
    if (user != null) {
      if (user.role == 'user') {
        const data: TCreateUser = { id: user?.id };
        getTicket(data)
          .then((res) => {
            setTicket(res.data?.data?.ticket);
            setUserAmount(res.data?.data?.amount);
            setCredit(res.data?.data?.credit);
            if (res.data?.data?.credit < 10) {
              setIsTip(true);
            }
          })
          .catch((e) => console.log(e));
      }
    }
    videoRef.current?.style.setProperty('display', 'none');
    timerRef.current?.style.setProperty('display', 'none');
    const statejoin = localStorage.getItem('isjoinchanel');

    if (statejoin == 'true') {
      fetchQuizState();
    }
    // Function to log socket connection status
    const logConnectionStatus = () => {
      // console.log('Socket connected:', socket?.connected);
      setIsSocketConnected(socket?.connected);
      showMessages('success', 'Socket connected: ' + socket?.connected);
    };

    socket?.on('connect', logConnectionStatus);
    // Add a listener for the 'test' event

    socket?.on(SOCKET_LISTENERS.USER_QUIZ_LIVE_CHANGE, (data: QuizLiveChange) => {
      if (data?.status === 'ongoing') {
        setIsPaused(false);
        videoRef.current?.style.setProperty('display', 'block');
      } else {
        setIsPaused(true);
        setIsShowpool(false);
        videoRef.current?.style.setProperty('display', 'none');
        timerRef.current?.style.setProperty('display', 'none');
        setTimerProgress(0);
        setIsOptionSubmitted(false);
      }
    });
    socket?.on('amount_update_user_broadcast', (data) => {
      setAmount(data.amount);
      setNumberParticipants(data.playCount);
    });
    socket?.on('user_joined', (data) => {
      setIsLoading(false);
    });
    // host_live_change

    socket?.on(SOCKET_LISTENERS.QUIZ_LIVE_START, (data: QuizLiveStart) => {
      console.log('quiz_live_start ::######### ', data);
      setIsPaused(false);
      setIsShowpool(false);
      // check if quiz id is same as current quiz id and then update quiz status
    });

    socket?.on(SOCKET_LISTENERS.USER_QUIZ_LIVE_CALCULATION_START, () => {
      calculationStart();
    });

    socket?.on(SOCKET_LISTENERS.USER_QUIZ_LIVE_CALCULATION_END, () => {
      stopSpin();
      calculationEnd();
    });

    socket?.on(SOCKET_LISTENERS.USER_QUIZ_LIVE_QUESTION, (data: IQuestionResponse) => {
      console.log('user_quiz_live_question :: ', data);
      if (data.question_index) setQuestionIndex(data.question_index);
      if (data.total_questions) setTotalNumberOfQuestions(data.total_questions);

      setCurrentQuestion(data);
      toggleQuestion(true);
      setIsOptionSubmitted(false);
    });
    socket?.on(SOCKET_LISTENERS.USER_SHOW_POOL, (data: IQuestionResponse) => {
      // Assuming you have a localAudioTrack already

      if (data?.status === 'hide') {
        setIsPaused(false);
        setIsShowpool(false);

        videoRef.current?.style.setProperty('border-radius', '0px');
        videoRef.current?.style.removeProperty('left');
        videoRef.current?.style.removeProperty('top');
        videoRef.current?.style.setProperty('position', 'relative');
      } else {
        setIsPaused(false);

        setIsShowpool(true);
        videoRef.current?.style.setProperty('display', 'block');

        videoRef.current?.style.setProperty('left', '39%');
        timerRef.current?.style.setProperty('left', '36.6%');
        videoRef.current?.style.setProperty('top', '8%');
        timerRef.current?.style.setProperty('top', '6.6%');
        // add  full radius to video
        videoRef.current?.style.setProperty('border-radius', '50px');
        timerRef.current?.style.setProperty('border-radius', '50px');
        videoRef.current?.style.setProperty('position', 'absolute');
      }
    });

    socket?.on(SOCKET_LISTENERS.USER_QUIZ_LIVE_QUESTION_OPTIONS, (data: IQuestionResponse) => {
      setOptionStartTime(moment());
      playSound();
      timerRef.current?.style.setProperty('display', 'block');
      startTimer(15);
      setCurrentQuestion(data);
    });

    socket?.on(SOCKET_LISTENERS.USER_QUIZ_LIVE_QUESTION_END, (data: IQuestionResponse) => {
      const totalNumberOfAllOptionsAnswered = data?.question?.options?.reduce((acc: number, curr: IOption) => {
        return acc + (curr.total_answers || 0);
      }, 0);
      const username = JSON.parse(localStorage.getItem('user')!).user.name;
      const id = JSON.parse(localStorage.getItem('user')!).user.id;
      socket?.emit('user_useranswer_save', {
        user_id: user?.id || id,
        quiz_id: data.quiz_id,
        username: user?.username || username,
        question_id: data.question,
      });

      setCurrentQuestion((prevCurrentQuestion) => {
        if (!prevCurrentQuestion) return prevCurrentQuestion;
        data.question?.options?.forEach((option: IOption) => {
          prevCurrentQuestion.question?.options?.forEach((prevOption: IOption) => {
            if (option._id === prevOption._id) {
              prevOption.is_correct = option.is_correct;
              prevOption.progress_bar_value = parseFloat(
                (((option.total_answers || 0) / (totalNumberOfAllOptionsAnswered || 1)) * 100).toFixed(2)
              );
              prevOption.total_answers = option.total_answers || 0;
              prevOption.progress_bar_stroke_color = option.is_correct
                ? OPTION_PROGRESS_COLORS.USER_SELECTION_CORRECT
                : OPTION_PROGRESS_COLORS.WRONG_OPTION;
              prevOption.progress_bar_background_color = option.is_correct
                ? 'USER_SELECTION_CORRECT_BG'
                : 'USER_SELECTION_WRONG_BG';
            }
          });
        });
        return prevCurrentQuestion;
      });
      killTimerOnButtonClick();
      setTimeout(() => {
        toggleQuestion(false);
      }, 3000);
    });

    // listen for user quiz live question result

    socket?.on('user_quiz_live_end', () => {
      localStorage.setItem('isjoinchanel', 'false');
      //    localStorage.setItem('iscounted', 'false');
      setIsPaused(false);

      setIsShowpool(false);
      leaveChannel();
    });

    socket?.on(SOCKET_LISTENERS.USER_QUIZ_LIVE_VIEWER_COUNT, (data: USERLiveViewCount) => {
      setLiveUserCount(data.viewer_count);
      console.log('user_quiz_live_viewer_count :: ', data);
    });

    // socket?.on(SOCKET_LISTENERS.HOST_EMOJI_RECEIVED, (data: any) => {
    //   console.log('host_emoji_received :: ', data);
    // });

    socket?.on(SOCKET_LISTENERS.USER_QUIZ_LIVE_QUESTION_ANSWER, (data: IQuestionStats) => {
      const totalNumberOfAllOptionsAnswered = data.totalAnswers.reduce((acc: number, curr: IOption) => {
        return acc + (curr.total_answers || 0);
      }, 0);
      // add total answers to current question
      setCurrentQuestion((prevCurrentQuestion) => {
        if (!prevCurrentQuestion) return prevCurrentQuestion;

        const updatedQuestion = { ...prevCurrentQuestion };

        data.totalAnswers.forEach((totalAnsOption: IOption) => {
          updatedQuestion?.question?.options?.forEach((option: IOption) => {
            if (option._id === totalAnsOption._id) {
              option.total_answers = totalAnsOption.total_answers;
              option.is_correct = totalAnsOption.is_correct;
              option.progress_bar_value = parseFloat(
                (((totalAnsOption.total_answers || 0) / totalNumberOfAllOptionsAnswered) * 100).toFixed(2)
              );
            }
          });
        });

        return updatedQuestion;
      });
    });

    // socket?.on(SOCKET_LISTENERS.HOST_LIVE_QUIZ_QUESTION_START, (data: any) => {
    //   console.log('host_live_quiz_question_start :: ', data);
    // });

    // socket?.on(SOCKET_LISTENERS.USER_QUIZ_LIVE_QUESTION_ANSWER, (data: any) => {
    //   console.log('user_quiz_live_question_answer :: ', data);
    // });

    console.log(socket);

    if (!socket?.connected) {
      // retry socket connection
      socket?.connect();
      showMessages('loading', 'Please wait while we connect you to the quiz....');
    } else {
      setIsSocketConnected(socket?.connected);
      showMessages('success', 'Socket connected: ' + socket?.connected);
    }

    // setSocket(socket)

    // });

    // Clean up on component unmount
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }

      // Remove event listeners
      socket?.off('connect', logConnectionStatus);
      socket?.off('test');
      // socket?.off(SOCKET_LISTENERS.USER_SHOW_POOL);

      socket?.off(SOCKET_LISTENERS.USER_QUIZ_LIVE_CHANGE);
      socket?.off('host_live_change');
      socket?.off(SOCKET_LISTENERS.QUIZ_LIVE_START);
      socket?.off('user_mute');
      socket?.off(SOCKET_LISTENERS.USER_QUIZ_LIVE_CALCULATION_START);
      socket?.off(SOCKET_LISTENERS.USER_QUIZ_LIVE_CALCULATION_END);
      socket?.off(SOCKET_LISTENERS.USER_QUIZ_LIVE_QUESTION);
      socket?.off(SOCKET_LISTENERS.USER_QUIZ_LIVE_QUESTION_OPTIONS);
      socket?.off(SOCKET_LISTENERS.USER_QUIZ_LIVE_QUESTION_END);
      socket?.off(SOCKET_LISTENERS.USER_QUIZ_LIVE_QUESTION_RESULT);
      socket?.off(SOCKET_LISTENERS.USER_QUIZ_LAST_QUESTION);
      socket?.off(SOCKET_LISTENERS.USER_QUIZ_LIVE_VIEWER_COUNT);
      socket?.off(SOCKET_LISTENERS.HOST_EMOJI_RECEIVED);
      socket?.off(SOCKET_LISTENERS.USER_QUIZ_LIVE_QUESTION_ANSWER);
      socket?.off(SOCKET_LISTENERS.HOST_LIVE_QUIZ_QUESTION_START);
      socket?.off(SOCKET_LISTENERS.USER_QUIZ_LIVE_QUESTION_ANSWER);
      socket?.off('host_live_end');

      leaveChannel();

      // Disconnect from the socket
      socket?.disconnect();
    };
  }, []);

  useEffect(() => {
    localStorage.removeItem('prevPath');
    const state = JSON.parse(localStorage.getItem('setmodal'));
    if (state == true) {
      setIsModalOpen2(true);
      toggleLeaderboardHandler(true);
      localStorage.removeItem('setmodal'); // remove the item
    }
    const stateJoin = JSON.parse(localStorage.getItem('isjoinchanel'));
    if (stateJoin == true) {
      joinChannel();   
    }
  }, []);

  const calculationStart = async () => {
    videoRef.current?.style.setProperty('display', 'none');
    timerRef.current?.style.setProperty('display', 'none');
    startSpin();
    setShowCalcuation(true);
  };

  const calculationEnd = async () => {
    setShowCalcuation(false);
    const id = JSON.parse(localStorage.getItem('user')!).user.id;
    const data = await getModalData(user?.id || id);
    console.log('datadata', data?.data?.data);
    localStorage.setItem('isjoinchanel', 'false');
    //  localStorage.setItem('iscounted', 'fals e');
    toggleLeaderboardHandler(true);
    setCurrentQuizContent((prevState) => ({
      ...prevState,
      correct: data?.data?.data?.result?.correct,
      avatar: data?.data?.data?.result?.avatar,
      totalQuestion: data?.data?.data?.result?.totalquestion,
      rank: data?.data?.data?.result?.rank,
      rewardAmount: data?.data?.data?.result?.rewardAmount,
      rewardCredit: data?.data?.data?.result?.rewardCredit,
      credit: data?.data?.data?.credit,
      amount: data?.data?.data?.amount,
      ticket: data?.data?.data?.ticket,
    }));
    // setAmount(data?.data?.data?.amount);
    // setCredit(data?.data?.data?.credit);
    if (user?.role == 'user') {
      setIsModalOpen2(true);
    } else {
      setIsModalOpen3(true);
    }
  };

  const playSound = () => {
    audio.play();

    // Play the sound for 15 seconds
    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 15000); // Stop the sound after 15 seconds
  };
  const fetchQuizState = async () => {
    const data = { quiz: id };
    const res = await getQuizState(data);
    try {
      const iscounted = localStorage.getItem('iscounted');
      if (iscounted == 'true') {
        socket?.emit(SOCKET_EMITTERS.USER_JOIN_LIVE_QUIZ, {
          user_id: user?.id || newShadowUser.id,
          role: user?.role,
          username: user?.username || newShadowUser.username,
          quiz_id: id,
          state: 'refresh',
        });
      } else {
        socket?.emit(SOCKET_EMITTERS.USER_JOIN_LIVE_QUIZ, {
          user_id: user?.id,
          quiz_id: id,
          role: user?.role,
          username: user?.username,
        });
      }
      localStorage.setItem('iscounted', 'true');
      const randomUid = Math.floor(Math.random() * 1000);
      const rtcToken = await getAgoraRtcToken('test', 'audience', 'uid', randomUid);
      await client
        .join(appId, channelName, rtcToken.data.data, randomUid)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      message.destroy();
      videoRef.current.hidden = false;
      // videoRef.current?.style.setProperty('display', 'block');
      toggleQuestion(false);
      dispatch(setMiscellaneousData({ topBarVisibility: false }));
      client.on('user-published', onUserPublish);
      client.on('user-unpublished', (user: IAgoraRTCRemoteUser, mediaType: 'video' | 'audio') => {
        if (mediaType === 'video') {
          user.videoTrack?.stop();
        }
        if (mediaType === 'audio') {
          user.audioTrack?.stop();
        }
        leaveChannel();
      });
    } catch (e) {
      console.log(e);
    }
    videoRef.current?.style.setProperty('display', 'block');

    switch (res.data.data.status) {
      case 'paused':
        videoRef.current?.style.setProperty('display', 'none');
        setIsPaused(true);
        setIsShowpool(false);
        break;
      case 'showpool':
        showCircle();
        setIsPaused(false);
        setIsShowpool(true);
        setAmount(res.data?.data?.pool);
        setNumberParticipants(res.data?.data?.contestants);
        break;
      case 'quiz': {
        videoRef.current?.style.setProperty('display', 'none');
        setIsPaused(false);
        setIsShowpool(false);
        const query_question_start = { question_id: res.data.data.question_id };
        const quizStartQuestions = await getOnlyQuestion(query_question_start);
        setQuestionIndex(res.data.data.question_index);
        setTotalNumberOfQuestions(res.data.data.total_questions);
        setCurrentQuestion(quizStartQuestions.data);
        toggleQuestion(true);
        setIsOptionSubmitted(false);
        break;
      }
      case 'quiz_answer': {
        videoRef.current?.style.setProperty('display', 'none');
        setIsPaused(false);
        setIsShowpool(false);
        const query_answer = { question_id: res.data.data.question_id };
        toggleQuestion(true);
        const quizAnswerQuestions = await getQuestionWithOption(query_answer);
        setCurrentQuestion(quizAnswerQuestions.data);
        setQuestionIndex(res.data.data.question_index);
        setTotalNumberOfQuestions(res.data.data.total_questions);
        timerRef.current?.style.setProperty('display', 'block');
        setOptionStartTime(moment());
        startTimer(15);
        break;
      }
    }
  };
  const showCircle = () => {
    videoRef.current?.style.setProperty('display', 'block');

    videoRef.current?.style.setProperty('left', '39%');
    timerRef.current?.style.setProperty('left', '36.6%');
    videoRef.current?.style.setProperty('top', '8%');
    timerRef.current?.style.setProperty('top', '6.6%');
    // add  full radius to video
    videoRef.current?.style.setProperty('border-radius', '50px');
    timerRef.current?.style.setProperty('border-radius', '50px');
    videoRef.current?.style.setProperty('position', 'absolute');
  };
  const showModal = () => {
    setIsModalOpen1(true);
  };

  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };
  const handleCancel2 = () => {
    toggleLeaderboardHandler(true);

    setIsModalOpen2(false);
  };

  const handleCancel3 = () => {
    setIsModalOpen3(false);
    toggleLeaderboardHandler(true);
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const client: IAgoraRTCClient = createClient({
    mode: 'rtc',
    codec: 'vp8',
    role: 'audience',
  });
  const startSpin = () => {
    setIsSpinning(true);
  };

  const stopSpin = () => {
    setIsSpinning(false);
  };

  const handleTip = async () => {
    const data = { rank: currentQuizContent.rank, id: user?.id || newShadowUser.id, state: isticket };
    await getHandleTip(data).then((res) => {
      if (res.status == 200) {
        setIsTip(true);
      }
    });
  };

  const useTicket = async () => {
    if (ticket < 1) {
      showMessages('error', 'Please buy the ticket');
      return;
    } else {
      const data: TCreateUser = { id: user?.id || `defaultId` };
      socket?.emit('increase_pool_amount_user', { email: user?.email, quiz_id: id, ticket: 1 });
      setTicket((prevAmount) => prevAmount - 1);
      const result = await reduceTicket(data);
      console.log('resut', result);
      if (result.status == 200) {
        setIsParticipants(true);
        setIsModalOpen1(false);

        setIsticket(true);
      }
      console.log('reduceTicketresult', result);
    }
  };

  const useCredit = () => {
    showModal();
  };

  const toggleLeaderboardHandler = useCallback((status: boolean) => {
    setShowLeaderboard(status);
    setIsVideoSubed(status);
  }, []);
  const toggleSummaryHandler = useCallback((status: boolean) => {
    console.log('toggleSummaryHandler', toggleSummaryHandler);
    if (status) {
      videoRef.current?.style.setProperty('display', 'none');
      timerRef.current?.style.setProperty('display', 'none');
    } else {
      videoRef.current?.style.setProperty('display', 'block');
      // timerRef.current?.style.setProperty("display", "block");
    }

    setIsVideoSubed(status);
  }, []);

  const onUserPublish = async (user: IAgoraRTCRemoteUser, mediaType: 'video' | 'audio') => {
    console.log(`User with ID: ${user.uid} has joined the channel with ${mediaType}`);
    if (mediaType === 'video') {
      const remoteVideoTrack = await client.subscribe(user, mediaType);
      remoteVideoTrack.play('remote-video');

      setRemoteVideoTracks(remoteVideoTrack);
      setIsVideoSubed(true);
    }
    if (mediaType === 'audio') {
      const remoteAudioTrack = await client.subscribe(user, mediaType);
      remoteAudioTrack.play();
      trackRef.current = remoteAudioTrack;
      setRemoteAudioTracks(remoteAudioTrack);
    }
  };

  const toggleStreamAudio = useCallback(() => {
    if (audio.volume == 1) {
      // Check if the track is playing
      trackRef.current.stop();
      audio.volume = 0;
      setIsMuted(true);
    } else {
      // remoteAudioTracks.play(); // If so, stop it
      audio.volume = 1;
      trackRef.current.play();
      setIsMuted(false);
    }
  }, [audio.volume]);

  const leaveChannel = useCallback(async () => {
    // emitted when user leaves the live quiz
    // localStorage.setItem('isjoinchanel', 'false');
    localStorage.setItem('iscounted', 'false');

    socket?.emit(SOCKET_EMITTERS.USER_LEAVE_LIVE_QUIZ, { user_id: user?.id || newShadowUser.id, quiz_id: id });

    if (remoteAudioTracks) {
      remoteAudioTracks.stop();
    }
    if (remoteVideoTracks) {
      remoteVideoTracks.stop();
    }

    await client
      .leave()
      .then(() => {
        console.log('Left the channel successfully');
      })
      .catch((err) => {
        console.log('Failed to leave the channel', err);
      });

    videoRef.current?.srcObject?.getTracks().forEach((track: any) => track.stop());
    videoRef.current.srcObject = null;
    videoRef.current.hidden = true;
    videoRef.current?.style.setProperty('display', 'none');
    setIsJoined(false);
    setIsVideoSubed(false);
    setViewQuestions(false);
    setAmount(50);
    setIsPaused(false);
    setIsParticipants(false);
    console.log('showleadderboard', showLeaderboard);
    // if(iscalculaed==false){
    //   setShowLeaderboard(false);
    // }
    timerRef.current?.style.setProperty('display', 'none');
    setTimerProgress(0);
    setIsOptionSubmitted(false);
    setOptionStartTime(undefined);
    setQuestionIndex(0);
    setTotalNumberOfQuestions(0);
    setCurrentQuestion(undefined);
  }, [id, user, client, remoteAudioTracks, remoteVideoTracks]);

  const killTimerOnButtonClick = useCallback(() => {
    // Assuming timerInterval is stored using useState like so:
    // const [timerInterval, setTimerInterval] = useState<ReturnType<typeof setInterval> | null>(null);

    if (timerInterval !== null) {
      clearInterval(timerInterval);
      setTimerInterval(null); // Updates the reference to the current interval to 'null'
    }
  }, [timerInterval]);

  const joinChannel = async () => {
    setIsLoading(true);

    // message.loading("Joining Quiz");
    showMessages('loading', 'Joining Quiz');

    if (isJoined) {
      showMessages('error', 'You are already in the quiz');
      return;
      //  await leaveChannel();
    }
    if (!socket?.connected) {
      socket?.connect();
      showMessages('error', 'Please wait while we connect you to the quiz');
    }
    if (!user && isChecked == false) {
      console.log('useruser');
      setIsLoading(true);
      // create shadow user and join
      const shadowUser: AxiosResponse<ILoginResponse> = await createShadowUser();
      setIsChecked(true);
      dispatch(setUserData(shadowUser.data.user));
      localStorage.setItem('user', JSON.stringify(shadowUser.data));
      setNewShadowUser((prevState) => ({
        ...prevState,
        id: shadowUser.data.user.id,
        username: shadowUser.data.user.name,
      }));
      socket?.emit(SOCKET_EMITTERS.USER_JOIN_LIVE_QUIZ, {
        user_id: shadowUser.data.user.id,
        quiz_id: id,
        role: 'shadow',
        username: shadowUser.data.user.name,
      });

      const randomUid = Math.floor(Math.random() * 1000);

      const rtcToken = await getAgoraRtcToken('test', 'audience', 'uid', randomUid);

      await client
        .join(appId, channelName, rtcToken.data.data, randomUid)
        .then((res) => {
          console.log('resres###########', res);
        })
        .catch((err) => {
          console.log(err);
        });
      setIsLoading(false);
      setIsJoined(true);
      localStorage.setItem('isjoinchanel', 'true');
      localStorage.setItem('iscounted', 'true');
      message.destroy();
      videoRef.current.hidden = false;
      videoRef.current?.style.setProperty('display', 'block');
      toggleQuestion(false);
      dispatch(setMiscellaneousData({ topBarVisibility: false }));

      client.on('user-published', onUserPublish);

      client.on('user-unpublished', (user: IAgoraRTCRemoteUser, mediaType: 'video' | 'audio') => {
        if (mediaType === 'video') {
          user.videoTrack?.stop();
        }
        if (mediaType === 'audio') {
          user.audioTrack?.stop();
        }
        leaveChannel();
      });

      setTimeout(() => {
        setIsLoading(false);
      }, 3500);
    }

    if (user) {
      const idData = { id: user?.id };
      const res = await getexistUser(idData);

      if (res.data.data == null) {
        console.log('res.data.data', res.data);
        console.log('############################');
        socket?.emit(SOCKET_EMITTERS.USER_JOIN_LIVE_QUIZ, {
          user_id: user?.id,
          quiz_id: id,
          role: user?.role,
          username: user?.username,
        });

        const randomUid = Math.floor(Math.random() * 1000);

        const rtcToken = await getAgoraRtcToken('test', 'audience', 'uid', randomUid);

        await client
          .join(appId, channelName, rtcToken.data.data, randomUid)
          .then((res) => {
            console.log('resres###########', res);
          })
          .catch((err) => {
            console.log(err);
          });
        setIsLoading(false);
        setIsJoined(true);
        localStorage.setItem('isjoinchanel', 'true');
        localStorage.setItem('iscounted', 'true');
        message.destroy();
        videoRef.current.hidden = false;
        videoRef.current?.style.setProperty('display', 'block');
        toggleQuestion(false);
        dispatch(setMiscellaneousData({ topBarVisibility: false }));

        client.on('user-published', onUserPublish);

        client.on('user-unpublished', (user: IAgoraRTCRemoteUser, mediaType: 'video' | 'audio') => {
          if (mediaType === 'video') {
            user.videoTrack?.stop();
          }
          if (mediaType === 'audio') {
            user.audioTrack?.stop();
          }
          leaveChannel();
        });
      } else {
        showMessages('error', 'already Joined');
        setIsLoading(false);
      }
    }
    const reqData = { quiz: id };
    const res = await getQuizState(reqData);

    if (res?.data?.data?.status != undefined) {
      switch (res.data.data.status) {
        case 'paused':
          videoRef.current?.style.setProperty('display', 'none');
          setIsPaused(true);
          setIsShowpool(false);
          break;
        case 'showpool':
          showCircle();
          setIsPaused(false);
          setIsShowpool(true);
          setAmount(res.data.data.pool);
          setNumberParticipants(res.data.data.contestants);
          break;
        case 'quiz': {
          videoRef.current?.style.setProperty('display', 'none');
          setIsPaused(false);
          setIsShowpool(false);
          const query_question_start = { question_id: res.data.data.question_id };
          const quizStartQuestions = await getOnlyQuestion(query_question_start);
          setQuestionIndex(res.data.data.question_index);
          setTotalNumberOfQuestions(res.data.data.total_questions);
          setCurrentQuestion(quizStartQuestions?.data);
          toggleQuestion(true);
          setIsOptionSubmitted(false);
          break;
        }
        case 'quiz_answer': {
          videoRef.current?.style.setProperty('display', 'none');
          setIsPaused(false);
          setIsShowpool(false);
          const query_answer = { question_id: res.data.data.question_id };
          toggleQuestion(true);
          const quizAnswerQuestions = await getQuestionWithOption(query_answer);
          setCurrentQuestion(quizAnswerQuestions.data);
          setQuestionIndex(res.data.data.question_index);
          setTotalNumberOfQuestions(res.data.data.total_questions);
          timerRef.current?.style.setProperty('display', 'block');
          setOptionStartTime(moment());
          startTimer(15);
          break;
        }
      }
    }
  };

  const startTimer = useCallback((duration: number) => {
    const intervalDuration = (duration / 100) * 1000;
    const timerInterval = setInterval(() => {
      setTimerProgress((prevTimerProgress) => {
        if (prevTimerProgress >= 100) {
          clearInterval(timerInterval);
          setTimerInterval(null);
          return 0;
        }
        return prevTimerProgress + 1;
      });
    }, intervalDuration);
    setTimerInterval(timerInterval);
  }, []);
  const joinAgora = async () => {
    localStorage.setItem('iscounted', 'true');
    const randomUid = Math.floor(Math.random() * 1000);

    const rtcToken = await getAgoraRtcToken('test', 'audience', 'uid', randomUid);

    await client
      .join(appId, channelName, rtcToken.data.data, randomUid)
      .then((res) => {
        console.log('resres###########', res);
      })
      .catch((err) => {
        console.log(err);
      });

    setIsJoined(true);
    localStorage.setItem('isjoinchanel', 'true');
    localStorage.setItem('iscounted', 'true');
    message.destroy();
    videoRef.current.hidden = false;
    toggleQuestion(false);
    dispatch(setMiscellaneousData({ topBarVisibility: false }));

    client.on('user-published', onUserPublish);

    client.on('user-unpublished', (user: IAgoraRTCRemoteUser, mediaType: 'video' | 'audio') => {
      if (mediaType === 'video') {
        user.videoTrack?.stop();
      }
      if (mediaType === 'audio') {
        user.audioTrack?.stop();
      }
      leaveChannel();
    });
  };
  const handleBuyTicketClick = () => {
    let amount, ticket;
    switch (value) {
      case 1:
        amount = 300;
        ticket = 1;
        break;
      case 2:
        amount = 500;
        ticket = 2;
        break;
      case 3:
        amount = 2200;
        ticket = 10;
        break;
      case 4:
        amount = 3600;
        ticket = 20;
        break;
      default:
        amount = 0;
        ticket = 0;
    }

    console.log('location.pathname', location.pathname);
    let userName, userEmail;

    if (localStorage.getItem('user')) {
      userName = JSON.parse(localStorage.getItem('user')!).user.name;
      userEmail = JSON.parse(localStorage.getItem('user')!).user.email;
    }
    const data = {
      user: userName,
      email: userEmail,
      amount: amount,
      ticket: ticket,
      credit: credit,
      successful_url: location.pathname,
    };
    checkOutBuyticketSessionSocket(data)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          window.location.href = res.data.redirectUrl;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleJoinClick = () => {
    // Save the current path ('/quiz/:quizId/leaderboard') in local storage before navigating
    localStorage.setItem('prevPath', location.pathname);
    localStorage.setItem('setmodal', true);
    navigate('/signup');
  };
  const handleJoinCommunity = () => {
 
      const statejoin = localStorage.getItem('isjoinchanel');
    localStorage.setItem('prevPath', location.pathname);

    navigate('/signup');
  };
  const toggleQuestion = (toDisplay: boolean = false) => {
    setViewQuestions(toDisplay);

    videoRef.current?.style.setProperty('display', 'block');

    if (toDisplay) {
      videoRef.current?.style.setProperty('left', '39%');
      timerRef.current?.style.setProperty('left', '36.6%');
      videoRef.current?.style.setProperty('top', '8%');
      timerRef.current?.style.setProperty('top', '6.6%');
      // add  full radius to video
      videoRef.current?.style.setProperty('border-radius', '50px');
      timerRef.current?.style.setProperty('border-radius', '50px');
      videoRef.current?.style.setProperty('position', 'absolute');
    } else {
      videoRef.current?.style.setProperty('border-radius', '0px');
      videoRef.current?.style.removeProperty('left');
      videoRef.current?.style.removeProperty('top');
      videoRef.current?.style.setProperty('position', 'relative');

      timerRef.current?.style.setProperty('display', 'none');
      setTimerProgress(0);
      setIsOptionSubmitted(false);
    }
  };

  useEffect(() => {
    dispatch(setMiscellaneousData({ topBarVisibility: false }));
    if (id) {
      getQuizDetail(id)
        .then((res) => {
          console.log('quiz data', res.data.data);
          setQuizData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  // add type for onclick
  const onOptionClick = useCallback(
    (option: string) => {
      if (isOptionSubmitted) {
        showMessages('error', 'You have already submitted your answer');
        return;
      }

      const currentTime = moment();
      const momentDuration = moment.duration(currentTime.diff(optionStartTime));
      setTimeTakenToAnswer(momentDuration);

      const postAnswer = {
        username: user?.username || newShadowUser.username,
        user_id: user?.id || newShadowUser.id,
        quiz_id: id,
        question_id: currentQuestion?.question._id,
        option_id: option,
        duration: Number(momentDuration.asSeconds().toFixed(2)),
      };
      console.log('newShadowUser', newShadowUser);
      console.log('postAnswer', postAnswer);
      // emit user_submit_live_quiz_answer event to socket
      socket?.emit(SOCKET_EMITTERS.USER_SUBMIT_LIVE_QUIZ_ANSWER, postAnswer);

      setCurrentQuestion((prevCurrentQuestion) => {
        if (!prevCurrentQuestion) return prevCurrentQuestion;

        const updatedQuestion = { ...prevCurrentQuestion };

        updatedQuestion.question?.options?.forEach((option) => {
          if (option._id === postAnswer.option_id) {
            setTimeout(() => {
              option.progress_bar_value = 50;
            }, 200);
            option.progress_bar_stroke_color = OPTION_PROGRESS_COLORS.USER_SELECTION;
            option.progress_bar_background_color = 'USER_SELECTION_BG';
          }
        });

        return updatedQuestion;
      });

      setIsOptionSubmitted(true);
    },
    [currentQuestion, id, user]
  );

  return (
    <div className="h-full w-full relative">
      {/* <button onClick={calculationEnd}>sss</button> */}

      {!isVideoSubed && !showLeaderboard && (
        <BackTab
          text={convertDate(quizData?.start_date)}
          // text={moment(quizData?.start_time).format('dddd, MMMM Do, h:mm a')}
          onClick={() => {
            dispatch(setMiscellaneousData({ topBarVisibility: true }));
            navigate('/quiz');
          }}
        />
      )}
      {isVideoSubed && (
        <div className="absolute z-20 flex flex-row-reverse mt-6" id="live-stream-header">
          <div className="absolute flex justify-center w-full">
            <img src={liveIcon} alt="live" height={20} />
          </div>
          <div className="mr-6 flex z-50 cursor-pointer items-center justify-center" onClick={toggleStreamAudio}>
            {/* {isMuted ? (
              <img src={ic_speakerOff} alt="speaker-off" width={24} height={26} />
            ) : (
              <img src={ic_speakerOn} alt="speaker-on" width={24} height={26} />
            )} */}
          </div>
          <div className="mr-5 flex">
            <img src={userCountIcon} alt="user-count" height={24} />
            <span className="pl-2 text-white">{liveUserCount}</span>
          </div>
        </div>
      )}
      {!isVideoSubed && quizData && !showLeaderboard && (
        <div className="py-2 h-[770px]  ">
          <img src={getQuizBackgroundImage(quizData.category.name).bgImage} alt="quiz-back" className="m-auto w-full" />
          <div className="mx-6 ">
            <div className="justify-center my-4 font-stud-regular tracking-wider">
              {quizData && quizData.description}
            </div>
            <Button
              type="primary"
              className="quiz-action-btn h-12 mt-6 shadow-none text-black font-bold rounded-3xl w-full"
              onClick={joinChannel}
              disabled={!isSocketConnected || isLoading}
            >
              Join Channel
            </Button>
            <div className="flex justify-between pt-8 px-12">
              <p>Share</p>
              <Link to="/" className="contents">
                <img src={facebookImg} alt="facebook" />
              </Link>
              <Link to="/" className="contents">
                <img src={twitterImg} alt="twitter" />
              </Link>
              <Link to="/" className="contents">
                <img src={whatsappImg} alt="whatsapp" />
              </Link>
              <Link to="/" className="contents">
                <img src={instagramImg} alt="instagram" />
              </Link>
            </div>
          </div>
        </div>
      )}

      <div>
        {quizData && user?.role === 'shadow' && !showLeaderboard && (
          <div className="absolute flex h-screen">
            <div
              style={{ backgroundColor: '#090B40' }}
              className="w-full flex max-w-430 pb-3 pt-4 rounded-t-2xl z-50 fixed bottom-0"
            >
              <Link to="/signup" className="w-full px-5">
                <Button onClick={handleJoinCommunity} type="primary" className="w-full text-black h-12 rounded-3xl">
                  <div className="flex justify-center px-4 gap-2">
                    <div className="flex text-black justify-center text-base font-bold text-center ">
                      Join Community, get Free 20
                    </div>
                    <img src={coinImg} width="24" height="24" alt="coin" />
                  </div>
                </Button>
              </Link>
            </div>
          </div>
        )}
        <Progress ref={timerRef} type="circle" percent={timerProgress} strokeColor={'#44E500'} className="absolute" />
        {viewQuestions && (
          <div className="w-96 h-12 mt-6 z-50 bottom-0" id="view-que">
            <div className="p-8 pt-48 text-base text-white font-stud-regular text-center">
              Question {`${questionIndex}`} of {`${totalNumberOfQuestions}`}
            </div>
            <div className="text-3xl p-3 text-white font-bold font-stud-regular text-center">
              {currentQuestion?.question.text}
            </div>  
            <div className="p-4">
              {currentQuestion?.question?.options?.map((option, index) => {
                return (
                  <div
                    className="relative cursor-pointer h-14 my-4"
                    onClick={() => onOptionClick(option._id)}
                    key={index}
                  >
                    <div className="absolute z-40 flex justify-between w-full font-stud-regular h-12">
                      <span className="pl-6 text-base font-bold  self-center">
                        {option.text}
                      </span>
                      <span className="pr-3 text-base self-center">{`${option.total_answers || 0}`}</span>
                    </div>
                    <Progress
                      percent={option.progress_bar_value}
                      strokeColor={option.progress_bar_stroke_color}
                      showInfo={false}
                      className={`absolute ${
                        option.progress_bar_background_color
                          ? option.progress_bar_background_color
                          : 'GENERAL_OPTIONS_BG'
                      }`}
                    />
                  </div>
                );
              })}
            </div>
            {isOptionSubmitted && (
              <div className="p-2 mt-2 text-sm text-white font-stud-regular text-center">
                You took {`${timeTakenToAnswer.asSeconds()}`} seconds to answer!
              </div>
            )}
          </div>
        )}
        {id && showLeaderboard && (
          <>
            <Leaderboard quizId={id} />
          </>
        )}

        {isParticipants && isShowpool && (
          <div className="mt-6 w-96 h-12  z-50 bottom-0" id="view-que">
            <div className="flex flex-col ">
              <div className="mt-48 flex flex-row justify-center p-4">
                <img src={frame} width={38.99} height={40} alt="frame" />
                <div className="text-customYellowBorder text-5xl  text-center font-bold studregular">${amount}</div>
              </div>

              <div className="mt-2 text-white text-center text-sm studregular font-bold  ">
                Estimated Prize Pool, each Ticket adds $1
              </div>
            </div>

            <div className="pr-8 pl-8 mt-4">
              <div className="studregular text-center text-2xl font-bold  text-white p-1">No. of Players:</div>
            </div>
            <div className="pr-8 pl-8 mt-8">
              <div className="studregular text-center text-4xl font-bold  text-white p-1">{numberParticipants}</div>
            </div>
            <div className="pr-8 pl-8 mt-8">
              <div className="studregular text-customYellowBorder text-center text-xl font-bold  p-1">
                You are now a Contestant
              </div>
              <div className="studregular text-customYellowBorder text-center text-xl font-bold   p-1">
                eligible to win from the
              </div>
              <div className="studregular text-customYellowBorder text-center text-xl font-bold  p-1">prize pool</div>
            </div>
          </div>
        )}

        {isShowpool && !isParticipants && (
          <div className="mt-6 w-96 h-12  z-50 bottom-0" id="view-que">
            <div className="flex flex-col ">
              <div className="mt-48 flex flex-row justify-center p-4">
                <img src={frame} width={38.99} height={40} alt="frame" />
                <div className="text-customYellowBorder text-5xl  text-center font-bold studregular">${amount}</div>
              </div>

              <div className="mt-2 text-white text-center text-sm studregular font-bold  ">
                Estimated Prize Pool, each Ticket adds $1
              </div>
            </div>

            <div className="mt-4 pr-8 pl-8 ">
              <div className="p-1 text-center text-2xl  text-white studregular">
                Join the Quiz and compete to be the winner by entering with a Ticket
              </div>
            </div>

            <>
              <div className="p-4">
                {user?.role === 'user' && (
                  <div className="flex justify-center">
                    <>
                      <div className="studregular font-bold text-xl text-white">Your account:</div>
                      <div className="flex ml-2">
                        <div className="flex justify-center items-center relative">
                          <img src={group_yel} alt="user2" className="border-4 rounded-full" />
                          <img
                            src={vector1}
                            alt="user2"
                            style={{ position: 'absolute', left: '5px', top: '8px' }}
                            className="border-4 rounded-full"
                          />
                          <div className="studregular ml-1 text-white font-bold text-xl">{credit}</div>
                        </div>
                        <div className="flex justify-center items-center ml-3">
                          <img src={group_red} alt="user2" className="border-4  rounded-full" />
                          <div className="studregular ml-1  text-white font-bold text-xl">{ticket}</div>
                        </div>
                      </div>
                    </>
                  </div>
                )}
              </div>
              {user?.role === 'user' && (
                <div>
                  <div className="flex mt-4 justify-center ">
                    <button
                      onClick={useCredit}
                      className="bg-customBlue w-[315px] h-[52px] top-[320px]  rounded-[30px] space-x-[6px]"
                    >
                      <div className="flex items-center justify-center">
                        <div className="mr-2 text-white text-center text-xl font-bold  studregular  ">Use 1 Ticket</div>
                        <img src={group_red} alt="user2" />
                      </div>
                    </button>
                  </div>
                  <div className="flex justify-center mt-8 mb-4">
                    <button
                      onClick={showDrawer}
                      className=" w-[315px] h-[52px] top-[320px] bg-customYellowBorder  rounded-[30px] space-x-[6px]"
                    >
                      <div className="flex items-center justify-center">
                        <div className="studregular text-black text-center text-xl font-bold  mr-2">Buy Tickets</div>
                        <img src={group_red} alt="user2" />
                      </div>
                    </button>
                  </div>
                </div>
              )}
              {user?.role != 'user' && (
                <div className="flex justify-center mt-4 mb-4">
                  <button
                    onClick={showDrawer}
                    className="bg-customBlue w-[315px] h-[52px] top-[320px] rounded-[30px] space-x-[6px]"
                  >
                    <div className="flex items-center justify-center">
                      <div className="studregular text-white text-center text-xl font-bold  mr-2">Buy Tickets</div>
                      <img src={group_red} alt="user2" />
                    </div>
                  </button>
                </div>
              )}
            </>
          </div>
        )}

        <div ref={viewQuestionRef} className="relative text-center" id="view-que-video">
          <video
            className={`m-auto flip-video block z-10 w-full ${
              isShowpool || viewQuestions ? 'max-100-100' : 'max-w-430'
            }`}
            // height={liveVideoHeight}
            // width={liveVideoWidth}
            id="remote-video"
            hidden={isVideoSubed ? false : true}
            ref={videoRef}
          ></video>
        </div>
      </div>
      {showCalcuation && (
        <div className="w-96 h-12 mt-6 z-50 bottom-0" id="view-que">
          <div className="flex items-center justify-center relative">
            <img src={smallEclipse} className="absolute top-[-50px] w-[400px] h-[800px]" />
            <img
              src={backEclipse}
              className={`App-logo absolute w-[70px] top-[320px] h-[80px] ${isSpinning ? 'spinning' : ''}`}
              alt="logo"
            />
          </div>
        </div>
      )}

      {isPaused && (
        <div className="w-96 h-12 mt-6 z-50 bottom-0" id="view-que">
          <p className="text-center h-full flex justify-center m-auto items-center text-yellow-400 text-4xl font-stud-regular">
            Quiz Paused
          </p>
        </div>
      )}

      <Drawer title="Basic Drawer" getContainer={false} height={550} onClose={onClose} open={open} placement="bottom">
        <div>
          <div>
            <div className="flex flex-col p-2 bg-gradient-to-bl bg-white ">
              <div className=" flex flex-row justify-center">
                <div className="ml-2 text-xl font-bold text-center studregular">Purchase Tickets</div>
              </div>
              <button
                onClick={() => {
                  setValue(1);
                }}
                className={`mt-2 flex p-4 border-3 px-4 border-solid items-center ${
                  value === 1 ? 'border-customYellowBorder bg-customYellowBg' : 'border-custom_gray'
                } rounded-3xl`}
              >
                <div className="text-base ml-2 text-black font-bold text-center studregular">S$3.00</div>
                <div className="ml-auto text-base text-black font-bold mr-3 text-center studregular">1</div>
                <img src={group_red} alt="user2" className="border-4  rounded-full" />
              </button>
              <button
                onClick={() => {
                  setValue(2);
                }}
                className={`mt-2 flex pb-1 px-2 border-3 border-solid items-center ${
                  value === 2 ? 'border-customYellowBorder bg-customYellowBg' : 'border-custom_gray'
                } rounded-3xl`}
              >
                <div className="flex flex-col justify-center">
                  <div className="ml-2 text-base text-black font-bold text-center ">S$5.00</div>
                  <div className="ml-2 p-1 bg-customBuleBg  text-white text-xs font-bold text-center">Save 16%</div>
                </div>

                <div className="ml-auto text-base font-bold text-black mr-3 text-center studregular">2</div>
                <img src={group_red} alt="user2" className="border-4  rounded-full" />
              </button>
              <button
                onClick={() => {
                  setValue(3);
                }}
                className={`mt-2 flex pb-1  px-2 border-3 border-solid items-center ${
                  value === 3 ? 'border-customYellowBorder bg-customYellowBg' : 'border-custom_gray'
                } rounded-3xl`}
              >
                <div className="flex flex-col justify-center">
                  <div className="ml-2 text-base text-black font-bold text-center ">S$22.00</div>
                  <div className="ml-2 p-1 bg-customBuleBg  text-white text-xs font-bold text-center">Save 24%</div>
                </div>

                <div className="ml-auto text-base text-black font-bold mr-3 text-center studregular">10</div>
                <img src={group_red} alt="user2" className="border-4  rounded-full" />
              </button>
              <button
                onClick={() => {
                  setValue(4);
                }}
                className={`mt-2 pb-1 flex  px-2 border-3 border-solid items-center ${
                  value === 4 ? 'border-customYellowBorder bg-customYellowBg' : 'border-custom_gray'
                } rounded-3xl`}
              >
                <div className="flex flex-col justify-center">
                  <div className="ml-2 text-black text-black text-base font-bold text-center ">S$36.00</div>
                  <div className="ml-2 p-1 bg-customBuleBg  text-white text-xs font-bold text-center">Save 42%</div>
                </div>

                <div className="ml-auto text-base text-black font-bold mr-3 text-center studregular">20</div>
                <img src={group_red} alt="user2" className="border-4  rounded-full" />
              </button>

              <div className="mt-1 text-sm font-bold text-center studregular">
                Purchased Tickets do not have an expiry date. Use them only when you want!
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-2 mb-4">
            <button
              onClick={handleBuyTicketClick}
              className="bg-customYellowBorder border-white w-[295px] h-[45px] top-[320px] rounded-[30px] space-x-[6px]"
            >
              <div className="flex items-center justify-center">
                <img src={vector} alt="user2" />
                <div className="ml-2 studregular text-center text-base font-bold text-black mr-2 ">
                  Continue to Payment
                </div>
              </div>
            </button>
          </div>
        </div>
      </Drawer>
      <Modal title="" open={isModalOpen1} footer={null} width={'300px'} onCancel={handleCancel1}>
        <div className="modal-box">
          <div className="flex justify-center mt-4 text-2xl font-bold text-center studregular mb-6">
            Confirm Ticket Use?
          </div>
          <div className="py-1 flex text-base  justify-center">You will use 1 Ticket and become a </div>
          <div className="py-1 flex text-base justify-center"> contestant in this quiz, eligible to </div>
          <div className="py-1 flex text-base  justify-center"> win the Prize Pool.</div>
          <div className="modal-action">
            <div className="justify-center flex">
              <button
                className="bg-customBlue   mt-8 w-[285px] h-[52px] top-[320px] rounded-[30px] space-x-[6px] border-white"
                onClick={useTicket}
              >
                <div className="flex text-white justify-center text-base font-bold text-center studregular">
                  Yes, confirm!
                </div>
              </button>
            </div>
            <div className="justify-center flex ">
              <Link to="#" className=" mt-8 space-x-[6px] border-white" onClick={handleCancel1}>
                <div className="flex text-customBlue justify-center text-base font-bold text-center underline">
                  Close
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Modal>
      <Modal title="" open={isModalOpen2} footer={null} width={'350px'} onCancel={handleCancel2}>
        <div className="modal-box">
          <div className="flex mt-6 items-center justify-center">
            <Avatar size={128} src={currentQuizContent.avatar} />
          </div>
          <div className="flex mt-2 items-center justify-center">
            <div className="text-base  text-black">{user?.username}</div>
          </div>
          {currentQuizContent.rank === 1000000000000000 ? (
            <></>
          ) : (
            <div className="flex justify-center text-[#1A3EEC] mt-4 text-base font-bold text-center studregular mb-6">
              Ranked {currentQuizContent.rank} /{liveUserCount}
              {currentQuizContent.rank < 4 && isticket == true && (
                <>
                  -{' '}
                  {currentQuizContent.rank === 1
                    ? '50'
                    : currentQuizContent.rank === 2
                    ? '25'
                    : currentQuizContent.rank === 3
                    ? '10'
                    : '0'}
                  % of Prize Pool
                </>
              )}
            </div>
          )}

          {currentQuizContent.rank < 4 && isticket == true && (
            <>
              <div className="flex  mt-2 mb-2 cursor-default text-black text-2xl font-bold text-center studregular  justify-center">
                You are a Winner!
              </div>
              <div className="flex justify-center cursor-default text-black  text-2xl font-bold text-center studregular mb-2">
                You won
              </div>
              <div className="flex justify-center cursor-default text-[#2F0861]  text-4xl font-bold text-center studregular mb-2">
                ${currentQuizContent.rewardAmount}
              </div>
            </>
          )}

          {!isticket &&
            (currentQuizContent.totalQuestion === currentQuizContent.correct || currentQuizContent.rank < 4) && (
              <>
                <div className="flex  mt-4 mb-2 text-black text-2xl font-bold text-center studregular  justify-center">
                  Wow, you could have
                </div>
                <div className="flex justify-center text-black  text-2xl font-bold text-center studregular mb-2">
                  been a winner if you
                </div>
                <div className="flex justify-center text-black  text-2xl font-bold text-center studregular mb-2">
                  used a ticket!
                </div>
              </>
            )}

          {currentQuizContent.rank > 3 && currentQuizContent.totalQuestion != currentQuizContent.correct && (
            <>
              <div className="flex  mt-4 mb-2 text-black text-2xl font-bold text-center studregular  justify-center">
                Not bad! You got
              </div>
              <div className="flex justify-center text-black  text-2xl font-bold text-center studregular mb-2">
                {currentQuizContent.correct} out of {currentQuizContent.totalQuestion}
              </div>
              <div className="flex justify-center text-black  text-2xl font-bold text-center studregular mb-2">
                Questions Right!
              </div>
            </>
          )}
          <div className="py-1 flex text-base  cursor-default justify-center">Your account: </div>
          <div className="flex justify-center cursor-default gap-2">
            <div className="flex items-center rounded-full border-white gap-1">
              <img src={coinImg} alt="coin" />
              <div className="text-xl font-bold  text-black font-stud-regular">
                {startAnimation && <CountUp start={credit} end={currentQuizContent.credit} duration={5} />}
              </div>
            </div>
            <div className="flex items-center   rounded-full border-white gap-2">
              <img src={ticketImg} alt="ticket" />
              <div className="text-xl font-bold  text-black font-stud-regular">{currentQuizContent.ticket}</div>
            </div>

            <div className="flex justify-center text-black text-xl font-bold text-center studregular">
              ${startAnimation && <CountUp start={userAmount} end={currentQuizContent.amount} duration={5} />}
            </div>
          </div>
          <div className="modal-action">
            {currentQuizContent.credit >= 10 ? (
              <>
                {currentQuizContent.rank < 4 && isticket == true ? (
                  <div className="justify-center flex">
                    <button
                      className={`mt-8 w-[325px] h-[52px] top-[320px] rounded-[30px] space-x-[6px] border-white 
              ${isTip ? 'bg-gray-400 cursor-not-allowed' : 'bg-customBlue'}`}
                      onClick={handleTip}
                      disabled={isTip}
                    >
                      <div className="flex justify-between px-2">
                        <div className="flex px-2 items-center gap-2">
                          <img src={tipHost} alt="user2" className="border-4  rounded-full" />
                          <span className="text-white  text-base font-bold text-center">Tip Host</span>
                        </div>

                        <div className="text-white text-2xl font-medium text-center studregular">$3</div>
                      </div>
                    </button>
                  </div>
                ) : (
                  <div className="justify-center flex">
                    <button
                      className={`mt-8 w-[325px] h-[52px] top-[320px] rounded-[30px] space-x-[6px] border-white 
            ${isTip ? 'bg-gray-400 cursor-not-allowed' : 'bg-customBlue'}`}
                      onClick={handleTip}
                      disabled={isTip}
                    >
                      <div className="flex justify-between px-2">
                        <div className="flex px-2 items-center gap-2">
                          <img src={tipHost} alt="user2" className="border-4  rounded-full" />
                          <span className="text-white  text-base font-bold text-center">Tip Host</span>
                        </div>
                        <div className="flex px-2 items-center gap-2">
                          <img src={coinImg} alt="user2" className="border-4  rounded-full" />
                          <div className="text-white text-2xl font-medium text-center studregular">10</div>
                        </div>
                      </div>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <></>
            )}

            <div className="justify-center flex ">
              <Link
                to="#"
                className=" mt-8 space-x-[6px] border-white"
                onClick={() => {
                  setIsModalOpen2(false);
                }}
              >
                <div className="flex text-customBlue justify-center text-base font-bold text-center underline">
                  Close
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Modal>
      <Modal title="" open={isModalOpen3} footer={null} width={'350px'} onCancel={handleCancel3}>
        <div className="modal-box">
          {currentQuizContent.correct === currentQuestion?.total_questions ? (
            <div>
              <div className="flex justify-center text-[#1A3EEC] mt-4 text-base font-bold text-center studregular mb-6">
                Unranked - Guest
              </div>
              <div className="flex  mt-4  text-black text-2xl font-bold text-center studregular  justify-center">
                Wow pretty cool!
              </div>
              <div className="flex justify-center text-black  text-2xl font-bold text-center studregular ">
                {' '}
                you got {currentQuizContent.correct} out of {currentQuizContent.totalQuestion}
              </div>
              <div className="flex justify-center text-black  text-2xl font-bold text-center studregular mb-8">
                {' '}
                Questions Right!
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-center text-[#1A3EEC] mt-4 text-base font-bold text-center studregular mb-6">
                Unranked - Guest
              </div>
              <div className="flex  mt-4  text-black text-2xl font-bold text-center studregular  justify-center">
                Not bad! You got
              </div>
              <div className="flex justify-center text-black  text-2xl font-bold text-center studregular ">
                {' '}
                {currentQuizContent.correct} out of {currentQuizContent.totalQuestion}
              </div>
              <div className="flex justify-center text-black  text-2xl font-bold text-center studregular mb-8">
                {' '}
                Questions Right!
              </div>
            </div>
          )}
          <div className=" flex text-base font-bold text-black  justify-center">Register for an account </div>
          <div className="flex text-base font-bold text-black justify-center">today to keep your score </div>
          <div className="flex text-base font-bold text-black justify-center">and get free credits! </div>

          <div className="modal-action">
            <div className="justify-center flex">
              <button
                onClick={handleJoinClick}
                className="bg-customYellowBorder mt-8 w-[325px] h-[52px] top-[320px] rounded-[30px] space-x-[6px] border-customYellowBorder"
                style={{ fontSize: window.innerWidth <= 412 ? 'small' : 'medium' }} // Change this line
              >
                <div className="flex justify-center px-2 gap-2">
                  <div className="flex text-black justify-center text-sm font-bold text-center">
                    Join Community, get Free 20
                  </div>
                  <img src={coinImg} width="16" height="16" alt="coin" />
                </div>
              </button>
            </div>

            <div className="justify-center flex ">
              <Link
                to="#"
                className=" mt-8 space-x-[6px] border-white"
                onClick={() => {
                  setIsModalOpen3(false);
                }}
              >
                <div className="flex text-customBlue justify-center text-base font-bold text-center underline">
                  Close
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default QuizDetail;
