import React from 'react';
import TopBar from '../top-bar';

import { Outlet } from 'react-router-dom';

const QuizLayout: React.FC = (): React.ReactElement => {
  return (
    <div className="w-full bg-gray-100 h-screen overflow-auto">
      <div className="max-w-430 m-auto shadow-xl bg-white min-h-screen">
        <TopBar />
        <Outlet />
      </div>
    </div>
  );
};

export default QuizLayout;
