import React, { useState } from 'react';
import TopBar from '../top-bar';
import { Outlet } from 'react-router-dom';
import { Drawer } from 'antd';
import group_red from '../../assets/figma/Group_red.svg';
import group_yel from '../../assets/figma/Ellipse1.svg';
import vector from '../../assets/figma/Vector.svg';
import vector1 from '../../assets/figma/Vector1.svg';
import { checkOutBuyticketSession } from '../../service/payment/payment.service';
import { checkOutBuyCreditSession } from '../../service/payment/payment.service';
import {TCreateUser} from '../../types/user.type'



const QuizLayout: React.FC = (): React.ReactElement => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const containerStyle = {
    position: 'relative',
    height:900,
  
    overflow: 'auto',
  
  };
  const showDrawer1 = () => {
    setOpen1(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const onClose1 = () => {
    setOpen1(false);
  };
  const handleBuyTicketClick = () => {
    let amount, ticket;
    const credit = 0;
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
    let userName, userEmail;

    if (localStorage.getItem('user')) {
      userName = JSON.parse(localStorage.getItem('user')!).user.name;
      userEmail = JSON.parse(localStorage.getItem('user')!).user.email;
    }
 

    const data:TCreateUser = {
      user: userName,
      email: userEmail,
      amount: amount,
      ticket: ticket,
      credit: credit,
    };
    checkOutBuyticketSession(data)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          window.location.href = res.data.redirectUrl;
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const handlebuyCreditClick = () => {
    let amount = 0,
      credit = 0;
    const ticket = 0;
    switch (value) {
      case 1:
        amount = 1000;
        credit = 100;
        break;
      case 2:
        amount = 1400;
        credit = 160;
        break;
      case 3:
        amount = 2000;
        credit = 250;
        break;
      case 4:
        amount = 2800;
        credit = 400;
        break;
      default:
        amount = 0;
        credit = 0;
    }
    let userName, userEmail;
    if (localStorage.getItem('user')) {
      userName = JSON.parse(localStorage.getItem('user')!).user.name;
      userEmail = JSON.parse(localStorage.getItem('user')!).user.email;
    }
    const data:TCreateUser = {
      user: userName,
      email:userEmail,
      amount: amount,
      ticket: ticket,
      credit: credit,
    };
    checkOutBuyCreditSession(data)
      .then((res) => {
        console.log('resresres',res);
        if (res.status == 200) {
          window.location.href = res.data.redirectUrl;
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const [value, setValue] = useState(1);
  return (
    <div  className="w-full  bg-gray-100  overflow-auto">
      <div style={containerStyle}  className="max-w-430 m-auto shadow-xl bg-white ">
        <TopBar showDrawer={showDrawer} showDrawer1={showDrawer1} />
        <Outlet />
        <Drawer title={null} getContainer={false} height={600} onClose={onClose} open={open} placement="bottom">
          <div>
            <div>
              <div className="flex flex-col p-2 bg-gradient-to-bl bg-white ">
                <div className=" flex flex-row justify-center">
                  <div className="ml-2 text-xl font-bold text-center studregular">Purchase Tickets</div>
                </div>
                <button
                  onClick={() => {
                    setValue(1);
                  }}
                  className={`mt-2 flex p-4 border-3 px-4 border-solid items-center ${
                    value === 1 ? 'border-customYellowBorder bg-customYellowBg' : 'border-custom_gray'
                  } rounded-3xl`}
                >
                  <div className="text-base ml-2 text-black font-bold text-center studregular">S$3.00</div>
                  <div className="ml-auto text-base text-black font-bold mr-3 text-center studregular">1</div>
                  <img src={group_red} alt="user2" className="border-4  rounded-full" />
                </button>
                <button
                  onClick={() => {
                    setValue(2);
                  }}
                  className={`mt-2 flex pb-1 px-2 border-3 border-solid items-center ${
                    value === 2 ? 'border-customYellowBorder bg-customYellowBg' : 'border-custom_gray'
                  } rounded-3xl`}
                >
                  <div className="flex flex-col justify-center">
                    <div className="ml-2 text-base text-black font-bold text-center ">S$5.00</div>
                    <div className="ml-2 p-1 bg-customBuleBg  text-white text-xs font-bold text-center">Save 16%</div>
                  </div>

                  <div className="ml-auto text-base font-bold text-black mr-3 text-center studregular">2</div>
                  <img src={group_red} alt="user2" className="border-4  rounded-full" />
                </button>
                <button
                  onClick={() => {
                    setValue(3);
                  }}
                  className={`mt-2 flex pb-1  px-2 border-3 border-solid items-center ${
                    value === 3 ? 'border-customYellowBorder bg-customYellowBg' : 'border-custom_gray'
                  } rounded-3xl`}
                >
                  <div className="flex flex-col justify-center">
                    <div className="ml-2 text-base text-black font-bold text-center ">S$22.00</div>
                    <div className="ml-2 p-1 bg-customBuleBg  text-white text-xs font-bold text-center">Save 24%</div>
                  </div>

                  <div className="ml-auto text-base text-black font-bold mr-3 text-center studregular">10</div>
                  <img src={group_red} alt="user2" className="border-4  rounded-full" />
                </button>
                <button
                  onClick={() => {
                    setValue(4);
                  }}
                  className={`mt-2 pb-1 flex  px-2 border-3 border-solid items-center ${
                    value === 4 ? 'border-customYellowBorder bg-customYellowBg' : 'border-custom_gray'
                  } rounded-3xl`}
                >
                  <div className="flex flex-col justify-center">
                    <div className="ml-2 text-black text-black text-base font-bold text-center ">S$36.00</div>
                    <div className="ml-2 p-1 bg-customBuleBg  text-white text-xs font-bold text-center">Save 42%</div>
                  </div>

                  <div className="ml-auto text-base text-black font-bold mr-3 text-center studregular">20</div>
                  <img src={group_red} alt="user2" className="border-4  rounded-full" />
                </button>

                <div className="mt-1 text-sm font-bold text-center studregular">
                  Purchased Tickets do not have an expiry date. Use them only when you want!
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-2 mb-4">
              <button
                onClick={handleBuyTicketClick}
                className="bg-customYellowBorder border-white w-[295px] h-[45px] top-[320px] rounded-[30px] space-x-[6px]"
              >
                <div className="flex items-center justify-center">
                  <img src={vector} alt="user2" />
                  <div className="ml-2 studregular text-center text-base font-bold text-black mr-2 ">
                    Continue to Payment
                  </div>
                </div>
              </button>
            </div>
          </div>
        </Drawer>
        <Drawer title={null}  getContainer={false}height={600} onClose={onClose1} open={open1} placement="bottom">
          <div>
            <div>
              <div className="flex flex-col p-2 bg-gradient-to-bl bg-white ">
                <div className=" flex flex-row justify-center">
                  <div className="ml-2 text-xl font-bold text-center studregular">Purchase Tickets</div>
                </div>
                <button
                  onClick={() => {
                    setValue(1);
                  }}
                  className={`mt-2 flex p-4  border-3 border-solid items-center ${
                    value === 1 ? 'border-customYellowBorder bg-customYellowBg' : 'border-custom_gray'
                  } rounded-3xl`}
                >
                  <div className="pl-2 text-black text-base font-bold text-center studregular">S$10.00</div>
                  <div className="ml-auto text-base text-black font-bold mr-3 text-center studregular">100</div>
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
                <button
                  onClick={() => {
                    setValue(2);
                  }}
                  className={`mt-2 flex pb-2 px-2 border-3 border-solid items-center ${
                    value === 2 ? 'border-customYellowBorder bg-customYellowBg' : 'border-custom_gray'
                  } rounded-3xl`}
                >
                  <div className="flex flex-col  justify-center">
                    <div className="ml-2 text-base text-black font-bold text-center ">S$14.00</div>
                    <div className="ml-2 p-1 bg-customBuleBg  text-white text-xs font-bold text-center">Save 16%</div>
                  </div>

                  <div className="ml-auto text-base text-black font-bold mr-3 text-center studregular">160</div>
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
                <button
                  onClick={() => {
                    setValue(3);
                  }}
                  className={`mt-2 flex pb-2 px-2 border-3 border-solid items-center ${
                    value === 3 ? 'border-customYellowBorder bg-customYellowBg' : 'border-custom_gray'
                  } rounded-3xl`}
                >
                  <div className="flex flex-col  justify-center">
                    <div className="ml-2 text-base font-bold text-black text-center ">S$20.00</div>
                    <div className="ml-2 p-1 bg-customBuleBg  text-white text-xs font-bold text-center">Save 24%</div>
                  </div>

                  <div className="ml-auto text-base text-black font-bold mr-3 text-center studregular">260</div>
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
                <button
                  onClick={() => {
                    setValue(4);
                  }}
                  className={`mt-2 flex pb-2 px-2 text-black border-3 border-solid items-center ${
                    value === 4 ? 'border-customYellowBorder bg-customYellowBg' : 'border-custom_gray'
                  } rounded-3xl`}
                >
                  <div className="flex flex-col  justify-center">
                    <div className="ml-2 text-base font-bold text-center ">S$28.00</div>
                    <div className="ml-2 p-1 bg-customBuleBg  text-white text-xs font-bold text-center">Save 30%</div>
                  </div>

                  <div className="ml-auto text-base text-black font-bold mr-3 text-center studregular">400</div>
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

                <div className="mt-1 text-sm font-bold text-center studregular">
                  Purchased Tickets do not have an expiry date. Use them only when you want!
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-2 mb-4">
              <button
                onClick={handlebuyCreditClick}
                className="bg-customYellowBorder border-white w-[295px] h-[45px] top-[320px] rounded-[30px] space-x-[6px]"
              >
                <div className="flex items-center justify-center">
                  <img src={vector} alt="user2" />
                  <div className="ml-2 studregular text-center text-base font-bold text-black mr-2 ">
                    Continue to Payment
                  </div>
                </div>
              </button>
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default QuizLayout;
