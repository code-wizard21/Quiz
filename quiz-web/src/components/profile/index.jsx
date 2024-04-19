import {  Drawer } from 'antd';
import vector1 from '../../assets/figma/Vector1.svg';
import group_red from '../../assets/figma/Group_red.svg';
import group_yel from '../../assets/figma/Ellipse1.svg';
import vector from '../../assets/figma/Vector1.svg';
import { useNavigate } from 'react-router-dom';
import { getTicket } from '../../service/user/user.service';
import { useSelector } from 'react-redux';
import backSvg from '../../assets/back.svg';
import sideMenuSvg from '../../assets/side-menu.svg';
import { useCallback, useEffect, useState } from 'react';
import { PlusCircleOutlined, ProfileOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { checkOutBuyCreditSession } from '../../service/payment/payment.service';
const Payment = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [ticket, setTicket] = useState(0);
  const [credit, setCredit] = useState(0);
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState(sideMenuSvg);
  const text = `
  A dog is a type of domesticated animal.
`;
  const [value, setValue] = useState(1);

  useEffect(() => {
    console.log('user', user);
    if (user != null) {
      if (user.role == 'user') {
        setName(user.name);
        const data = { id: user.id };
        getTicket(data)
          .then((res) => {
            setImageUrl(res.data.data.avatar);
            setTicket(res.data.data.ticket);
            setCredit(res.data.data.credit);
          })
          .catch((e) => console.log(e));
      } else {
        navigate('/login');
        toast.error('Please login as User', {
          autoClose: false,
        });
      }
    } else {
      navigate('/login');
      toast.error('Please login as User', {
        autoClose: false,
      });
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
  const items = [
    {
      key: '1',
      label: 'Personal Information',
      children: <p>{text}</p>,
    },
    {
      key: '2',
      label: 'Credit Activity',
      children: <p>{text}</p>,
    },
  ];
  const items1 = [
    {
      key: '1',
      label: 'Terms of service',
      children: <p>{text}</p>,
    },
  ];
  const logoutUser = useCallback(async () => {
    localStorage.removeItem('persist:root');
    localStorage.removeItem('user');
  }, []);


  return (
    <>
      <>
        <div className=" bg-cover bg-center bg-no-repeat h-screen bg-white">
          <div className="rounded-bl-3xl rounded-br-3xl bg-cover bg-center bg-no-repeat  bg-profile_gray h-[51vh]">
            <div className="flex flex-col">
              <div className="mt-4 ml-4 flex justify-start z-20">
                <Link to="/dashboard">
                  <img src={backSvg} alt="user2" className=" border-4  rounded-full" width={30} height={30} />
                </Link>
              </div>
              <div className="mt-8 flex justify-center z-20">
                <Link to="/setavatar">
                  <img src={imageUrl} alt="user2" className=" border-4  rounded-full" width={90} height={90} />
                </Link>
              </div>
            </div>
            <div className="flex flex-col mt-2">
              <div className="flex flex-row justify-center p-4">
                <div className="text-black ml-2 text-3xl font-bold text-center studregular">{name}</div>
              </div>
            </div>
            <div className="mt-2 p-4 ">
              <div className="flex justify-center">
                <>
                  <div className="flex ml-2">
                    <div className="flex-col mx-8">
                      <div className="text-black ml-2 text-xl text-center studregular">Credits</div>
                      <div className="flex justify-center  items-center ">
                        <div className="justify-center  items-center relative">
                          <img src={group_yel} alt="user2" className="border-4 rounded-full" />
                          <img
                            src={vector}
                            alt="user2"
                            style={{ position: 'absolute', left: '5px', top: '4px' }}
                            className="border-4 rounded-full"
                          />
                        </div>
                        <div className="studregular ml-1 text-black font-bold text-2xl">{credit}</div>
                      </div>
                    </div>
                    <div className="flex-col mx-8">
                      <div className="text-black ml-2 text-xl text-center studregula">Tickets</div>
                      <div className="flex justify-center items-center ml-3">
                        <img src={group_red} alt="user2" className="border-4  rounded-full" />
                        <div className="studregular ml-1  text-black font-bold text-2xl">{ticket}</div>
                      </div>
                    </div>
                  </div>
                </>
              </div>
            </div>
            <div className="flex  justify-center items-center mt-8">
              <button className="flex flex-col justify-center items-center mr-6 bg-white w-[89px] h-[104px] top-[320px] rounded-[30px] space-x-[6px] border-inherit">
                <UsergroupAddOutlined style={{ fontSize: '24px' }} />
                <div className="studregular text-center text-sm text-black mr-2">Invite Friends</div>
              </button>
              <button className="flex flex-col justify-center items-center  mr-6 bg-white w-[89px] h-[104px] top-[320px] rounded-[30px] space-x-[6px] border-inherit">
                <PlusCircleOutlined style={{ fontSize: '24px' }} />
                <div className="studregular text-center text-sm text-black mr-2" onClick={showDrawer}>
                  Buy Credits
                </div>
              </button>
              <button className="flex flex-col justify-center items-center  mr-6 bg-white w-[89px] h-[104px] top-[320px] rounded-[30px] space-x-[6px] border-inherit">
                <ProfileOutlined style={{ fontSize: '24px' }} />
                <div className="studregular text-center text-sm text-black mr-2">Withdraw Balance</div>
              </button>
            </div>
          </div>
          <div className="pr-8 pl-8 mt-20">
            <div className="studregular text-left text-sm   text-black p-1">Account</div>
            <Collapse items={items} defaultActiveKey={['0']} />
          </div>
          <div className="pr-8 pl-8 mt-2">
            <div className="studregular text-left text-sm   text-black p-1">About</div>
            <Collapse items={items1} defaultActiveKey={['0']} />
          </div>
          <Link to="/" onClick={logoutUser} className="flex items-center ml-12 mt-8 no-underline">
            <div className="text-left text-xl font-bold text-red-500 mr-2 ">Log out</div>
          </Link>
        </div>
      </>

      <Drawer title="Basic Drawer" size="large" onClose={onClose} open={open} placement="bottom">
        <div className="bg-profile_gray max-w-430 m-auto min-h-screen bg-cover bg-center ">
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
                <div className="text-xl font-bold text-center studregular">S$10.00</div>
                <div className="ml-auto text-xl font-bold mr-3 text-center studregular">100</div>
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
                onClick={() => setValue(2)}
                className={`mt-4 flex pt-2 pb-2  border-2 ${
                  value === 2 ? 'border-customYellowBorder bg-customYellowBg' : 'border-custom_gray'
                } rounded-3xl`}
              >
                <div className="flex items-center">
                  <div className="flex flex-col justify-center">
                    <div className="ml-4 text-xl font-bold text-center studregular">S$14.00</div>
                    <div className="ml-4 bg-customBuleBg pr-1 pl-1 text-white text-sm font-bold text-center studregular">
                      Save 16%
                    </div>
                  </div>

                  <div className="ml-28 text-xl font-bold mr-2 text-center studregular">160</div>
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
                    <div className="ml-4 text-xl font-bold text-center studregular">S$20.00</div>
                    <div className="ml-4 bg-customBuleBg pr-1 pl-1 text-white text-sm font-bold text-center studregular">
                      Save 24%
                    </div>
                  </div>

                  <div className="ml-28 text-xl font-bold mr-2 text-center studregular">260</div>
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
                    <div className="ml-4 text-xl font-bold text-center studregular">S$28.00</div>
                    <div className="ml-4 bg-customBuleBg pr-1 pl-1 text-white text-sm font-bold text-center studregular">
                      Save 30%
                    </div>
                  </div>

                  <div className="ml-28 text-xl font-bold mr-2 text-center studregular">400</div>
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
                <div className="ml-2 studregular text-center text-xl font-bold text-black mr-2 ">
                  Continue to Payment
                </div>
              </div>
            </button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Payment;
