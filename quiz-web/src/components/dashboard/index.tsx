import { Button, Row } from 'antd';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { logoutUserData } from '../../redux/actions/auth.action';
import { logout } from '../../service/auth/auth.service';
import { ILoginResponse } from '../../types/user.type';
const Dashboard: React.FC = (): React.ReactElement => {
 
  const dispatch = useDispatch();

  const logoutUser = useCallback(async () => {
    const localUser = localStorage.getItem('user');
    const paredUserData: ILoginResponse = JSON.parse(localUser || '{}');
    const refreshToken = paredUserData?.tokens?.refresh?.token || '';
    await logout(refreshToken);
    localStorage.clear();
    // dispatch(
    //   setUserData({
    //     id: '',
    //     name: '',
    //     email: '',
    //     created_at: '',
    //     isEmailVerified: false,
    //     password: '',
    //     role: USER_ROLE.USER,
    //     updated_at: '',
    //   })
    // );
    dispatch(logoutUserData());
    
  }, []);

  return (
    <Row>
      <div className="w-full bg-gray-100">
        <Button type="primary" className="float-right" onClick={logoutUser}>
          Logout
        </Button>
      </div>
      <Outlet />
    </Row>
  );
};

export default Dashboard;
