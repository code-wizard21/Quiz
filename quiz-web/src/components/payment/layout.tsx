

import { Outlet } from 'react-router-dom';

const QuizLayout=()=>{
  return (
    <div className="w-full bg-gray-100">
      <div className="max-w-430 m-auto shadow-xl bg-white min-h-screen">
        
        <Outlet />
      </div>
    </div>
  );
};

export default QuizLayout;
