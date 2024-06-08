import { Drawer } from 'antd';
import vector1 from '../../assets/figma/Vector1.svg';
import group_red from '../../assets/figma/Group_red.svg';
import group_yel from '../../assets/figma/Ellipse1.svg';
import vector from '../../assets/figma/Vector.svg';
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
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState(sideMenuSvg);
  const text = `
  A dog is a type of domesticated animal.
`;
  const [value, setValue] = useState(1);
  const containerStyle = {
    position: 'relative',
    height: 950,

    overflow: 'hidden',
  };
  useEffect(() => {
    if (user != null) {
      if (user.role == 'user') {
        setName(user.username);
        const data = { id: user.id };
        getTicket(data)
          .then((res) => {
            setImageUrl(res.data.data.avatar);
            setTicket(res.data.data.ticket);
            setCredit(res.data.data.credit);
            setAmount(res.data.data.amount);
          })
          .catch((e) => console.log(e));
      } else {
        navigate('/signup');
        toast.error('Please login as User', {
          autoClose: false,
        });
      }
    } else {
      navigate('/signup');
      toast.error('Please login as User', {
        autoClose: false,
      });
    }
  }, []);
  const handlebuyCreditClick = () => {
    let amount,
      credit,
      ticket = 0;
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

    const data = {
      user: JSON.parse(localStorage.getItem('user')).user.name,
      email: JSON.parse(localStorage.getItem('user')).user.email,
      amount: amount,
      ticket: ticket,
      credit: credit,
    };
    checkOutBuyCreditSession(data)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
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
      <div style={containerStyle}>
        <div className=" bg-cover bg-center bg-no-repeat h-screen bg-white">
          <div className="rounded-bl-3xl rounded-br-3xl bg-cover bg-center bg-no-repeat  bg-profile_gray h-80">
            <div className="flex flex-col">
              <div className="mt-5 ml-4 flex justify-start z-20">
                <Link to="/quiz">
                  <img src={backSvg} alt="user2" className=" border-4  rounded-full" width={30} height={30} />
                </Link>
              </div>
              <div className=" flex mt-5 justify-center z-20">
                <Link to="/setavatar">
                  <img src={imageUrl} alt="user2" className=" border-4  rounded-full" width={65} height={65} />
                </Link>
              </div>
            </div>
            <div className="flex flex-col ">
              <div className="flex flex-row justify-center p-4">
                <div className="text-black  text-xl font-bold text-center studregular">{name}</div>
              </div>
            </div>
            <div className="p-2">
              <div className="flex justify-center">
                <>
                  <div className="flex ">
                    <div className="flex-col mx-8">
                      <div className="text-black ml-2 text-base text-center studregular">Credits</div>
                      <div className="flex justify-center  items-center ">
                        <div className="justify-center  items-center relative">
                          <img src={group_yel} alt="user2" className="border-4 rounded-full" />
                          <img
                            src={vector1}
                            alt="user2"
                            style={{ position: 'absolute', left: '5px', top: '4px' }}
                            className="border-4 rounded-full"
                          />
                        </div>
                        <div className="studregular ml-1 text-black font-bold text-base">{credit}</div>
                      </div>
                    </div>
                    <div className="flex-col mx-8">
                      <div className="text-black ml-2 text-base text-center studregula">Tickets</div>
                      <div className="flex justify-center items-center ml-3">
                        <img src={group_red} alt="user2" className="border-4  rounded-full" />
                        <div className="studregular ml-1  text-black font-bold text-base">{ticket}</div>
                      </div>
                    </div>
                    <div className="flex-col mx-8">
                      <div className="text-black text-base text-center studregula">Balance</div>
                      <div className="flex justify-center items-center ">
                        $<div className="studregular ml-1  text-black font-bold text-base">{amount}</div>
                      </div>
                    </div>
                  </div>
                </>
              </div>
            </div>
          </div>
          <div className="flex -mt-10  justify-center items-center ">
            <button className="flex px-4 flex-col justify-center items-center ml-2 bg-white w-20 h-20 rounded-[30px] space-x-[6px] border-inherit">
              <UsergroupAddOutlined style={{ fontSize: '24px' }} />
              <div className="studregular text-center text-sm text-black mr-2">Invite Friends</div>
            </button>
            <button
              onClick={showDrawer}
              className="flex flex-col justify-center items-center  ml-2 bg-white w-20 h-20   rounded-[30px] space-x-[6px] border-inherit"
            >
              <PlusCircleOutlined style={{ fontSize: '24px' }} />
              <div className="studregular text-center text-sm text-black mr-2">Buy Credits</div>
            </button>
            <button className="flex flex-col justify-center items-center  ml-2 bg-white w-20 h-20  rounded-[30px] space-x-[6px] border-inherit">
              <ProfileOutlined style={{ fontSize: '24px' }} />
              <div className="studregular text-center text-sm text-black mr-2">Withdraw Balance</div>
            </button>
          </div>
          <div className="pr-8 pl-8 mt-5">
            <div className="studregular text-left text-sm   text-black p-1">Account</div>
            <Collapse items={items} defaultActiveKey={['0']} />
          </div>
          <div className="pr-8 pl-8 mt-2">
            <div className="studregular text-left text-sm   text-black p-1">About</div>
            <Collapse items={items1} defaultActiveKey={['0']} />
          </div>
          <Link to="/signup" onClick={logoutUser} className="flex items-center ml-12 mt-8 no-underline">
            <div className="text-left text-xl font-bold text-red-500 mr-2 ">Log out</div>
          </Link>
          <div>
            <Drawer
              getContainer={false}
              className=" m-auto shadow-2xl"
              title={null}
              onClose={onClose}
              height={570}
              open={open}
              placement="bottom"
            >
              <div className="flex  bg-white flex-col m-auto justify-center ">
                <div>
                  <div className="flex justify-center  flex-col p-2 bg-gradient-to-bl  ">
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
                      <div className="pl-2 text-base text-black font-bold text-center studregular">S$10.00</div>
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
                        <div className="ml-2 p-1 bg-customBuleBg  text-white text-xs font-bold text-center">
                          Save 16%
                        </div>
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
                        <div className="ml-2 text-base text-black font-bold text-center ">S$20.00</div>
                        <div className="ml-2 p-1 bg-customBuleBg  text-white text-xs font-bold text-center">
                          Save 24%
                        </div>
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
                      className={`mt-2 flex pb-2 px-2 border-3 border-solid items-center ${
                        value === 4 ? 'border-customYellowBorder bg-customYellowBg' : 'border-custom_gray'
                      } rounded-3xl`}
                    >
                      <div className="flex flex-col  justify-center">
                        <div className="ml-2 text-base text-black font-bold text-center ">S$28.00</div>
                        <div className="ml-2 p-1 bg-customBuleBg  text-white text-xs font-bold text-center">
                          Save 30%
                        </div>
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
      </div>
    </>
  );
};

export default Payment;
