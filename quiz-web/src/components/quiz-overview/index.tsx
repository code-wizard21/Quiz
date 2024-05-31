import { Button } from 'antd';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { USER_ROLE } from '../../constants/enum';
import { setMiscellaneousData } from '../../redux/actions/miscellaneous.action';
import { RootState } from '../../redux/reducers';
import { getQuizList } from '../../service/quiz/quiz.service';
import { IQuiz, IQuizesResponse } from '../../types/quiz.types';
import QuizCard from '../quiz-card';
import './global.css'

const QuizOverview: React.FC = (): React.ReactElement => {
 
  const dispatch = useDispatch();
  const [quizList, setQuizList] = useState<IQuiz[]>([]);

  const { topBarVisibility } = useSelector((state: RootState) => state.miscellaneous);

  const { user } = useSelector((state: RootState) => state.auth);
 
  useEffect(() => {
    getQuizList()
      .then((res: AxiosResponse<IQuizesResponse>) => {
         setQuizList(res.data.data.results); 
        console.log('res.data.data.results',res.data.data.results);
      })
      .catch((err) => {
        console.log(err);
      });

    if (!topBarVisibility) {
      dispatch(setMiscellaneousData({ topBarVisibility: true }));
    }
  }, []);

  return (
    <div className="m-auto max-w-430">
      <div className="text-left text-2xl tracking-wider max-w-xs m-auto font-bold font-stud-regular mt-6">
        Upcoming quiz shows
      </div>
      <div className="pb-6 max-w-xs m-auto">
        {quizList?.map((quiz: IQuiz, index: number) => {
          return <QuizCard quiz={quiz} key={index} />;
        })}
        {(!user || user?.role === USER_ROLE.SHADOW) && (
          <div className='items-center justify-center fixed bottom-2 item w-[42vh]'>
            <Link to="/">
              <Button
                type="primary"
                className="quiz-action-btn h-12 shadow-none text-black font-bold rounded-3xl w-full p-4"
              >
                Join Community
              </Button>
            </Link>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default QuizOverview;
