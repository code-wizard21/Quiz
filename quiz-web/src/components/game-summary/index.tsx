import { Col, Divider, List, Row, Skeleton, Spin } from 'antd';
import './style.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useCallback, useEffect, useState } from 'react';
import { getUserQuizGameSummary } from '../../service/quiz/quiz.service';
import { IQuestion, IUserQuizGameSummaryResponse } from '../../types/quiz.types';
import { AxiosResponse } from 'axios';
const GameSummary: React.FC<{ quizId: string }> = ({ quizId }): React.ReactElement => {
  const [userGameSummary, setUserGameSummary] = useState<IQuestion[]>([]);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);

  const loadMoreSummaryData = () => {
    console.log('loadMoreSummaryData');
  };

  const getUserQuizSummary = useCallback(async () => {
    setIsSummaryLoading(true);
    getUserQuizGameSummary(quizId)
      .then((res: AxiosResponse<IUserQuizGameSummaryResponse>) => {
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
              hasMore={false}
              loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
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
                        <div className="text-left pl-4 text-base">{item.text}</div>
                      </div>
                      <div className="text-sum-ans flex text-sm justify-between text-white text-left font-bold rounded-b-2xl px-4 py-2 ">
                        <div className={`${item.user_answer?.is_correct ? 'text-green-500' : 'text-red-500'}`}>
                          {item.user_answer?.text}
                        </div>
                        {item.user_answer?.is_correct ? (
                          <div className="text-green-500">{item.user_answer.duration}s</div>
                        ) : (
                          <div className="text-red-500">
                            {typeof item?.user_answer?.duration === 'number' ? item.user_answer.duration + 's' : 'X'}
                          </div>
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
