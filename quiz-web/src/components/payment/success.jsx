
import user1 from '../../assets/user/user2.svg';
import background from '../../assets/figma/Graphic.svg';

import React from 'react';
import { useNavigate } from 'react-router-dom';

const BuyTicket = () => {
  const navigate = useNavigate();


  return (
    <>
      <div
        style={{ backgroundImage: `url(${background})` }}
        className="rounded-2xl bg-cover bg-center bg-no-repeat h-screen"
      >
        <div className="flex flex-col mb-4">
          <div className="mt-8 flex justify-center z-20">
            <img src={user1} alt="user2" className=" border-4  rounded-full" width={90} height={90} />
          </div>
        </div>
        <div className="modal-box bg-white mt-12 ml-4 mr-4 border-4 rounded-lg pt-4">
          <div className="flex justify-center mt-8 text-2xl font-bold text-center ">Transaction Success!!</div>
          <div className="py-4 flex justify-center">Welcome Contestant! Get to the top</div>
          <div className="py-1 flex justify-center"> positions to access the prize pool!</div>
          <div className="modal-action pb-12">
            <form method="dialog " className="justify-center flex">
              <button
                className="bg-customYellowBorder mt-8 w-[285px] h-[52px] top-[320px] rounded-[30px] space-x-[6px] border-white"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/dashboard');
                }}
              >
                <div className="flex justify-center text-xl font-bold text-center studregular">Okay, Game on!</div>
              </button>
            </form>
          </div>
        </div>
     
      </div>
     
       

      {/* <dialog id="my_modal_2" className="modal rounded-xl  border-white">
        <div className="modal-box">
          <div className="flex justify-center text-2xl font-bold text-center studregular">Transaction Decline</div>
          <div className="py-4 flex justify-center text-center">Oh Snap! The credit card </div>
          <div className="py-1 flex justify-center text-center"> information was decline</div>
          <div className="modal-action">
            <form method="dialog " className="justify-center flex">
              <button className="bg-customYellowBorder mt-8 w-[285px] h-[52px] top-[320px] rounded-[30px] space-x-[6px] border-white">
                <div className="flex justify-center text-xl font-bold text-center studregular">Try Again</div>
              </button>
            </form>
          </div>
        </div>
      </dialog> */}
    </>
  );
};
export default BuyTicket;
