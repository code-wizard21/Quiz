import { Button, Col, Divider, List, Row, Skeleton, Spin } from 'antd';
import { useEffect, useState } from 'react';
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

  // let tempUserData = [
  //   {
  //     rank: 1,
  //     img: user1,
  //     name: 'Sam.P',
  //     time: '15.2s',
  //     correct_answers: '9/10',
  //   },
  //   {
  //     rank: 2,
  //     img: user2,
  //     name: 'Sam.P',
  //     time: '15.2s',
  //     correct_answers: '9/10',
  //   },
  //   {
  //     rank: 3,
  //     img: user3,
  //     name: 'Sam.P',
  //     time: '15.2s',
  //     correct_answers: '9/10',
  //   },
  //   {
  //     rank: 4,
  //     img: user1,
  //     name: 'Sam.P',
  //     time: '15.2s',
  //     correct_answers: '9/10',
  //   },
  //   {
  //     rank: 5,
  //     img: user2,
  //     name: 'Sam.P',
  //     time: '15.2s',
  //     correct_answers: '9/10',
  //   },
  //   {
  //     rank: 6,
  //     img: user3,
  //     name: 'Sam.P',
  //     time: '15.2s',
  //     correct_answers: '9/10',
  //   },
  //   {
  //     rank: 7,
  //     img: user1,
  //     name: 'Sam.P',
  //     time: '15.2s',
  //     correct_answers: '9/10',
  //   },
  //   {
  //     rank: 7,
  //     img: user1,
  //     name: 'Sam.P',
  //     time: '15.2s',
  //     correct_answers: '9/10',
  //   },
  //   {
  //     rank: 7,
  //     img: user1,
  //     name: 'Sam.P',
  //     time: '15.2s',
  //     correct_answers: '9/10',
  //   },
  //   {
  //     rank: 7,
  //     img: user1,
  //     name: 'Sam.P',
  //     time: '15.2s',
  //     correct_answers: '9/10',
  //   },
  //   {
  //     rank: 7,
  //     img: user1,
  //     name: 'Sam.P',
  //     time: '15.2s',
  //     correct_answers: '9/10',
  //   },
  //   {
  //     rank: 7,
  //     img: user1,
  //     name: 'Sam.P',
  //     time: '15.2s',
  //     correct_answers: '9/10',
  //   },
  //   {
  //     rank: 7,
  //     img: user1,
  //     name: 'Sam.P',
  //     time: '15.2s',
  //     correct_answers: '9/10',
  //   },
  // ]

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
              <Col span={24} className="mt-24 flex justify-center">
                <div>
                  <img
                    src={user1}
                    className="-mr-3 border-orange-400 border-4 border-solid rounded-full"
                    alt="user1"
                    width={100}
                    height={100}
                  />
                  {leaderboardResults && leaderboardResults?.leaderboard?.results?.[1]?.user.name ? (
                    <div className="text-white text-center">
                      {leaderboardResults?.leaderboard?.results?.[1].user.name}
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
                    src={user2}
                    alt="user2"
                    className="border-yellow-300 border-4 border-solid rounded-full"
                    width={124}
                    height={124}
                  />
                  {leaderboardResults && leaderboardResults?.leaderboard?.results?.length ? (
                    <div className="text-white text-center">
                      {leaderboardResults?.leaderboard?.results?.[0]?.user.name}
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
                    src={user3}
                    className="-ml-3 border-green-400 border-4 border-solid rounded-full"
                    alt="user3"
                    width={100}
                    height={100}
                  />
                  {leaderboardResults && leaderboardResults?.leaderboard?.results?.[2]?.user.name ? (
                    <div className="text-white text-center">
                      {leaderboardResults?.leaderboard?.results?.[2]?.user.name}
                    </div>
                  ) : (
                    <>
                      <div className="text-white text-center">Sam.P</div>
                    </>
                  )}
                  <div className="text-white text-center">$450.90</div>
                </div>
              </Col>
              <Col span={24} className="mt-5 text-center text-white text-2xl font-bold">
                <div>Congratulations!</div>
                <div>Here are the winners</div>
              </Col>
              <Col span={24} className="px-8">
                <Divider className="border-white" />
              </Col>
              <Col id="scrollableDiv" className="w-full h-56 overflow-auto px-6">
                {leaderboardResults && leaderboardResults?.leaderboard?.results?.length && (
                  <InfiniteScroll
                    dataLength={leaderboardResults?.leaderboard?.results?.length}
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
                      dataSource={leaderboardResults?.leaderboard?.results}
                      renderItem={(item, index) => (
                        <List.Item key={index} className="flex justify-between">
                          <div className="flex flex-row items-center">
                            <div className="text-white text-center">{item.rank}</div>
                            <img
                              src={index % 2 === 0 ? user1 : user2}
                              className="mx-3"
                              alt="user1"
                              width={25}
                              height={25}
                            />
                            <div className="text-white">{item.user.name}</div>
                          </div>
                          <div className="text-white">{item.total_duration.toFixed(2)}s</div>
                          <div className="text-white">
                            {item.correct_answers}/{leaderboardResults.total_questions}
                          </div>
                        </List.Item>
                      )}
                    />
                  </InfiniteScroll>
                )}
              </Col>
              <Col className="m-auto pt-5">
                <Button className="bg-yellow-500" loading={isSummaryLoading} onClick={handleViewSummary}>
                  View Summary
                </Button>
              </Col>
            </Row>
          </div>
        )}
        {viewSummary && <GameSummary quizId={quizId} />}
      </Spin>
    </>
  );
};

export default Leaderboard;
