import { Button, Checkbox, Form, Input, Row } from 'antd';
import { AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { USER_ROLE } from '../../constants/enum';
import { setUserData } from '../../redux/actions/auth.action';
import { register } from '../../service/user/user.service';
import { ILoginResponse, TCreateUser } from '../../types/user.type';
import { toast } from 'react-toastify';
import evaarrow from '../../assets/eva_arrow-back-fill_white.svg'

const SingUp: React.FC = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'login',
  });
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCorrect, setIsCorrect] = useState(true);
  const [isCheckingCred, setIsCheckingCred] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const onFinish = useCallback(
    (values: TCreateUser) => {
      if (!termsAgreed) {
        toast.error('Please agree to the terms and conditions', {
          autoClose: false,
        });
        return;
      }

      setIsCheckingCred(true);

      // check if users local storage already has a shadow account details
      const user: ILoginResponse = JSON.parse(localStorage.getItem('user') || '{}');

      if (user?.user?.role === USER_ROLE.SHADOW) {
        values.shadow_user_id = user?.user?.id;
        values.refresh_token = user?.tokens?.refresh?.token;
      }
      console.log('valuse', values);
      register(values)
        .then((res: AxiosResponse<ILoginResponse>) => {
          toast.success('Register was successful', {
            autoClose: false,
          });
          localStorage.setItem('user', JSON.stringify(res.data));
          localStorage.setItem('hasRegistered', 'true');
          dispatch(setUserData(res.data.user));
          navigate('/setavatar');
        })
        .catch((err) => {
          toast.error(err.message, {
            autoClose: false,
          });
        })
        .finally(() => {
          setIsCheckingCred(false);
        });
    },
    [isCheckingCred, isCorrect, termsAgreed]
  );

  useEffect(() => {
    if (!isCorrect) {
      form.validateFields(['password']);
    }
  }, [isCorrect]);

  return (
    <Row className="registration-page px-8 block">
        <div className="pt-5  flex justify-start z-20">
        <Link to="/">
          <img src={evaarrow} alt="user2" className=" border-4  rounded-full" width={25} height={25} />
        </Link>
      </div>
      <div className="text-xl font-stud-regular text-white pt-5">Create account</div>
    
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
          rules={[{ required: true, message: `Email is required` }]}
          label={<span className="text-white">Email address</span>}
        >
          <Input placeholder="Enter your email" className="h-12 rounded-xl" />
        </Form.Item>
        <Form.Item
          name="name"
          rules={[{ required: true, message: `Full name is required` }]}
          label={<span className="text-white">Full name</span>}
        >
          <Input placeholder="Enter your full name" className="h-12 rounded-xl" />
        </Form.Item>
        <Form.Item className="text-white" name="mobile" label={<span className="text-white">Mobile number</span>}>
          <PhoneInput country={'us'} containerClass="phone-input-container" />
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
          <Input.Password className="py-3 rounded-xl" placeholder="Enter your password" />
        </Form.Item>
        <Checkbox className="text-white" onChange={(e) => setTermsAgreed(e.target.checked)}>
          I agree to the <Link to={'/term'}>terms and conditions</Link>
        </Checkbox>
        <Form.Item className="pt-2">
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button quiz-action-btn w-full h-10 text-black font-stud-regular rounded-3xl"
            loading={isCheckingCred}
          >
            Create account
          </Button>
        </Form.Item>
      </Form>
  
    </Row>
  );
};

export default SingUp;
