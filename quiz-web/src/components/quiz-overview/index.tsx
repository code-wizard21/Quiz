import { Button } from 'antd';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import coinImg from '../../assets/coin.svg';
import { USER_ROLE } from '../../constants/enum';
import { setMiscellaneousData } from '../../redux/actions/miscellaneous.action';
import { RootState } from '../../redux/reducers';
import { getQuizList } from '../../service/quiz/quiz.service';
import { IQuiz, IQuizesResponse } from '../../types/quiz.types';
import QuizCard from '../quiz-card';
import './global.css';

const QuizOverview: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const [quizList, setQuizList] = useState<IQuiz[]>([]);

  const { topBarVisibility } = useSelector((state: RootState) => state.miscellaneous);

  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    getQuizList()
      .then((res: AxiosResponse<IQuizesResponse>) => {
        setQuizList(res.data.data.results);
        console.log('res.data.data.results', res.data.data.results);
      })
      .catch((err) => {
        console.log(err);
      });

    if (!topBarVisibility) {
      dispatch(setMiscellaneousData({ topBarVisibility: true }));
    }
  }, []);

  return (
    <div className="m-auto max-w-430 relative">
      <div className="text-left text-2xl text-center tracking-wider  m-auto font-bold font-stud-regular mt-6">
        Upcoming quiz shows
      </div>
      <div className="pb-6 m-auto relative items-center justify-center">
        {quizList?.map((quiz: IQuiz, index: number) => {
          return <QuizCard quiz={quiz} key={index} />;
        })}
        {(!user || user?.role === USER_ROLE.SHADOW) && (
          <div className="absolute flex h-screen">
            <div
              className="w-full flex max-w-430 py-4 rounded-t-2xl z-50 fixed bottom-0"
            >
              <Link to="/" className="w-full px-4">
                <Button type="primary" className="w-full text-black h-12 rounded-3xl">
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
      </div>
    </div>
  );
};

export default QuizOverview;
