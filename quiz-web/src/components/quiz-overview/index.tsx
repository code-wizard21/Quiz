import { Button,Modal } from 'antd';
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
import { useLocation } from 'react-router-dom';
const QuizOverview: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const [quizList, setQuizList] = useState<IQuiz[]>([]);

  const { topBarVisibility } = useSelector((state: RootState) => state.miscellaneous);

  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const isSuccess = location.search.includes('success');
    if(isSuccess==true){
      setIsModalOpen(true);
    }
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
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleJoinClick=()=>{
    setIsModalOpen(false);
  }
  return (
    <>
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
              <Link to="/signup" className="w-full px-4">
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
    <Modal title="" open={isModalOpen} footer={null} width={'350px'} onCancel={handleCancel}>
        <div className="modal-box">
        
            <div>

              <div className="flex  my-4  text-black text-2xl font-bold text-center studregular  justify-center">
              Transaction Success!
              </div>
            </div>
        
          <div className=" flex text-base  text-black  justify-center">Welcome Contestant! You will need </div>
          <div className="flex text-base  text-black justify-center">to sign up in order to access any </div>
          <div className="flex text-base text-black justify-center">Prize Money! </div>

          <div className="modal-action">
            <div className="justify-center flex">
              <button
                onClick={handleJoinClick}
                className="bg-customYellowBorder mt-8 w-[325px] h-[52px] top-[320px] rounded-[30px] space-x-[6px] border-customYellowBorder"
                style={{ fontSize: window.innerWidth <= 412 ? 'small' : 'medium' }} // Change this line
              ><div className='text-black font-bold'>Continue to Sign Up</div>
                
              </button>
            </div>

            <div className="justify-center flex ">
              <Link
                to="#"
                className=" mt-8 space-x-[6px] border-white"
                onClick={() => {
                  setIsModalOpen(false);
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
    </>
  );
};

export default QuizOverview;
