// TODO: improve socket connection and disconnection
import { IAgoraRTCClient, IAgoraRTCRemoteUser, createClient } from 'agora-rtc-sdk-ng/esm';
import { Button, Progress, message } from 'antd';
import { AxiosResponse } from 'axios';
import { Drawer } from 'antd';
import frame from '../../assets/figma/Frame.svg';
import vector from '../../assets/figma/Vector.svg';
import vector1 from '../../assets/figma/Vector1.svg';
import sideMenuSvg from '../../assets/side-menu.svg';
import moment, { Duration } from 'moment';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ic_speakerOff from '../../assets/ic_speakerOff.svg';
import ic_speakerOn from '../../assets/ic_speakerOn.svg';
import liveIcon from '../../assets/live-icon.svg';
import { Modal } from 'antd';
import userCountIcon from '../../assets/user-count-icon.svg';
import { OPTION_PROGRESS_COLORS, SOCKET_EMITTERS, SOCKET_LISTENERS } from '../../constants/enum';
import { SocketContext } from '../../context/socket.context';
import { convertDate, getQuizBackgroundImage, showMessages } from '../../helpers/utils';
import { setUserData } from '../../redux/actions/auth.action';
import { setMiscellaneousData } from '../../redux/actions/miscellaneous.action';
import { RootState } from '../../redux/reducers';
import {
  getAgoraRtcToken,
  getQuizDetail,
  getQuizState,
  getQuestionWithOption,
  getOnlyQuestion,
} from '../../service/quiz/quiz.service';
import { createShadowUser } from '../../service/user/user.service';
import { IOption, IQuestionResponse, IQuestionStats, IQuiz } from '../../types/quiz.types';
import { QuizLiveStart } from '../../types/socket.types';
import { ILoginResponse } from '../../types/user.type';
import BackTab from '../back-tab';
import Leaderboard from '../leaderboard';
import './style.css';
import { useLocation } from 'react-router-dom';
import group_red from '../../assets/figma/Group_red.svg';
import group_yel from '../../assets/figma/Ellipse1.svg';
import facebookImg from '../../assets/social/facebook.svg';
import instagramImg from '../../assets/social/instagram.svg';
import twitterImg from '../../assets/social/twitter.svg';
import whatsappImg from '../../assets/social/whatsapp.svg';
import { getTicket } from '../../service/user/user.service';
import { reduceTicket } from '../../service/user/user.service';
import { checkOutBuyticketSessionSocket } from '../../service/payment/payment.service';

const channelName = 'test';
const appId = 'b75cc48b972d4ccc92edb71a1c75fb23';

// now connect to socket server

const QuizDetail: React.FC = (): React.ReactElement => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  const [timerInterval, setTimerInterval] = useState<any>(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [liveUserCount, setLiveUserCount] = useState(0);
  const [remoteVideoTracks, setRemoteVideoTracks] = useState<any>(null);
  const [remoteAudioTracks, setRemoteAudioTracks] = useState<any>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [numberParticipants, setNumberParticipants] = useState(0);
  const [ticket, setTicket] = useState(0);
  const [amount, setAmount] = useState(50);
  const [credit, setCredit] = useState(0);
  const [isParticipants, setIsParticipants] = useState(false);
  const [imageUrl, setImageUrl] = useState(sideMenuSvg);
  const [isSocketConnected, setIsSocketConnected] = useState<boolean | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<any>(null);
  const timerRef = useRef<any>(null);
  const viewQuestionRef = useRef<any>(null);
  const [value, setValue] = useState(1);
  const location = useLocation();
  const [isdoing, setIsDoing] = useState(false);

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
    if (user != null) {
      if (user.role == 'user') {
        const data = { id: user.id };

        getTicket(data)
          .then((res) => {
            setImageUrl(res.data.data.avatar);
            setTicket(res.data.data.ticket);
            setCredit(res.data.data.credit);
          })
          .catch((e) => console.log(e));

        console.log('###############');
      }
    }
  }, []);

  useEffect(() => {
    const fetchQuizState = async () => {
      const statejoin = localStorage.getItem('isjoinchanel');
      const res = await getQuizState();
      console.log('resres', res);
      if (res != undefined) {
        setIsDoing(true);
      }

      // if (statejoin == 'true' && res != undefined) {
      //   try {
      //     socket?.emit(SOCKET_EMITTERS.USER_JOIN_LIVE_QUIZ, { user_id: user?.id, quiz_id: id });
      //     switch (res.data.data.status) {
      //       case 'paused':
      //         setIsPaused(true);
      //         setIsShowpool(false);
      //         break;
      //       case 'showpool':
      //         setIsPaused(false);
      //         setIsShowpool(true);
      //         setAmount(res.data.data.pool);
      //         setNumberParticipants(res.data.data.contestants);
      //         break;
      //       case 'quiz':
      //         setIsPaused(false);
      //         setIsShowpool(false);
      //         const query_question_start = { question_id: res.data.data.question_id };
      //         const quizStartQuestions = await getOnlyQuestion(query_question_start);
      //         if (quizStartQuestions.data.question_index) setQuestionIndex(quizStartQuestions.data.question_index);
      //         if (quizStartQuestions.data.total_questions)
      //           setTotalNumberOfQuestions(quizStartQuestions.data.total_questions);
      //         setCurrentQuestion(quizStartQuestions.data);
      //         toggleQuestion(true);
      //         setIsOptionSubmitted(false);
      //         break;
      //       case 'quiz_answer':
      //         setIsPaused(false);
      //         setIsShowpool(false);
      //         const query_answer = { question_id: res.data.data.question_id };
      //         toggleQuestion(true);
      //         const quizAnswerQuestions = await getQuestionWithOption(query_answer);
      //         setCurrentQuestion(quizAnswerQuestions.data);
      //         break;
      //     }
      //   } catch (e) {
      //     console.log(e);
      //   }
      // }
    };
    fetchQuizState();
  }, []);
  useEffect(() => {
    // display to none for video element
    videoRef.current?.style.setProperty('display', 'none');
    timerRef.current?.style.setProperty('display', 'none');

    // Function to log socket connection status
    const logConnectionStatus = () => {
      // console.log('Socket connected:', socket?.connected);
      setIsSocketConnected(socket?.connected);
      showMessages('success', 'Socket connected: ' + socket?.connected);
    };

    socket?.on('connect', logConnectionStatus);
    // Add a listener for the 'test' event
    socket?.on('test', (data: any) => {
      console.log('test :: ', data);
    });

    socket?.on(SOCKET_LISTENERS.USER_QUIZ_LIVE_CHANGE, (data: any) => {
      if (data?.status === 'ongoing') {
        setIsPaused(false);
        videoRef.current?.style.setProperty('display', 'block');
      } else {
        setIsPaused(true);
        setIsShowpool(false);
        videoRef.current?.style.setProperty('display', 'none');
      }
    });
    socket?.on('amount_update_user_broadcast', (data) => {
      setAmount(data.amount);
      setNumberParticipants(data.playCount);
    });
    // host_live_change
    socket?.on('host_live_change', (data: any) => {
      console.log('host_live_change :: ', data);
    });
    socket?.on('host_live_change', (data: any) => {
      console.log('host_live_change :: ', data);
    });
    socket?.on(SOCKET_LISTENERS.QUIZ_LIVE_START, (data: QuizLiveStart) => {
      console.log('quiz_live_start ::######### ', data);

      // check if quiz id is same as current quiz id and then update quiz status
    });

    socket?.on(SOCKET_LISTENERS.USER_QUIZ_LIVE_CALCULATION_START, (data: any) => {
      console.log('user_quiz_live_calculation_start :: ', data);
    });

    socket?.on(SOCKET_LISTENERS.USER_QUIZ_LIVE_CALCULATION_END, (data: any) => {
      localStorage.setItem('isjoinchanel', 'false');

      console.log('user_quiz_live_calculation_end :: ', data);
      toggleLeaderboardHandler(false);
      
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
      if (data.status == 'hide') {
        setIsShowpool(false);
      } else {
        setIsPaused(false);
        setIsShowpool(true);
      }
    });

    socket?.on(SOCKET_LISTENERS.USER_QUIZ_LIVE_QUESTION_OPTIONS, (data: IQuestionResponse) => {
      setOptionStartTime(moment());
      timerRef.current?.style.setProperty('display', 'block');
      startTimer(15);
      setCurrentQuestion(data);
    });

    socket?.on(SOCKET_LISTENERS.USER_QUIZ_LIVE_QUESTION_END, (data: IQuestionResponse) => {
      const totalNumberOfAllOptionsAnswered = data?.question?.options?.reduce((acc: number, curr: IOption) => {
        return acc + (curr.total_answers || 0);
      }, 0);

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

      setTimeout(() => {
        toggleQuestion(false);
      }, 3000);
    });

    // listen for user quiz live question result
    socket?.on(SOCKET_LISTENERS.USER_QUIZ_LIVE_QUESTION_RESULT, (data: any) => {});

    socket?.on(SOCKET_LISTENERS.USER_QUIZ_LAST_QUESTION, (data: any) => {
      console.log('user_quiz_last_question :: ', data);
    });

    socket?.on(SOCKET_LISTENERS.USER_QUIZ_LIVE_VIEWER_COUNT, (data: any) => {
      setLiveUserCount(data.viewer_count);
      console.log('user_quiz_live_viewer_count :: ', data);
    });

    socket?.on(SOCKET_LISTENERS.HOST_EMOJI_RECEIVED, (data: any) => {
      console.log('host_emoji_received :: ', data);
    });

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

    socket?.on(SOCKET_LISTENERS.HOST_LIVE_QUIZ_QUESTION_START, (data: any) => {
      console.log('host_live_quiz_question_start :: ', data);
    });

    socket?.on(SOCKET_LISTENERS.USER_QUIZ_LIVE_QUESTION_ANSWER, (data: any) => {
      console.log('user_quiz_live_question_answer :: ', data);
    });

    socket?.on('host_live_end', (_: any) => {
      localStorage.setItem('isjoinchanel', 'false');
      leaveChannel();
    });

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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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

  const useTicket = async () => {
    if (ticket < 1) {
      showMessages('error', 'Please buy the ticket');
      return;
    } else {
      const data = { id: user.id };
      socket?.emit('increase_pool_amount_user', { email: user?.email, quiz_id: id, ticket: 1 });
      setTicket((prevAmount) => prevAmount - 1);
      await reduceTicket(data);
      setIsParticipants(true);
      setIsModalOpen(false);
    }
  };

  const useCredit = () => {
    showModal();
  };

  const toggleLeaderboardHandler = useCallback((status: boolean) => {
    console.log('toggleLeaderboardHandler', toggleLeaderboardHandler);
    if (status) {
      videoRef.current?.style.setProperty('display', 'none');
      timerRef.current?.style.setProperty('display', 'none');
    } else {
      videoRef.current?.style.setProperty('display', 'block');
      // timerRef.current?.style.setProperty("display", "block");
    }
    setShowLeaderboard(status);
    setIsVideoSubed(status);
  }, []);

  const onUserPublish = async (user: IAgoraRTCRemoteUser, mediaType: 'video' | 'audio') => {
    if (mediaType === 'video') {
      const remoteVideoTrack = await client.subscribe(user, mediaType);
      remoteVideoTrack.play('remote-video');
      setRemoteVideoTracks(remoteVideoTrack);
      setIsVideoSubed(true);
    }
    if (mediaType === 'audio') {
      const remoteAudioTrack = await client.subscribe(user, mediaType);
      remoteAudioTrack.play();
      setRemoteAudioTracks(remoteAudioTrack);
    }
  };

  const toggleStreamAudio = useCallback(() => {
    if (remoteAudioTracks?.isPlaying) {
      remoteAudioTracks.stop();
      setIsMuted(true);
    } else {
      remoteAudioTracks.play();
      setIsMuted(false);
    }
  }, [remoteAudioTracks]);

  const leaveChannel = useCallback(async () => {
    // emitted when user leaves the live quiz
    socket?.emit(SOCKET_EMITTERS.USER_LEAVE_LIVE_QUIZ, { user_id: user?.id, quiz_id: id });

    if (remoteAudioTracks) {
      remoteAudioTracks.stop();
    }
    if (remoteVideoTracks) {
      remoteVideoTracks.stop();
    }

    await client.leave();

    videoRef.current?.srcObject?.getTracks().forEach((track: any) => track.stop());
    videoRef.current.srcObject = null;
    videoRef.current.hidden = true;
    videoRef.current?.style.setProperty('display', 'none');
    setIsJoined(false);
    setIsVideoSubed(false);
    setViewQuestions(false);
    setIsPaused(false);
    timerRef.current?.style.setProperty('display', 'none');
    setTimerProgress(0);
    setIsOptionSubmitted(false);
    setOptionStartTime(undefined);
    setQuestionIndex(0);
    setTotalNumberOfQuestions(0);
    setCurrentQuestion(undefined);
    setShowLeaderboard(false);
  }, [id, user, client, remoteAudioTracks, remoteVideoTracks]);

  const joinChannel = async () => {
    // message.loading("Joining Quiz");
    showMessages('loading', 'Joining Quiz');

    if (isJoined) {
      showMessages('error', 'You are already in the quiz');
      await leaveChannel();
    }
    if (!user) {
      // create shadow user and join
      const shadowUser: AxiosResponse<ILoginResponse> = await createShadowUser();
      dispatch(setUserData(shadowUser.data.user));
      localStorage.setItem('user', JSON.stringify(shadowUser.data));
    }

    if (!socket?.connected) {
      socket?.connect();
      showMessages('error', 'Please wait while we connect you to the quiz');
    }
    socket?.emit(SOCKET_EMITTERS.USER_JOIN_LIVE_QUIZ, { user_id: user?.id, quiz_id: id });

    const randomUid = Math.floor(Math.random() * 1000);

    const rtcToken = await getAgoraRtcToken('test', 'audience', 'uid', randomUid);
    console.log('appId, channelName, rtcToken.data.data, randomUid', appId, channelName, rtcToken.data.data, randomUid);
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
    // if (isdoing == true) {
    //   const res = await getQuizState();
    //   switch (res.data.data.status) {
    //     case 'paused': {
    //       setIsPaused(true);
    //       break;
    //     }
    //     case 'showpool': {
    //       setIsShowpool(true);
    //       setAmount(res.data.data.pool);
    //       setNumberParticipants(res.data.data.contestants);
    //       break;
    //     }
    //     case 'quiz': {
    //       const query_question_start = { question_id: res.data.data.question_id };
    //       const quizStartQuestions = await getOnlyQuestion(query_question_start);
    //       if (quizStartQuestions.data.question_index) setQuestionIndex(quizStartQuestions.data.question_index);
    //       if (quizStartQuestions.data.total_questions)
    //         setTotalNumberOfQuestions(quizStartQuestions.data.total_questions);
    //       setCurrentQuestion(quizStartQuestions.data);
    //       toggleQuestion(true);
    //       setIsOptionSubmitted(false);
    //       break;
    //     }
    //     case 'quiz_answer': {
    //       const query_answer = { question_id: res.data.data.question_id };
    //       toggleQuestion(true);
    //       const quizAnswerQuestions = await getQuestionWithOption(query_answer);
    //       setCurrentQuestion(quizAnswerQuestions.data);
    //       break;
    //     }
    //   }
    // }
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
    const data: any = {
      user: JSON.parse(localStorage.getItem('user')).user.name,
      email: JSON.parse(localStorage.getItem('user')).user.email,
      amount: amount,
      ticket: ticket,
      credit: credit,
      successful_url: location.pathname,
    };
    checkOutBuyticketSessionSocket(data as any)
      .then((res: any) => {
        console.log(res);
        if (res.status == 200) {
          window.location.href = res.data as any;
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
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
        user_id: user?.id,
        quiz_id: id,
        question_id: currentQuestion?.question._id,
        option_id: option,
        duration: Number(momentDuration.asSeconds().toFixed(2)),
      };
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
      {!isVideoSubed && (
        <BackTab
          text={convertDate(quizData?.start_date)}
          // text={moment(quizData?.start_time).format('dddd, MMMM Do, h:mm a')}
          onClick={() => {
            dispatch(setMiscellaneousData({ topBarVisibility: true }));
            navigate('/dashboard');
          }}
        />
      )}
      {!isVideoSubed && (
        <div className="absolute z-20 flex flex-row-reverse mt-4" id="live-stream-header">
          <div className="absolute flex justify-center w-full">
            <img src={liveIcon} alt="live" height={16} />
          </div>
          <div className="mr-5 flex z-30 cursor-pointer" onClick={toggleStreamAudio}>
            {isMuted ? (
              <img src={ic_speakerOff} alt="speaker-off" height={24} />
            ) : (
              <img src={ic_speakerOn} alt="speaker-on" height={24} />
            )}
          </div>
          <div className="mr-5 flex">
            <img src={userCountIcon} alt="user-count" height={20} />
            <span className="pl-2 text-white">{liveUserCount}</span>
          </div>
        </div>
      )}
      {!isVideoSubed && quizData && (
        <div className="py-2">
          <img src={getQuizBackgroundImage(quizData.category.name).bgImage} alt="quiz-back" className="m-auto w-full" />
          <div className="mx-6 ">
            <div className="justify-center my-4 font-stud-regular tracking-wider">
              {quizData && quizData.description}
            </div>
            <Button
              type="primary"
              className="quiz-action-btn h-12 mt-6 shadow-none text-black font-bold rounded-3xl w-full"
              onClick={joinChannel}
              disabled={isSocketConnected ? false : true}
            >
              Join Quiz
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
        {quizData && user?.role === 'shadow' && isVideoSubed && (
          <div className="absolute flex h-screen">
            <div
              style={{ backgroundColor: '#090B40' }}
              className="w-full flex max-w-430 pb-3 pt-4 rounded-t-2xl z-50 fixed bottom-0"
            >
              <Link to="/login" className="w-full px-5">
                <Button type="primary" className="w-full text-black h-12 rounded-3xl">
                  Join Community
                </Button>
              </Link>
            </div>
          </div>
        )}
        <Progress ref={timerRef} type="circle" percent={timerProgress} strokeColor={'#44E500'} className="absolute" />
        {viewQuestions && (
          <div className="w-96 h-12 mt-6 z-50 bottom-0" id="view-que">
            <div className="p-16 pt-44 text-2xl text-white font-stud-regular text-center">
              Question {`${questionIndex}`} of {`${totalNumberOfQuestions}`}
            </div>
            <div className="p-4 text-xl text-white font-stud-regular text-center">{currentQuestion?.question.text}</div>
            <div className="p-5">
              {currentQuestion?.question?.options?.map((option, index) => {
                return (
                  <div
                    className="relative cursor-pointer h-12 my-2"
                    onClick={() => onOptionClick(option._id)}
                    key={index}
                  >
                    <div className="absolute z-40 flex justify-between w-full font-stud-regular h-12">
                      <span className="pl-3 self-center">{`${index + 1}` + '. ' + option.text}</span>
                      <span className="pr-3 self-center">{`${option.total_answers || 0}`}</span>
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
              <div className="p-4 text-xl text-white font-stud-regular text-center">
                You took {`${timeTakenToAnswer.asSeconds()}`} seconds to answer!
              </div>
            )}
          </div>
        )}
        {showLeaderboard && id && <Leaderboard quizId={id} />}
        {isPaused && (
          <div className="w-96 h-12 mt-6 z-50 bottom-0" id="view-que">
            <p className="text-center h-full flex justify-center m-auto items-center text-yellow-400 text-4xl font-stud-regular">
              Quiz Paused
            </p>
          </div>
        )}
        <div ref={viewQuestionRef} className="relative text-center" id="view-que-video">
          <video
            className={`m-auto block z-10 w-full ${viewQuestions ? 'max-100-100' : 'max-w-430'}`}
            // height={liveVideoHeight}
            // width={liveVideoWidth}
            id="remote-video"
            hidden={isVideoSubed ? false : true}
            ref={videoRef}
          ></video>
        </div>
      </div>
{/* 
      {isParticipants && isShowpool && (
        <div className="w-96 h-12 mt-6 z-50 bottom-0" id="view-que">
          <div className="flex flex-col">
            <div className="mt-6 flex justify-center z-20">
              <img src={imageUrl} alt="user2" className=" border-4  rounded-full" width={70} height={70} />
            </div>
          </div>

          <div className="flex flex-col mt-2">
            <div className="mt-4 flex flex-row justify-center p-4">
              <img src={frame} width={38.99} height={40} alt="frame" />
              <div className="text-customYellowBorder text-5xl font-bold text-center studregular">{amount}</div>
            </div>

            <div className="studregular text-center text-sm text-2xl font-bold  text-white">
              Estimated Prize Pool, each Ticket adds $1
            </div>
          </div>

          <div className="pr-8 pl-8 mt-4">
            <div className="studregular text-center text-2xl font-bold  text-white p-1">No. of Players:</div>
          </div>
          <div className="pr-8 pl-8 mt-4">
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

      {isShowpool && (
        <div className="w-96 h-12 mt-6 z-50 bottom-0" id="view-que">
          <div className="flex flex-col">
            <div className="mt-6 flex justify-center z-20">
              <img src={imageUrl} alt="user2" className=" border-4  rounded-full" width={70} height={70} />
            </div>
          </div>

          <div className="flex flex-col mt-2">
            <div className="mt-4 flex flex-row justify-center p-4">
              <img src={frame} width={38.99} height={40} alt="frame" />
              <div className="text-customYellowBorder text-5xl font-bold text-center studregular">{amount}$</div>
            </div>

            <div className="studregular text-center text-sm text-2xl font-bold  text-white">
              Estimated Prize Pool, each Ticket adds $1
            </div>
          </div>

          <div className="pr-8 pl-8 mt-2">
            <div className="studregular text-center text-xl font-bold  text-white p-1">
              Join the Quiz and compete to be the winner by entering with a Ticket
            </div>
          </div>
          {user?.role === 'user' && (
            <>
              <div className="mt-2 p-4">
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
              </div>

              <div className="flex justify-center mt-6">
                <button
                  onClick={useCredit}
                  className="bg-customBlue w-[300px] h-[42px] top-[320px] rounded-[30px] space-x-[6px]"
                >
                  <div className="flex items-center justify-center">
                    <div className="studregular text-center text-xl font-bold text-white mr-2 ">Use 1 Ticket</div>
                    <img src={group_red} alt="user2" />
                  </div>
                </button>
              </div>
              <div className="flex justify-center mt-8 mb-4">
                <button
                  onClick={showDrawer}
                  className="bg-customYellowBorder w-[300px] h-[42px] top-[320px] rounded-[30px] space-x-[6px]"
                >
                  <div className="flex items-center justify-center">
                    <div className="studregular text-black text-center text-xl font-bold  mr-2">Buy Tickets</div>
                    <img src={group_red} alt="user2" />
                  </div>
                </button>
              </div>
            </>
          )}
        </div>
      )} */}
      <Drawer title="Basic Drawer" height={500} onClose={onClose} open={open} placement="bottom">
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
      <Modal title="" open={isModalOpen} footer={null} width={'300px'} onCancel={handleCancel}>
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
              <Link to="#" className=" mt-8 space-x-[6px] border-white" onClick={handleCancel}>
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
