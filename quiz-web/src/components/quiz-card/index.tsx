import { Card } from 'antd';
import { useContext, useEffect, useState } from 'react';
import Meta from 'antd/es/card/Meta';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import shareImg from '../../assets/share.svg';
import ellipse from '../../assets/Ellipse_709.svg';
import { IQuiz } from '../../types/quiz.types';
import { USER_QUIZ_LIVE_CALCULATION_END } from '../../types/socket.types';
import { SOCKET_LISTENERS } from '../../constants/enum';
import { SocketContext } from '../../context/socket.context';
import { convertDate, getQuizBackgroundImage, showMessages } from '../../helpers/utils';
import { getLiveQuiz } from '../../service/quiz/quiz.service';
import './style.css';

type QuizCardProps = {
  quiz: IQuiz;
};

const QuizCard: React.FC<QuizCardProps> = ({ quiz }): React.ReactElement => {
  const currentTimestamp = moment();
  const navigate = useNavigate();
  const socket = useContext(SocketContext)?.socket;
  const [liveQuiz, setLiveQuiz] = useState('');

  useEffect(() => {
    const logConnectionStatus = () => {
      // console.log('Socket connected:', socket?.connected);

      showMessages('success', 'Socket connected: ' + socket?.connected);
    };

    socket?.on('connect', logConnectionStatus);
    console.log('socket,', socket);
    if (!socket?.connected) {
      socket?.connect();
    }
    socket?.on(SOCKET_LISTENERS.QUIZ_LIVE_START, (data) => {
      console.log('quiz_live_start ::######### ', data);
      if (quiz._id == data.quiz_id) {
        setLiveQuiz('ongoing');
      }
    });
    socket?.on('user_quiz_live_end', (data: USER_QUIZ_LIVE_CALCULATION_END) => {
      console.log('livequiz',data);
      alive(data);
    });
    const { bgImage, textImage } = getQuizBackgroundImage(quiz.category);
    setQuizBgImage(bgImage);
    setQuizTextImage(textImage);
    getLiveQuiz(quiz._id)
      .then((res) => {
        const data = res.data.data;
        console.log('resres', data.status);
        setLiveQuiz(data.status);
      })
      .catch((err) => console.log(err));

    if (!socket?.connected) {
      // retry socket connection
      socket?.connect();
    } else {
      showMessages('success', 'Socket connected: ' + socket?.connected);
    }
  }, [quiz.category]);

  const alive=(data)=>{
    console.log('livequiz',data);
    if (quiz._id == data.quiz) {
      setLiveQuiz('complete');
    }
  }
  const navigateToQuiz = (id: string) => {
    navigate(`/quiz/${id}`);
  };

  const [quizBgImage, setQuizBgImage] = useState<string>('');
  const [quizTextImage, setQuizTextImage] = useState<string>('');

  return (
    <div className="py-2 flex justify-center items-center" key={quiz._id}>
      <Card
        cover={
          <div className="relative">
            <img alt="quiz-back" className="w-full b-r-t-15" src={quizBgImage} />
            <div className="absolute inset-0 flex items-center justify-center">
              <img src={quizTextImage} alt="quiz-text" className="no-border-radius" />
            </div>
          </div>
        }
        className={`shadow-xl hover:cursor-pointer rounded-3xl max-w-xs ${
          liveQuiz == 'ongoing' ? 'bg-quiz_back' : ''
        } `}
        onClick={() => navigateToQuiz(quiz._id)}
      >
        <Meta
          title={
            <div className="flex justify-start items-center">
              <div className="flex ">
                <div className="font-stud-regular text-2xl">{convertDate(quiz?.start_date)}</div>
              </div>
            </div>
          }
          description={
            <div className="flex justify-between">
              {liveQuiz !== 'ongoing' && (
                <div className="font-stud-regular text-base">
                  {`Starts in ${moment(quiz.start_date).diff(currentTimestamp, 'days')} days`}
                </div>
              )}
              {liveQuiz === 'ongoing' && (
                <div className="flex w-full justify-between">
                  <div className="flex gap-1">
                    <img src={ellipse} alt="share" />
                    <div className="text-sm text-[#E62728] font-bold">Live</div>
                  </div>
                  <div className="flex">
                    <a className="flex gap-2">
                      <div className="text-sm text-black font-stud-regular">Share</div>
                      <img src={shareImg} alt="share" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          }
        />
      </Card>
    </div>
  );
};

export default QuizCard;
