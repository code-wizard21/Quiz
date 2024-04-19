import { useEffect, useState } from 'react';
import group_red from '../../assets/figma/Group_red.svg';
import background from '../../assets/figma/Graphic.svg';
import vector from '../../assets/figma/Vector.svg';
import vector1 from '../../assets/figma/Vector1.svg';
import { useNavigate } from 'react-router-dom';
import { checkOutSession } from '../../service/payment/payment.service';
import sideMenuSvg from '../../assets/side-menu.svg';
import { useSelector } from 'react-redux';
import { getTicket } from '../../service/user/user.service';
import group_yel from '../../assets/figma/Ellipse1.svg';

const SelectMode = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(1);
  const { user } = useSelector((state) => state.auth);
  const [imageUrl, setImageUrl] = useState(sideMenuSvg);

  useEffect(() => {
    if (user != null) {
      if (user.role == 'user') {
        const data = { id: user.id };

        getTicket(data)
          .then((res) => {
            setImageUrl(res.data.data.avatar);
          })
          .catch((e) => console.log(e)); // Log any error occurred

        console.log('###############'); // Logging ###############
      }
    }
  }, []);
  const handleClick = () => {
    let amount, ticket;
    switch (value) {
      case 1:
        amount = 300;
        ticket = 1;
        break;
      case 2:
        amount = 500;
        ticket = 2;
        break;
      case 3:
        amount = 2200;
        ticket = 10;
        break;
      case 4:
        amount = 3600;
        ticket = 20;
        break;
      default:
        amount = 0;
        ticket = 0;
    }

    const data = {
      user: JSON.parse(localStorage.getItem('user')).user.name,
      email: JSON.parse(localStorage.getItem('user')).user.email,
      amount: amount,
      ticket: ticket,
    };
    checkOutBuyCreditSession(data)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          navigate(res.data);
          window.location.href = res.data;
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };
  return (
    <>
      <div
        style={{ backgroundImage: `url(${background})` }}
        className="rounded-2xl bg-cover bg-center bg-no-repeat h-screen"
      >
        <div className="flex flex-col mb-1">
          <div className="mt-4 flex justify-center z-20">
            <img src={imageUrl} alt="user2" className="border-4  rounded-full" width={90} height={90} />
          </div>
        </div>
        <div className="pt-2">
          <div className="flex flex-col p-4 bg-gradient-to-bl bg-white m-6 rounded-2xl">
            <div className=" flex flex-row justify-center">
              <div className="ml-2 text-2xl font-bold text-center studregular">Purchase Tickets</div>
            </div>
            <button
              onClick={() => {
                setValue(1);
              }}
              className={`mt-4 flex p-4 border-3 border-solid items-center ${
                value === 1 ? 'border-customYellowBorder bg-customYellowBg' : 'border-custom_gray'
              } rounded-3xl`}
            >
              <div className="text-xl font-bold text-center studregular">S$3.00</div>
              <div className="ml-auto text-xl font-bold mr-3 text-center studregular">1</div>
              <div className="justify-center  items-center relative">
                <img src={group_yel} alt="user2" className="border-4 rounded-full" />
                <img
                  src={vector1}
                  alt="user2"
                  style={{ position: 'absolute', left: '5px', top: '4px' }}
                  className="border-4 rounded-full"
                />
              </div>
            </button>
            {/* <button
              onClick={() => setValue(3)}
              className={`mt-4 flex p-4 border-2 items-center${
                value === 2 ? 'border-customYellowBorder bg-customYellowBg' : 'border-custom_gray'
              } rounded-3xl`}
            >           
                <div className="flex flex-col justify-center">
                  <div className="text-xl font-bold text-center studregular">S$5.00</div>
                  <div className="bg-customBuleBg pr-1 pl-1 text-white text-sm font-bold text-center studregular">Save 16%</div>
                </div>
         
                <div className="ml-auto text-xl font-bold mr-2 text-center studregular">10</div>
                <img src={group_red} alt="user2" className="border-4  rounded-full" />

            
            </button> */}

<button
              onClick={() => setValue(3)}
              className={`mt-4 flex pt-2 pb-2  border-2 ${
                value === 3 ? 'border-customYellowBorder bg-customYellowBg' : 'border-custom_gray'
              } rounded-3xl`}
            >
              <div className="flex items-center">
                <div className="flex flex-col justify-center">
                  <div className="ml-4 text-xl font-bold text-center studregular">S$22.00</div>
                  <div className="ml-4 bg-customBuleBg pr-1 pl-1 text-white text-sm font-bold text-center studregular">
                    Save 24%
                  </div>
                </div>

                <div className="ml-28 text-xl font-bold mr-2 text-center studregular">10</div>
                <div className="justify-center  items-center relative">
                <img src={group_yel} alt="user2" className="border-4 rounded-full" />
                <img
                  src={vector1}
                  alt="user2"
                  style={{ position: 'absolute', left: '5px', top: '4px' }}
                  className="border-4 rounded-full"
                />
              </div>
              </div>
            </button>
            <button
              onClick={() => setValue(3)}
              className={`mt-4 flex pt-2 pb-2  border-2 ${
                value === 3 ? 'border-customYellowBorder bg-customYellowBg' : 'border-custom_gray'
              } rounded-3xl`}
            >
              <div className="flex items-center">
                <div className="flex flex-col justify-center">
                  <div className="ml-4 text-xl font-bold text-center studregular">S$22.00</div>
                  <div className="ml-4 bg-customBuleBg pr-1 pl-1 text-white text-sm font-bold text-center studregular">
                    Save 24%
                  </div>
                </div>

                <div className="ml-28 text-xl font-bold mr-2 text-center studregular">10</div>
                <div className="justify-center  items-center relative">
                <img src={group_yel} alt="user2" className="border-4 rounded-full" />
                <img
                  src={vector1}
                  alt="user2"
                  style={{ position: 'absolute', left: '5px', top: '4px' }}
                  className="border-4 rounded-full"
                />
              </div>
              </div>
            </button>
            <button
              onClick={() => setValue(4)}
              className={`mt-4 flex pt-2 pb-2  border-2 ${
                value === 4 ? 'border-customYellowBorder bg-customYellowBg' : 'border-custom_gray'
              } rounded-3xl`}
            >
              <div className="flex items-center">
                <div className="flex flex-col justify-center">
                  <div className="ml-4 text-xl font-bold text-center studregular">S$36.00</div>
                  <div className="ml-4 bg-customBuleBg pr-1 pl-1 text-white text-sm font-bold text-center studregular">
                    Save 42%
                  </div>
                </div>

                <div className="ml-28 text-xl font-bold mr-2 text-center studregular">20</div>
                <div className="justify-center  items-center relative">
                <img src={group_yel} alt="user2" className="border-4 rounded-full" />
                <img
                  src={vector1}
                  alt="user2"
                  style={{ position: 'absolute', left: '5px', top: '4px' }}
                  className="border-4 rounded-full"
                />
              </div>
              </div>
            </button>
            <div className="mt-4 ml-2 text-base font-bold text-center studregular">
              Purchased Tickets do not have an expiry date. Use them only when you want!
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-14 mb-14">
          <button
            onClick={handleClick}
            className="bg-customYellowBorder border-white w-[295px] h-[45px] top-[320px] rounded-[30px] space-x-[6px]"
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