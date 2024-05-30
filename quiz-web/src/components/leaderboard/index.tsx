import { Col, Divider, List, Row, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import GameSummary from '../game-summary';
import { CloseSquareOutlined } from '@ant-design/icons';
import { Drawer, Button } from 'antd';
import { getUserLeaderboard } from '../../service/quiz/quiz.service';
import { IQuizLeaderboardOverview } from '../../types/quiz.types';
import { Avatar } from 'antd';
import { BiChevronUp } from 'react-icons/bi';
import './style.css';
import close from '../../assets/close.svg';
import ic_droparrow from '../../assets/ic_droparrow.svg';
const containerStyle = {
  position: 'relative',
  overflow: 'hidden',

  height: 900,
};

const Leaderboard: React.FC<{ quizId: string; isVideoSubed: boolean }> = ({
  quizId,
  isVideoSubed,
}): React.ReactElement => {
  const [leaderboardResults, setLeaderboardResults] = useState<IQuizLeaderboardOverview>();
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [viewLeaderboard, setViewLeaderboard] = useState(true);
  const [isLeaderboardLoading, setIsLeaderboardLoading] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const closeDrawer = (
    <Button style={{ color: 'white', border: 'none', background: '#2F0861' }} onClick={onClose}>
      <img src={close} alt="close" />
    </Button>
  );
  useEffect(() => {
    setIsLeaderboardLoading(true);
    getUserLeaderboard(quizId)
      .then((res) => {
        setLeaderboardResults(res.data.data);
        console.log('leaderboardleaderboardleaderboard', res.data.data);
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
          <div style={containerStyle} id="leaderboard-container" className="h-screen">

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
                    <div className="text-white text-center">${leaderboardResults?.[1]?.rewardAmount}</div>
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
                  <div className="text-white text-center">${leaderboardResults?.[0]?.rewardAmount}</div>
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
                    <div className="text-white text-center">${leaderboardResults?.[2]?.rewardAmount}</div>
                  </div>
                )}
              </Col>
              <Col span={24} className="mt-4 text-center text-white text-xl font-bold">
                <div>Congratulations!</div>
                <div>Here are the winners</div>
              </Col>
              <Col span={24} className="px-8">
                <Divider className="border-white" />
              </Col>
              <Col id="scrollableDiv" className="w-full h-96 overflow-auto px-6">
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
                        <div
                          key={index}
                          className={`px-4 flex items-center   py-2 gap-6 ${
                            user?.username == item.username ? 'bg-white rounded-3xl text-[#662FBF]' : ' text-white '
                          }`}
                        >
                          <div className="w-1/8 cursor-default">{index + 1}</div>
                          <div className="w-1/8">
                            <Avatar src={item.avatar} alt="user1" width={35} height={35} />
                          </div>
                          <span className="w-1/3 cursor-default  truncate">{item.username}</span>
                          <span className="w-1/6 cursor-default">{parseFloat(item.time).toFixed(2)}s</span>
                          <span className="w-1/4 cursor-default">
                            {item.correct}/{item.totalquestion}
                          </span>
                        </div>
                      )}
                    />
                  </InfiniteScroll>
                )}
              </Col>
            </Row>
            <div className="bg-[#8347E2] mt-12 p-12 rounded-2xl  flex items-center justify-center" onClick={showDrawer}>       
                <div className="text-white text-2xl">Game Summary</div>
                <img src={ic_droparrow} alt="coin" />
            </div>
            <Drawer
              getContainer={false}
              className="custom-drawer"
              style={{ background: '#2F0861', borderRadius: '25px' }}
              title={
                <Col span={24} className="text-white font-bold text-2xl text-center my-2">
                  Game Summary
                </Col>
              }
              onClose={onClose}
              closeIcon={closeDrawer}
              height={610}
              open={open}
              placement="bottom"
            >
              <GameSummary quizId={user?.id} />
            </Drawer>
          </div>
        )}
      </Spin>
    </>
  );
};

export default Leaderboard;
