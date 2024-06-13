import { Button, Upload, Col, Row, Avatar,message } from 'antd';
import { setAvatar } from '../../service/user/user.service';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import sideMenuSvg from '../../assets/side-menu.svg';
import { useSelector } from 'react-redux';
import type { UploadProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UploadURL } from '../../../env.config';
import { getTicket } from '../../service/user/user.service';
interface User {
  agora: {
    uuid: string;
    username: string;
  };
  createdAt: string;
  credit: number;
  email: string;
  id: string;
  isEmailVerified: boolean;
  name: string;
  role: string;
  ticket: number;
  updatedAt: string;
  username: string;
}
type SetAvatarData = {
  email: string;
  avatar: string;
};
interface RootState {
  auth: {
    user: User;
  };
  // other slices of state
}
const SingUp: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [imageUrl, setImageUrl] = useState(sideMenuSvg);
  useEffect(() => {
    if (user != null) {
      if (user.role == 'user') {
        const data = { id: user.id };
        getTicket(data)
          .then((res) => {
            setImageUrl(res?.data?.data?.avatar);
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
  const savaAvatar = () => {
    console.log('usere', user.email);
    const data: SetAvatarData = { email: user.email, avatar: imageUrl };
    setAvatar(data)
      .then((res) => {
        if (res.status == 200) {
          // localStorage.setItem('user', JSON.stringify(res.data.data));
          toast.success('Your avatar has been successfully stored.', {
            autoClose: false,
          });
          const defaultPath = '/quiz';
          const prevPath = localStorage.getItem('prevPath') || defaultPath;
          localStorage.removeItem('prevPath');
          if (prevPath !== defaultPath) {
            localStorage.setItem('showWelcomeModal', 'true');
          }

          navigate(prevPath);
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error(e, {
          autoClose: false,
        });
      });
  };
  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
    }
    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
      message.error('Image must smaller than 1MB!');
    }
    return isImage && isLt1M;
  };
  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      const url = UploadURL + '/' + info.file.response.filePath;
      console.log('UploadURL+url', url);

      setImageUrl(url);
    }
    if (info.file.status === 'error') {
      // Handle error here
      console.error(info.file.error);
    }
  };

  return (
    <div className="registration-page px-8 block" style={{ flexDirection: 'column' }}>
      <Row style={{ width: '100%' }}>
        <div style={{ margin: 'auto' }} className="text-3xl font-stud-regular text-white pt-32 pb-6">
          Your Profile Picture
        </div>
        <div style={{ margin: 'auto' }} className="text-base font-stud-regular text-white pt-6 pb-12">
          {' '}
          What’s your best angle? Upload it now.
        </div>
      </Row>
      <Row style={{ width: '100%', padding: '2vh', marginBottom: '10vh' }}>
        <Col span={24}>
          <a style={{ margin: '33%' }} className="items-center mt-32 pb-6">
            <Upload
              name="avatar"
              listType="picture-circle"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              action={UploadURL}
              onChange={handleChange}
            >
              <Avatar src={imageUrl} alt="side-menu" size={100} />
            </Upload>
          </a>
        </Col>
      </Row>
      <Row>
        <Button
          type="primary"
          onClick={savaAvatar}
          className="login-form-button quiz-action-btn w-full h-12 text-black font-stud-regular rounded-3xl"
        >
          Next
        </Button>
      </Row>
    </div>
  );
};
export default SingUp;
