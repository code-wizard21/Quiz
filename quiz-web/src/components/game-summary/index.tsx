import { Col, Divider, List, Row, Spin } from 'antd';
import './style.css';
import coinImg from '../../assets/coin.svg';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserQuizGameSummary } from '../../service/quiz/quiz.service';
import { IQuestion, IUserQuizGameSummaryResponse } from '../../types/quiz.types';
import { AxiosResponse } from 'axios';
import { BiCheck } from 'react-icons/bi';
import { BiX } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/reducers';

const GameSummary: React.FC<{ quizId: string }> = ({ quizId }): React.ReactElement => {
  const [userGameSummary, setUserGameSummary] = useState<IQuestion[]>([]);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const loadMoreSummaryData = () => {
    console.log('loadMoreSummaryData');
  };
  const navigate = useNavigate();
  const getUserQuizSummary = useCallback(async () => {
    setIsSummaryLoading(true);
    console.log('quizIdquizId', quizId);
    getUserQuizGameSummary(quizId)
      .then((res: AxiosResponse<IUserQuizGameSummaryResponse>) => {
        console.log('res.data', res.data.data);
        setUserGameSummary(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsSummaryLoading(false);
      });
  }, [quizId]);

  useEffect(() => {
    // setData(tempGameSummaryData);
    getUserQuizSummary();
  }, []);

  return (
    <Spin spinning={isSummaryLoading} size="large">
      <div id="game-summary-container" className="rounded-t-2xl">
        <Row>
          <Col span={24} className="text-white text-center text-xl">
            Ready to Play?
          </Col>
          <Col span={24} className="text-white text-center text-xl">
            Create an account today!
          </Col>
          <Col span={24}>
            {user?.role == 'shadow' && (
              <div className="justify-center w-full items-center flex">
                <button
                  className="bg-customYellowBorder w-full mt-8 w-[285px] h-[52px] top-[320px]  rounded-[30px] space-x-[6px]"
                  onClick={() => navigate('/landing')}
                >
                  <div className="flex justify-center px-4 gap-2">
                    <div className="flex text-black justify-center text-base font-bold text-center ">
                      Join Community, get Free 20
                    </div>
                    <img src={coinImg} width="24" height="24" alt="coin" />
                  </div>
                </button>
              </div>
            )}
          </Col>
          <Col id="scrollableDiv" className="w-full overflow-auto mt-3 game-summary-list">
            <InfiniteScroll
              loader={<></>}
              dataLength={userGameSummary.length}
              next={loadMoreSummaryData}
              hasMore={true}
              scrollableTarget="scrollableDiv"
              endMessage={
                <Divider plain>
                  <span className="text-white">End of Game Summary</span>
                </Divider>
              }
              className="w-full"
            >
              <List
                dataSource={userGameSummary}
                renderItem={(item, index) => (
                  <List.Item key={index} className="flex justify-between">
                    <Col span={24} className="mt-2 flex justify-center flex-col px-2" key={index}>
                      <div className="text-sum-que text-white text-center text-xl rounded-t-2xl pt-2 w-full">
                        <div className="text-base text-left pl-4">Q.{index + 1}</div>
                        <div className="text-left pl-4 text-base">{item.question_text}</div>
                      </div>
                      <div className="text-sum-ans flex text-sm  text-white  font-bold rounded-b-2xl px-4 justify-between py-2 ">
                        <div className={` text-white `}>{item.answer}</div>
                        {item.state == 'true' && (
                          <div className="justify-between flex">
                            <div className=" text-green-500 ">{item.duration} s</div>
                            <BiCheck size={24} color="#48BB78" className="mb-1" />
                          </div>
                        )}
                        {item.state == 'false' && (
                          <>
                            <div className="justify-between flex">
                              {item.duration + ' s'}
                              <BiX size={24} color="red" className="mb-1" />
                            </div>
                          </>
                        )}
                        {item.state == 'No Answer' && (
                          <>
                            <div className="text-blue-500">No Answer</div>
                          </>
                        )}
                      </div>
                    </Col>
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          </Col>
        </Row>
      </div>
    </Spin>
  );
};

export default GameSummary;
