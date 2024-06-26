import { Button, Checkbox, Form, Input } from 'antd';
import { AxiosError, AxiosResponse } from 'axios';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setUserData } from '../../redux/actions/auth.action';
import { login } from '../../service/auth/auth.service';
import { ILoginResponse, IUser } from '../../types/user.type';
import { toast } from 'react-toastify';

import evaarrow from '../../assets/eva_arrow-back-fill_white.svg';

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
      if(localStorage.getItem('user')){
        const userInfo=JSON.parse(localStorage.getItem('user')!);
        console.log('userInfo',userInfo);
        if(userInfo.user.role=='shadow'){
          values.shadowID=userInfo.user.id;
        }
        console.log('userInfo',userInfo);
      }
      if (values.remember) {
        delete values.remember;
      }
      login(values)
        .then((res: AxiosResponse<ILoginResponse>) => {
          toast.success('Login was successful', {
            autoClose: false,
          });
          setIsCorrect(true);
          console.log('res.data',res.data);
          dispatch(setUserData(res.data.user));
          localStorage.setItem('user', JSON.stringify(res.data));
          localStorage.setItem('hasRegistered', 'true');
          
          const defaultPath = '/quiz';
          const prevPath = localStorage.getItem('prevPath') || defaultPath;
          localStorage.removeItem('prevPath');
      

          navigate(prevPath);
        })
        .catch((err: AxiosError) => {
  
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
      <div className="pt-20  flex justify-start z-20">
        <Link to="/signup">
          <img src={evaarrow} alt="user2" className=" border-4  rounded-full" width={30} height={30} />
        </Link>
      </div>
      <div className="pt-5 pb-10 text-2xl text-white font-stud-bold text-left">Welcome back</div>

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

        <Form.Item className="pt-6">
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button quiz-action-btn w-full h-12 text-black font-stud-regular rounded-3xl"
            loading={isCheckingCred}
          >
            Login
          </Button>
          <div className="text-center text-sm mt-4">
            <Link to="/login" className="text-white">
              Forgot Password?
            </Link>
          </div>
        </Form.Item>
      </Form>
   
    </div>
  );
};

export default Login;
