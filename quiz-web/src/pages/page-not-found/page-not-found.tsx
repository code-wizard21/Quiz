import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Button, Result } from '../../components/atoms';

const PageNotFound: React.FC = (): React.ReactElement => {
  const { t } = useTranslation('translation', { keyPrefix: 'pageNotFound' });
  const navigate: NavigateFunction = useNavigate();
  /**
   * Navigates to the previous page in the history.
   * @returns {void}
   */
  const handleBack = useCallback((): void => {
    navigate(-1);
  }, [navigate]);

  return (
    <Result
      status="404"
      title={t('title')}
      subTitle="404"
      extra={
        <Button type="primary" onClick={handleBack}>
          {t('btnText')}
        </Button>
      }
    />
  );
};

export default PageNotFound;
