import { Col, Divider, Row } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import coinImg from '../../assets/coin.svg';
import sideMenuSvg from '../../assets/side-menu.svg';
import ticketImg from '../../assets/ticket.svg';
import { RootState } from '../../redux/reducers';
import { logout } from '../../service/auth/auth.service';
import { ILoginResponse } from '../../types/user.type';
import { TMiscellaneousSettings } from '../../types/miscellaneous.type';
import { USER_ROLE } from '../../constants/enum';

const TopBar: React.FC = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.auth);

  const logoutUser = useCallback(async () => {
    const localUser = localStorage.getItem('user');
    const paredUserData: ILoginResponse = JSON.parse(localUser || '{}');
    const refreshToken = paredUserData?.tokens?.refresh?.token || '';
    await logout(refreshToken);
    localStorage.clear();
    navigate('/');
  }, []);
const goPayment=()=>{
  navigate('/payment');
}
  const { topBarVisibility }: TMiscellaneousSettings = useSelector((state: RootState) => state.miscellaneous);

  const [isTopBarVisible, setIsTopBarVisible] = useState<boolean>(topBarVisibility);

  useEffect(() => {
    setIsTopBarVisible(topBarVisibility);
  }, [topBarVisibility]);

  const GuestTitle: React.ReactNode = (
      <Row className='w-full m-auto justify-center text-2xl font-stud-regular mt-4'>Guest Mode</Row>
  );

  return (
    <>
      {isTopBarVisible ? (
        <Row className="sticky top-0 z-50 overflow-hidden bg-white">
          {user && user?.role !== USER_ROLE.SHADOW ? (
            <Col span={24}>
              <div className="flex justify-between mx-4 mt-4">
                <a className="items-center" onClick={logoutUser}>
                  <img src={sideMenuSvg} alt="side-menu" />
                </a>
                <div className="flex">
                  <a className="flex items-center bg-blue-600 px-3 rounded-full" onClick={goPayment}>
                    <img src={coinImg} alt="coin" />
                    <div className="text-xl font-bold ml-2 text-white font-stud-regular">100</div>
                  </a>
                  <a className="flex items-center ml-5 bg-blue-600 px-3 rounded-full">
                    <img src={ticketImg} alt="ticket" />
                    <div className="text-xl font-bold ml-2 text-white font-stud-regular">2</div>
                  </a>
                </div>
              </div>
            </Col>
          ) : (
            GuestTitle
          )}
          <Divider className="mb-0 mt-4" />
        </Row>
      ) : null}
    </>
  );
};

export default TopBar;
