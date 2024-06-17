import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ILoginResponse } from '../types/user.type';

/**
 * A layout component that renders its child auth pages
 * @returns {React.ReactElement}
 */

const AuthLayout: React.FC = (): React.ReactElement => {
  // const { t } = useTranslation("translation");
  const location = useLocation();
  const localUser: ILoginResponse = JSON.parse(localStorage.getItem('user') || '{}');

  if (localUser?.user && location.pathname === '/login') {
    // Redirect to dashboard if user is not shadow
    if (localUser?.user?.role !== 'shadow') {
      return <Navigate to="/quiz" replace />;
    }
  }

  return (
    <div className="bg-4E13AF h-screen min-h-[950px]">
      <div className="w-full  bg-gray-100 max-w-430 m-auto  bg-4E13AF overflow-hide min-h-[940px] overflow-auto h-[940px]">
        {location.pathname === '/login' && localUser?.user && localUser?.user?.role !== 'shadow' ? (
          <Navigate to="/" state={{ from: location }} replace />
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default AuthLayout;
