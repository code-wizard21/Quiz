import React, { useCallback, useState } from 'react';
import { Button, Form, FormItem, Input, Text } from '../../components/atoms';
import { useTranslation } from 'react-i18next';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
// import styles from './auth.module.scss';
import { TResetPassword } from '../../types/auth.type';
import { resetPassword } from '../../service/auth/auth.service';

const ResetPassword: React.FC = (): React.ReactElement => {
  const { t } = useTranslation('translation', { keyPrefix: 'pageAuth' });
  const navigate: NavigateFunction = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>();

  const resetCodePlaceholder: string =
    t('resetCodePlaceholder', 'resetCodePlaceholder') || 'resetCodePlaceholder';
  const resetCodeError: string = t('resetCodeError') || 'resetCodeError';
  const passwordPlaceHolder: string =
    t('passwordPlaceholder') || 'passwordPlaceholder';
  const passwordError: string = t('passwordError') || 'passwordError';

  const confirmPasswordPlaceholder: string =
    t('confirmPasswordPlaceholder') || 'confirmPasswordPlaceholder';

  const confirmPasswordError: string =
    t('confirmPasswordError') || 'confirmPasswordError';

  const passwordMismatchError: string =
    t('passwordMismatchError') || 'passwordMismatchError';

  const handleSubmit = useCallback(async (resetData: TResetPassword) => {
    if (resetData.password !== resetData.confirmPassword) {
      setErrorMessage(passwordMismatchError);
      return;
    }
    const response: AxiosResponse = await resetPassword(resetData);
    const { data } = response;
    if (data.status === 200) {
      navigate('/login');
    }
    if (data.status !== 200) {
      setErrorMessage(data.message);
    }
  }, []);

  const navigateToLogin = useCallback(() => {
    navigate('/login');
  }, []);

  return (
    <div 
    // className={styles[componentClassPrefix]}
    >
      <Form className="login-form" onFinish={handleSubmit}>
        <FormItem
          name="code"
          rules={[{ required: true, message: resetCodeError }]}
        >
          <Input
            // prefix={<Icon name="user-outline" />}
            placeholder={resetCodePlaceholder}
            size="large"
          />
        </FormItem>
        <FormItem
          name="password"
          rules={[{ required: true, message: passwordError }]}
        >
          <Input
            // prefix={<Icon name="lock-outlined" />}
            type="password"
            placeholder={passwordPlaceHolder}
            size="large"
          />
        </FormItem>
        <FormItem
          name="confirmPassword"
          rules={[{ required: true, message: confirmPasswordError }]}
        >
          <Input
            // prefix={<Icon name="lock-outlined" />}
            type="password"
            placeholder={confirmPasswordPlaceholder}
            size="large"
          />
        </FormItem>
        {errorMessage && <Text type="danger">{errorMessage}</Text>}
        <FormItem name="remember" valuePropName="checked">
          <div
          //  className={styles[`${componentClassPrefix}__actions`]}
           >
            <Button
              className="btn-gradiant"
              type="primary"
              htmlType="submit"
              size="large"
            >
              {t('resetPassword')}
            </Button>
          </div>
        </FormItem>
        <div 
        // className={styles[`${componentClassPrefix}__footer`]}
        >
          <a href="javascript:void(0)" onClick={navigateToLogin}>
            <Text>{t('loginBtnText')}</Text>
          </a>
        </div>
      </Form>
    </div>
  );
};

export default ResetPassword;
