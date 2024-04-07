import React, { useCallback, useState } from 'react';
import { Button, Form, FormItem, Input, Text } from '../../components/atoms';
import { useTranslation } from 'react-i18next';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import {
  TForgetPassword,
  TForgetPasswordResponse,
} from '../../types/auth.type';
// import styles from './auth.module.scss';
import { forgotPassword } from '../../service/auth/auth.service';

const ForgetPassword: React.FC = (): React.ReactElement => {
  const { t } = useTranslation('translation', { keyPrefix: 'pageAuth' });
  const { t: errorTranslator } = useTranslation('translation', {
    keyPrefix: 'errorMessages',
  });
  const navigate: NavigateFunction = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>();
  const userNamePlaceHolder: string =
    t('userNamePlaceholder', 'userNamePlaceholder') || 'userNamePlaceholder';
  const userNameError: string = t('userNameError') || 'userNameError';

  const handleSubmit = useCallback(
    async (forgetPasswordData: TForgetPassword) => {
      try {
        const response: AxiosResponse = await forgotPassword(
          forgetPasswordData
        );
        const forgetPassword: TForgetPasswordResponse = response.data;
        alert(forgetPassword.message);
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          errorTranslator('genericErrorMessage');
        setErrorMessage(errorMessage);
      }
    },
    []
  );

  const navigateToLogin = useCallback(() => {
    navigate('/login');
  }, []);

  return (
    <div 
    // className={styles[componentClassPrefix]}
    >
      <Form className="login-form" onFinish={handleSubmit}>
        <FormItem
          name="email"
          rules={[{ required: true, message: userNameError }]}
        >
          <Input
            // prefix={<Icon name="user-outline" />}
            placeholder={userNamePlaceHolder}
            size="large"
          />
        </FormItem>
        {errorMessage && <Text type="danger">{errorMessage}</Text>}
        <FormItem name="remember" valuePropName="checked">
          <div 
          // className={styles[`${componentClassPrefix}__actions`]}
          >
            <div 
            // className={styles[`${componentClassPrefix}__actions-btn`]}
            >
              <Button
                className="btn-gradiant"
                type="primary"
                htmlType="submit"
                size="large"
              >
                {t('lostYourPassword')}
              </Button>
            </div>
          </div>
        </FormItem>
        <div 
        // className={styles[`${componentClassPrefix}__footer`]}
        >
          <Button
            
            // className={styles[`${componentClassPrefix}__footer-btn`]}
            type="link"
            onClick={navigateToLogin}
          >
            {t('loginBtnText')}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ForgetPassword;
