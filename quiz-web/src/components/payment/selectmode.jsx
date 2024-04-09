import user1 from '../../assets/user/user2.svg';
import group_red from '../../assets/figma/Group_red.svg';
import background from '../../assets/figma/Graphic.svg';
import vector from '../../assets/figma/Vector.svg';
import { useNavigate } from 'react-router-dom';
import  { useState } from 'react';

const SelectMode = () => {
  const navigate = useNavigate();
  
  const [value, setValue] = useState(1);

  const handleChange = () => {
    navigate(`/buyticket?mode=${value}`);
  };
  
  return (
    <>
      <div
        style={{ backgroundImage: `url(${background})` }}
        className="rounded-2xl bg-cover bg-center bg-no-repeat h-screen"
      >
        <div className="flex flex-col mb-4">
          <div className="mt-14 flex justify-center z-20">
            <img src={user1} alt="user2" className=" border-4  rounded-full" width={109} height={109} />
          </div>
        </div>
        <div className="pt-2">
          <div className="flex flex-col p-4 bg-gradient-to-bl bg-white m-6 rounded-2xl">
            <div className=" flex flex-row justify-center">
              <div className="ml-2 text-3xl font-bold text-center studregular">Purchase Tickets</div>
            </div>
            <button
              onClick={() => {
                setValue(3);
              }}
              className={`mt-4 flex pt-8 pb-8  border-3 border-solid ${
                value === 3 ? 'border-customYellowBorder bg-customYellowBg' : 'border-custom_gray'
              } rounded-3xl`}
            >
              <div className="flex">
                <div className="ml-8 text-xl font-bold text-center studregular">S$3.00</div>
                <div className="ml-44 text-xl font-bold mr-3 text-center studregular">1</div>
                <img src={group_red} alt="user2" className="border-4  rounded-full" />
              </div>
            </button>
            <button
              onClick={() => setValue(5)}
              className={`mt-4 flex pt-6 pb-6  border-2 ${
                value === 5 ? 'border-customYellowBorder bg-customYellowBg' : 'border-custom_gray'
              } rounded-3xl`}
            >
              <div className="flex items-center">
                <div className="flex flex-col justify-center">
                  <div className="ml-8 text-xl font-bold text-center studregular">S$5.00</div>
                  <div className="ml-8 bg-customBuleBg pr-2 pl-2 text-white text-sm font-bold text-center studregular">Save 16%</div>
                </div>
         
                <div className="ml-44 text-xl font-bold mr-2 text-center studregular">2</div>
                <img src={group_red} alt="user2" className="border-4  rounded-full" />

              </div>
            </button>
            <button
              onClick={() => setValue(10)}
              className={`mt-4 flex pt-6 pb-6  border-2 ${
                value === 10 ? 'border-customYellowBorder bg-customYellowBg' : 'border-custom_gray'
              } rounded-3xl`}
            >
              <div className="flex items-center">
                <div className="flex flex-col justify-center">
                  <div className="ml-8 text-xl font-bold text-center studregular">S$22.00</div>
                  <div className="ml-10 bg-customBuleBg text-white text-sm font-bold text-center studregular">Save 24%</div>
                </div>
                <div className="ml-40 text-xl font-bold mr-2 text-center studregular">10</div>
                <img src={group_red} alt="user2" className="border-4  rounded-full" />
              </div>
            </button>
            <button
              onClick={() => setValue(20)}
              className={`mt-4 flex pt-6 pb-6  border-2 ${
                value === 20 ? 'border-customYellowBorder bg-customYellowBg' : 'border-custom_gray'
              } rounded-3xl`}
            >
              <div className="flex items-center">
                <div className="flex flex-col justify-center">
                  <div className="ml-8 text-xl font-bold text-center studregular">S$36.00</div>
                  <div className="ml-10 bg-customBuleBg text-white text-sm font-bold text-center studregular">Save 42%</div>
                </div>
                <div className="ml-40 text-xl font-bold mr-1 text-center studregular">20</div>
                <img src={group_red} alt="user2" className="border-4  rounded-full" />
              </div>
            </button>
            <div className="mt-4 ml-2 text-base font-bold text-center studregular">
              Purchased Tickets do not have an expiry date. Use them only when you want!
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-14 mb-14">
          <button
            onClick={handleChange}
            className="bg-customYellowBorder w-[315px] h-[52px] top-[320px] rounded-[30px] space-x-[6px]"
          >
            <div className="flex items-center justify-center">
              <img src={vector} alt="user2" />
              <div className="ml-2 studregular text-center text-xl font-bold text-black mr-2 ">Continue to Payment</div>
            </div>
          </button>
        </div>
        <a href="/payment" className="flex items-center justify-center">
          <div className="studregular text-center text-xl font-bold text-white mr-2 underline">Cancel</div>
        </a>
      </div>
    </>
  );
};
export default SelectMode;
