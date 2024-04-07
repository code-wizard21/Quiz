import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import shareImg from '../../assets/share.svg';
import { convertDate, getQuizBackgroundImage } from '../../helpers/utils';
import { IQuiz } from '../../types/quiz.types';
import './style.css';

type QuizCardProps = {
  quiz: IQuiz;
};

const QuizCard: React.FC<QuizCardProps> = ({ quiz }): React.ReactElement => {
  const currentTimestamp = moment();
  const navigate = useNavigate();
  const navigateToQuiz = (id: string) => {
    navigate(`/quiz/${id}`);
  };

  const [quizBgImage, setQuizBgImage] = useState<string>('');
  const [quizTextImage, setQuizTextImage] = useState<string>('');

  useEffect(() => {
    // TODO: Fix this any type issue and make sure to fix this in HOST APP before deploying as it'll break the app
    const { bgImage, textImage } = getQuizBackgroundImage(quiz.category as any);
    setQuizBgImage(bgImage);
    setQuizTextImage(textImage);
  }, [quiz.category]);

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
        className="shadow-xl hover:cursor-pointer rounded-3xl max-w-xs"
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
