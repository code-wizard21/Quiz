import { Button, Col, Divider, List, Row, Skeleton, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import { getUserLeaderboard } from '../../service/quiz/quiz.service';
import { IQuizLeaderboardOverview } from '../../types/quiz.types';
import { Avatar } from 'antd';
import './style.css';

const Leaderboard: React.FC<{ quizId: string; setViewSummary: (value: boolean) => void }> = ({
  quizId,
  setViewSummary,
}) => {
  const [leaderboardResults, setLeaderboardResults] = useState<IQuizLeaderboardOverview>();
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [viewLeaderboard, setViewLeaderboard] = useState(true);

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
        {viewLeaderboard && (
          <div id="leaderboard-container" className="rounded-2xl">
            <Row>
              <Col span={24} className="mt-16 flex justify-center">
                {leaderboardResults?.[1]?.avatar && (
                  <div>
                    <img
                      src={leaderboardResults[1].avatar}
                      className="-mr-3 border-orange-400 border-4 border-solid rounded-full"
                      alt="user1"
                      width={80}
                      height={80}
                    />
                    <div className="text-white text-center">{leaderboardResults[1]?.username}</div>
                    <div className="text-white text-center">$450.90</div>
                  </div>
                )}

                <div className="z-20">
                  <img
                    src={leaderboardResults?.[0]?.avatar}
                    alt="user2"
                    className="border-yellow-300 border-4 border-solid rounded-full"
                    width={100}
                    height={100}
                  />
                  {leaderboardResults && leaderboardResults.length && (
                    <div className="text-white text-center">{leaderboardResults[0]?.username || 'Sam.P'}</div>
                  )}
                  <div className="text-white text-center">$450.90</div>
                </div>
                {leaderboardResults?.[2]?.avatar && (
                  <div>
                    <img
                      src={leaderboardResults?.[2]?.avatar}
                      className="-ml-3 border-green-400 border-4 border-solid rounded-full"
                      alt="user3"
                      width={80}
                      height={80}
                    />
                    <div className="text-white text-center">{leaderboardResults?.[2]?.username || 'Sam.P'}</div>
                    <div className="text-white text-center">$450.90</div>
                  </div>
                )}
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
                    hasMore={true}
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
                        <List.Item
                          key={index}
                          className={`${
                            user?.username == item.username ? 'bg-white rounded-3xl text-[#662FBF]' : ' text-white '
                          } flex px-4 py-2 `}
                        >
                          <div
                            className={`${
                              user?.username == item.username ? 'text-[#662FBF]' : 'text-white'
                            } cursor-default text-center ml-4`}
                          >
                            {index + 1}
                          </div>
                          <Avatar src={item.avatar} className="mx-3" alt="user1" width={35} height={35} />

                          <div
                            className={`${
                              user?.username == item.username ? 'text-[#662FBF]' : 'text-white'
                            } cursor-default text-center `}
                          >
                            {item.username}
                          </div>
                          <div
                            className={`${
                              user?.username == item.username ? 'text-[#662FBF]' : 'text-white'
                            } cursor-default text-center `}
                          >
                            {item.time}s
                          </div>
                          <div
                            className={`${
                              user?.username == item.username ? 'text-[#662FBF]' : 'text-white'
                            } cursor-default text-center `}
                          >
                            {' '}
                            {item.correct}/{item.totalquestion}
                          </div>

                          <div></div>
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
        )}
      </Spin>
    </>
  );
};

export default Leaderboard;
