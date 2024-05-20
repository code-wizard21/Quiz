import { Button, Col, Divider, List, Row, Skeleton, Spin } from 'antd';
import { useEffect, useState } from 'react';
import {  useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import user2 from '../../assets/user/user1.svg';
import user1 from '../../assets/user/user2.svg';
import user3 from '../../assets/user/user3.svg';
import { getUserLeaderboard } from '../../service/quiz/quiz.service';
import { IQuizLeaderboardOverview } from '../../types/quiz.types';
import GameSummary from '../game-summary';
import './style.css';

const Leaderboard: React.FC<{ quizId: string }> = ({ quizId }): React.ReactElement => {
  const [leaderboardResults, setLeaderboardResults] = useState<IQuizLeaderboardOverview>();
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [viewLeaderboard, setViewLeaderboard] = useState(true);
  const [viewSummary, setViewSummary] = useState(false);
  const [isLeaderboardLoading, setIsLeaderboardLoading] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const handleViewSummary = () => {
    setIsSummaryLoading(true);
    setTimeout(() => {
      setIsSummaryLoading(false);
      setViewLeaderboard(false);
      setViewSummary(true);
    }, 1000);
  };

  useEffect(() => {
    setIsLeaderboardLoading(true);
    getUserLeaderboard(quizId)
      .then((res) => {
        setLeaderboardResults(res.data.data);
        console.log('leaderboard', res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLeaderboardLoading(false);
      });

    // getQuizTopThree(quizId)
    // .then((res) => {
    //   console.log("top 3 :: ", res.data.data);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  }, [quizId]);

  // const [loading, setLoading] = useState(false);
  // const [data, setData] = useState<any[]>([]);

  const loadMoreLeaderboardData = () => {
    console.log('load more leaderboard data');

    // if (loading) {
    //   return;
    // }
    // setLoading(true);

    // setTimeout(() => {
    //   setData([...data, ...tempUserData]);
    //   setLoading(false);
    // }, 1000);
  };

  useEffect(() => {
    loadMoreLeaderboardData();
  }, []);

  return (
    <>
      <Spin spinning={isLeaderboardLoading} size="large">
        {/* {viewLeaderboard && (
          <div id="leaderboard-container" className="rounded-2xl">
            <Row>
              <Col span={24} className="mt-16 flex justify-center">
                <div>
                  <img
                    src={leaderboardResults?.[1]?.avatar}
                    className="-mr-3 border-orange-400 border-4 border-solid rounded-full"
                    alt="user1"
                    width={80}
                    height={80}
                  />
                  {leaderboardResults && leaderboardResults?.[1]?.username ? (
                    <div className="text-white text-center">
                      {leaderboardResults[0]?.username}
                    </div>
                  ) : (
                    <>
                      <div className="text-white text-center">Sam.P</div>
                    </>
                  )}
                  <div className="text-white text-center">$450.90</div>
                </div>
                <div className="z-20">
                  <img
                    src={leaderboardResults[0]?.avatar}
                    alt="user2"
                    className="border-yellow-300 border-4 border-solid rounded-full"
                    width={100}
                    height={100}
                  />
                  {leaderboardResults && leaderboardResults?.length ? (
                    <div className="text-white text-center">
                      {leaderboardResults[0]?.username}
                    </div>
                  ) : (
                    <>
                      <div className="text-white text-center">Sam.P</div>
                    </>
                  )}
                  <div className="text-white text-center">$450.90</div>
                </div>
                <div>
                  <img
                   src={leaderboardResults?.[2]?.avatar}
                    className="-ml-3 border-green-400 border-4 border-solid rounded-full"
                    alt="user3"
                    width={80}
                    height={80}
                  />
                  {leaderboardResults && leaderboardResults?.[2]?.username ? (
                    <div className="text-white text-center">
                      {leaderboardResults?.[2]?.username}
                    </div>
                  ) : (
                    <>
                      <div className="text-white text-center">Sam.P</div>
                    </>
                  )}
                  <div className="text-white text-center">$450.90</div>
                </div>
              </Col>
              <Col span={24} className="mt-2 text-center text-white text-xl font-bold">
                <div>Congratulations!</div>
                <div>Here are the winners</div>
              </Col>
              <Col span={24} className="px-8">
                <Divider className="border-white" />
              </Col>
              <Col id="scrollableDiv" className="w-full h-56 overflow-auto px-6">
                {leaderboardResults && leaderboardResults?.length && (
                  <InfiniteScroll
                    dataLength={leaderboardResults?.length}
                    next={loadMoreLeaderboardData}
                    hasMore={false}
                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                    endMessage={
                      <Divider plain>
                        <span className="text-white">End of Leaderboard</span>
                      </Divider>
                    }
                    scrollableTarget="scrollableDiv"
                    className="w-full"
                  >
                    <List
                      dataSource={leaderboardResults}
                      renderItem={(item, index) => (
                       
                        <List.Item key={index} className={`${user?.username==item.username?'bg-quiz_back':''} flex justify-between items-center`}>
                          <div className="flex">
                            <div class="w-1/4">
                              <div className='flex'>
                              <div className="text-white text-center">{index + 1}</div>
                              <img
                                src={item.avatar}
                                className="mx-3"
                                alt="user1"
                                width={25}
                                height={25}
                              />
                              </div>
                           
                            </div>
                            <div class="w-1/4">
                              <div className="text-white">{item.username}</div>
                            </div>
                            <div class="w-1/4">
                             
                              <div className="text-white">{item.time}s</div>
                            </div>
                            <div class="w-1/4">
                              <div className="text-white">
                                {item.correct}/{item.totalquestion}
                              </div>
                            </div>
                          </div>
                        </List.Item>
                      )}
                    />
                  </InfiniteScroll>
                )}
              </Col>
              <Col className="m-auto pt-2">
                <Button className="bg-yellow-500" loading={isSummaryLoading} onClick={handleViewSummary}>
                  View Summary
                </Button>
              </Col>
            </Row>
          </div>
        )} */}
        {<GameSummary quizId={quizId} />}
      </Spin>
    </>
  );
};

export default Leaderboard;
