import { Col, Divider, List, Row, Spin, Badge, Avatar } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import coinImg from '../../assets/coin.svg';
import InfiniteScroll from 'react-infinite-scroll-component';
import deafult from '../../assets/user/user1.svg'
import GameSummary from '../game-summary';
import { Drawer, Button } from 'antd';
import { getUserLeaderboard } from '../../service/quiz/quiz.service';
import { IQuizLeaderboardOverview } from '../../types/quiz.types';
import './style.css';
import close from '../../assets/close.svg';
import ic_droparrow from '../../assets/ic_droparrow.svg';

const containerStyle = {
  position: 'relative',
  overflow: 'none',
  height: '100vh',
};

const Leaderboard: React.FC<{ quizId: string; isVideoSubed: boolean }> = ({ quizId }): React.ReactElement => {
  const [leaderboardResults, setLeaderboardResults] = useState<IQuizLeaderboardOverview>();
  const [viewLeaderboard, setViewLeaderboard] = useState(true);
  const [isLeaderboardLoading, setIsLeaderboardLoading] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const handleClose = () => {
    window.location.reload();
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
          <div style={containerStyle} id="leaderboard-container" >
            <Row>
              <div className="flex mt-6 ml-4 z-40" onClick={handleClose}>
                <img src={close} height={20} />
              </div>
              <Col span={24} className="flex justify-center mt-4">
                {leaderboardResults?.[1]?.avatar && (
                  <div className="mt-6">
                    <Badge
                      style={{
                        fontSize: '16px',
                        transform: 'translate(-170%, -50%)',
                        borderColor: '#FF9494',
                        color: 'black',
                        background: '#FF9494',
                      }}
                      count={2}
                    >
                      <img
                        src={leaderboardResults[1].avatar}
                        className="-mr-3 border-orange-400 border-4 border-solid rounded-full"
                        alt="user1"
                        width={100}
                        height={100}
                      />
                    </Badge>
                    <div className="text-white text-sm text-center">
                      {leaderboardResults?.[1]?.username?.length > 7
                        ? `${leaderboardResults?.[1]?.username.slice(0, 7)}...`
                        : leaderboardResults?.[1]?.username}
                    </div>

                    <div className="text-white text-sm text-center">${leaderboardResults?.[1]?.rewardAmount}</div>
                  </div>
                )}

                <div className="z-20">
                  <Badge
                    style={{
                      fontSize: '16px',
                      transform: 'translate(-260%, -50%)',
                      color: 'black',
                      borderColor: '#F9DC30',
                      background: '#F9DC30',
                    }}
                    count={1}
                  >
                    <img
                      src={leaderboardResults?.[0]?.avatar}
                      alt="user2"
                      className="border-yellow-300 border-4 border-solid rounded-full"
                      width={120}
                      height={123}
                    />
                  </Badge>
                  <div className="text-white text-base text-center">
                    {leaderboardResults?.[0]?.username?.length > 7
                      ? `${leaderboardResults?.[0]?.username.slice(0, 7)}...`
                      : leaderboardResults?.[0]?.username}
                  </div>
                  <div className="text-white text-base text-center">${leaderboardResults?.[0]?.rewardAmount}</div>
                </div>
                {leaderboardResults?.[2]?.avatar && (
                  <div className="mt-6">
                    <Badge
                      style={{
                        fontSize: '16px',
                        transform: 'translate(-210%, -50%)',
                        color: 'black',
                        borderColor: '#51D33C',
                        background: '#51D33C',
                      }}
                      count={3}
                    >
                      <img
                        src={leaderboardResults?.[2]?.avatar}
                        className="-ml-3 border-green-400 border-4 border-solid rounded-full"
                        alt="user3"
                        width={100}
                        height={101}
                      />
                    </Badge>
                    <div className="text-white  text-sm text-center">
                      <div className="text-white text-sm text-center">
                        {leaderboardResults?.[2]?.username?.length > 7
                          ? `${leaderboardResults?.[2]?.username.slice(0, 7)}...`
                          : leaderboardResults?.[2]?.username}
                      </div>
                    </div>
                    <div className="text-white text-sm text-center">${leaderboardResults?.[2]?.rewardAmount}</div>
                  </div>
                )}
              </Col>
              <Col span={24} className=" text-center text-white text-2xl font-bold">
                <div>Congratulations!</div>
                <div>Here are the winners</div>
              </Col>
              <Col span={24} className="-mt-4 px-8">
                <Divider className="border-white" />
              </Col>
              <Col id="scrollableDiv" className="w-full h-[480px] -mt-4 overflow-auto px-6">
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
                            user?.username == item?.username ? 'bg-white rounded-3xl text-[#662FBF]' : ' text-white '
                          }`}
                        >
                          <div className="w-1/8 cursor-default">{index + 1}</div>
                          <div className="w-1/8">
                            <Avatar src={item.avatar} alt="user1" width={35} height={35} />
                          </div>
                          <span className="w-1/3 cursor-default  truncate">
                            {item.username?.length > 14 ? `${item.username.slice(0, 14)}...` : item.username}
                          </span>
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

              {/* <Col className='absolute bottom-0 w-full left-0' span={24}>
                <div
                  className=" bg-[#8347E2]    pt-8 pb-20 rounded-t-2xl gap-4  flex items-center justify-center"
                  onClick={showDrawer}
                >
                  <div className=" text-white text-2xl">Game Summary</div>
                  <img src={ic_droparrow} alt="coin" />
                </div>
              </Col> */}
            </Row>

            <div
            onClick={showDrawer}
              style={{ cursor: 'pointer', backgroundColor: '#8347E2' }}
              className="absolute  bottom-0  w-full left-0  flex   rounded-t-2xl z-50  "
            >
              <div onClick={showDrawer} className="pt-4 pb-8 w-full text-black  rounded-3xl">
                <div className="flex justify-center ">
                  <div className="flex text-white text-2xl font-bold">Game Summary</div>
                </div>
              </div>
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
              height={800}
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
