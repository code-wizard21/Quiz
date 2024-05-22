import { Col, Divider, List, Row, Skeleton, Spin } from 'antd';
import './style.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useCallback, useEffect, useState } from 'react';
import { getUserQuizGameSummary } from '../../service/quiz/quiz.service';
import { IQuestion, IUserQuizGameSummaryResponse } from '../../types/quiz.types';
import { AxiosResponse } from 'axios';
import { BiCheck } from 'react-icons/bi';
import { BiSolidXCircle } from 'react-icons/bi';
import { BiX } from 'react-icons/bi';
const GameSummary: React.FC<{ quizId: string }> = ({ quizId }): React.ReactElement => {
  const [userGameSummary, setUserGameSummary] = useState<IQuestion[]>([]);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);

  const loadMoreSummaryData = () => {
    console.log('loadMoreSummaryData');
  };

  const getUserQuizSummary = useCallback(async () => {
    setIsSummaryLoading(true);
    console.log('quizIdquizId',quizId);
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
      <div id="game-summary-container" className="rounded-2xl">
        <Row>
          <Col span={24} className="text-white font-bold text-2xl text-center my-8">
            Game Summary
          </Col>
          <Col span={24} className="text-white text-center text-xl">
            Ready to Play?
          </Col>
          <Col span={24} className="text-white text-center text-xl">
            Create an account today!
          </Col>
          <Col id="scrollableDiv" className="w-full overflow-auto mt-3 game-summary-list">
            <InfiniteScroll
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
                    <Col span={24} className="mt-5 flex justify-center flex-col px-6" key={index}>
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
                              {(item.duration) + ' s'}
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
