import { Button, Checkbox, Form, Input, Row, Col } from 'antd';
import { AxiosError, AxiosResponse } from 'axios';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setUserData } from '../../redux/actions/auth.action';
import { login } from '../../service/auth/auth.service';
import { ILoginResponse, IUser } from '../../types/user.type';
import { toast } from 'react-toastify';
import { Divider } from 'antd';
import facebook from '../../assets/social/facebook.svg';
import google from '../../assets/social/Google.svg';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation('translation', {
    keyPrefix: 'login',
  });
  const [form] = Form.useForm();
  const [isCorrect, setIsCorrect] = React.useState(true);
  const [isCheckingCred, setIsCheckingCred] = React.useState(false);
  const onFinish = useCallback(
    (values: IUser) => {
      setIsCheckingCred(true);
      if (values.remember) {
        delete values.remember;
      }
      login(values)
        .then((res: AxiosResponse<ILoginResponse>) => {
          toast.success('Login was successful', {
            autoClose: false,
          });
          setIsCorrect(true);
          localStorage.setItem('user', JSON.stringify(res.data));
          localStorage.setItem('hasRegistered', 'true');
          dispatch(setUserData(res.data.user));
          navigate('/dashboard');
        })
        .catch((err: AxiosError) => {
          console.log('err', err);
          toast.error(err.message, {
            autoClose: false,
          });
          if (Number(err.code) === 401) {
            setIsCorrect(false);
          }
        })
        .finally(() => {
          setIsCheckingCred(false);
        });
    },
    [isCheckingCred, isCorrect]
  );

  useEffect(() => {
    if (!isCorrect) {
      console.log('isCorrect', isCorrect);
      form.validateFields(['password']);
    }
  }, [isCorrect]);

  return (
    <div className="registration-page px-8">
      <div className="pt-40 pb-4 text-3xl text-white font-stud-bold text-left">Welcome back</div>
      <Form
        name="login"
        layout="vertical"
        form={form}
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        requiredMark={false}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: `${t('error.email_error')}` }]}
          label={<span className="text-white">Email address or mobile number</span>}
        >
          <Input placeholder="Enter your email" className="h-12" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: `${t('error.password_error')}` },
            {
              message: `${t('error.cred_error')}`,
              validateTrigger: 'onSubmit',
              validator: async () => {
                if (isCorrect) {
                  return Promise.resolve();
                } else {
                  setIsCorrect(true);
                  return Promise.reject();
                }
              },
            },
          ]}
          label={<span className="text-white">Password</span>}
        >
          <Input.Password className="py-3" placeholder="Enter your password" />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked" className="mb-4">
          <Checkbox className="text-white">Remember me</Checkbox>
        </Form.Item>

        <Form.Item className="pt-12">
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button quiz-action-btn w-full h-12 text-black font-stud-regular rounded-3xl"
            loading={isCheckingCred}
          >
            Login
          </Button>
          <div className="text-center text-base mt-4">
            <Link to="/login" className="text-white">
              Forgot Password?
            </Link>
          </div>
        </Form.Item>
      </Form>
      <Divider style={{ borderColor: 'white', color: 'white' }}>Or Log in with</Divider>
      <Row>
        <Col span={12}>
          <Button
            className="quiz-action-btn h-12 mt-6 shadow-none font-bold rounded-3xl w-full"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: '#FFFFFF',
              borderColor: 'rgba(255, 255, 255, 0.2)',
            }}
          >
            
            <div className="flex items-center justify-center">
              <img src={facebook} alt="user2" />
              <div className="ml-2 studregular text-center text-base font-bold text-white mr-2 ">Facebook</div>
            </div>
          </Button>
        </Col>
        <Col span={12}>
          <Button
            className="quiz-action-btn h-12 mt-6 shadow-none font-bold ml-4 rounded-3xl w-full"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: '#FFFFFF',
              borderColor: 'rgba(255, 255, 255, 0.2)',
            }}
          >
            <div className="flex items-center justify-center">
              <img src={google} alt="user2" />
              <div className="ml-2 studregular text-center text-base font-bold text-white mr-2 ">Google</div>
            </div>
             
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
