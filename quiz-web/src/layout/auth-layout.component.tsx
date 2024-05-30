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

  if (localUser?.user && location.pathname === '/') {
    // Redirect to dashboard if user is not shadow
    if (localUser?.user?.role !== 'shadow') {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return (
    <div className="bg-4E13AF">
      <div className="w-full bg-gray-100 max-w-430 m-auto min-h-screen bg-4E13AF">
        {location.pathname === '/login' && localUser?.user && localUser?.user?.role !== 'shadow' ? (
          <Navigate to="/dashboard" state={{ from: location }} replace />
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default AuthLayout;
