import { Card } from 'antd';
import { useContext, useEffect, useState } from 'react';
import Meta from 'antd/es/card/Meta';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import shareImg from '../../assets/share.svg';
import { IQuiz } from '../../types/quiz.types';
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
      showMessages('success', 'Socket connected: ' + socket?.connected);
    };
    socket?.on('connect', logConnectionStatus);
    console.log('socket,', socket);
    if (!socket?.connected) {
      socket?.connect();
    }
    const { bgImage, textImage } = getQuizBackgroundImage(quiz.category as any);
    setQuizBgImage(bgImage);
    setQuizTextImage(textImage);
    getLiveQuiz(quiz._id)
      .then((res) => {
        const data: any = res.data.data;
        setLiveQuiz(data.status);
      })
      .catch((err) => console.log(err));

    socket?.on(SOCKET_LISTENERS.QUIZ_LIVE_START, (data: any) => {
      console.log('quiz_live_start ::######### ', data);
      if (quiz._id == data.quiz_id) {
        setLiveQuiz('ongoing');
      }
    });
    socket?.on(SOCKET_LISTENERS.USER_QUIZ_LIVE_CALCULATION_END, (data: any) => {
      if (quiz._id == data.quiz_id) {
        setLiveQuiz('complete');
      }
    });
  }, [quiz.category]);

  const navigateToQuiz = (id: string) => {
    navigate(`/quiz/${id}`);
  };

  const [quizBgImage, setQuizBgImage] = useState<string>('');
  const [quizTextImage, setQuizTextImage] = useState<string>('');

  return (
    <div className="py-2" key={quiz._id}>
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
          title={<div className="font-stud-regular text-xl">{convertDate(quiz?.start_date)}</div>}
          description={
            <div className="flex justify-between">
              <div className="font-stud-regular text-base">{`Starts in ${moment(quiz.start_date).diff(
                currentTimestamp,
                'days'
              )} days`}</div>
              <a className="flex">
                <div className="pr-1 text-black font-stud-regular">Share</div>
                <img src={shareImg} alt="share" />
              </a>
            </div>
          }
        />
      </Card>
    </div>
  );
};

export default QuizCard;
