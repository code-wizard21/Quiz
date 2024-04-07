import user1 from '../../assets/user/user2.svg';
import group_red from '../../assets/figma/Group_red.svg';
import group_yel from '../../assets/figma/Ellipse1.svg';
import frame from '../../assets/figma/Frame.svg';
import vector from '../../assets/figma/Vector1.svg';
import background from '../../assets/figma/Graphic.svg';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Payment=()=>{
  const navigate = useNavigate();
  const handleChange = () => {
    navigate('/selectmode');
  };
  const { user } = useSelector((state) => state.auth);
  console.log('user',user)
  return (
    <>
      <div
        style={{ backgroundImage: `url(${background})` }}
        className="rounded-2xl bg-cover bg-center bg-no-repeat h-screen"
      >
        <div className="flex flex-col">
          <div className="mt-24 flex justify-center z-20">
            <img src={user1} alt="user2" className=" border-4  rounded-full" width={109} height={109} />
          </div>
        </div>

        <div className="flex flex-col mt-8">
          <div className="mt-4 flex flex-row justify-center p-4">
            <img src={frame} alt="frame" />
            <div className="text-customYellowBorder ml-2 text-6xl font-bold text-center studregular">$8402</div>
          </div>

          <div className="studregular text-center text-sm text-2xl font-bold  text-white">
            Estimated Prize Pool, each Ticket adds $1
          </div>
        </div>

        <div className="pr-14 pl-14 mt-4">
          <div className="studregular text-center text-2xl font-bold  text-white p-1">
            Join the Quiz and compete to be the winner by entering with a Ticket
          </div>
        </div>

        <div className="mt-4 p-10 ">
          <div className="flex justify-center">
            {user && (
              <>
                <div className="studregular font-bold text-2xl text-white">Your account:</div>
                <div className="flex ml-8">
                  <div className="flex justify-center items-center relative">
                    <img src={group_yel} alt="user2" className="border-4 rounded-full" />
                    <img
                      src={vector}
                      alt="user2"
                      style={{ position: 'absolute', left: '5px', top: '8px' }}
                      className="border-4 rounded-full"
                    />
                    <div className="studregular ml-1 text-white font-bold text-2xl">10</div>
                  </div>
                  <div className="flex justify-center items-center ml-3">
                    <img src={group_red} alt="user2" className="border-4  rounded-full" />
                    <div className="studregular ml-1  text-white font-bold text-2xl">10</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button className="bg-customBlue w-[315px] h-[52px] top-[320px] rounded-[30px] space-x-[6px]">
            <div className="flex items-center justify-center">
              <div className="studregular text-center text-xl font-bold text-white mr-2 ">Use 1 Ticket</div>
              <img src={group_red} alt="user2" />
            </div>
          </button>
        </div>
        <div className="flex justify-center mt-14 mb-14">
          <button
            onClick={handleChange}
            className="bg-customYellowBorder w-[315px] h-[52px] top-[320px] rounded-[30px] space-x-[6px]"
          >
            <div className="flex items-center justify-center">
              <div className="studregular text-black text-center text-xl font-bold  mr-2 ">Buy Tickets</div>
              <img src={group_red} alt="user2" />
            </div>
          </button>
        </div>

        <a href="/dashboard" className="flex items-center justify-center">
          <div className="studregular text-center text-xl font-bold text-white mr-2 underline">Cancel</div>
        </a>
      </div>
    </>
  );
};
export default Payment;
