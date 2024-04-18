import group_red from '../../assets/figma/Group_red.svg';
import group_yel from '../../assets/figma/Ellipse1.svg';
import vector from '../../assets/figma/Vector1.svg';
import { useNavigate } from 'react-router-dom';
import { getTicket } from '../../service/user/user.service';
import { useSelector } from 'react-redux';
import sideMenuSvg from '../../assets/side-menu.svg';
import { useCallback, useEffect, useState } from 'react';
import { PlusCircleOutlined, ProfileOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Payment = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [ticket, setTicket] = useState(0);
  const [credit, setCredit] = useState(0);
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState(sideMenuSvg);
  const text = `
  A dog is a type of domesticated animal.
`;
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
    localStorage.clear();
  }, []);
  const handlePayment = () => {
    navigate('/selectmode');
  };
  return (
    <>
      <div className=" bg-cover bg-center bg-no-repeat h-screen bg-white">
        <div className="rounded-bl-3xl rounded-br-3xl bg-cover bg-center bg-no-repeat  bg-profile_gray h-[50vh]">
          <div className="flex flex-col">
            <div className="mt-12 flex justify-center z-20">
              <Link to='/setavatar'>
              <img src={imageUrl} alt="user2" className=" border-4  rounded-full" width={90} height={90} />
              </Link>
            </div>
          </div>

          <div className="flex flex-col mt-2">
            <div className="flex flex-row justify-center p-4">
              <div className="text-black ml-2 text-3xl font-bold text-center studregular">{name}</div>
            </div>
          </div>

          <div className="mt-2 p-4">
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
          <div className="flex  justify-center items-center  mt-14">
            <button className="flex flex-col justify-center items-center mr-6 bg-white w-[89px] h-[104px] top-[320px] rounded-[30px] space-x-[6px] border-inherit">
              <UsergroupAddOutlined style={{ fontSize: '24px' }} />
              <div className="studregular text-center text-sm text-black mr-2">Invite Friends</div>
            </button>
            <button className="flex flex-col justify-center items-center  mr-6 bg-white w-[89px] h-[104px] top-[320px] rounded-[30px] space-x-[6px] border-inherit">
              <PlusCircleOutlined style={{ fontSize: '24px' }} />
              <div className="studregular text-center text-sm text-black mr-2" onClick={handlePayment}>
                Buy Tickets
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

        <Link to="/login" onClick={logoutUser} className="flex items-center ml-12 mt-8 no-underline">
          <div className="text-left text-xl font-bold text-red-500 mr-2 ">Log out</div>
        </Link>
      </div>
    </>
  );
};
export default Payment;
