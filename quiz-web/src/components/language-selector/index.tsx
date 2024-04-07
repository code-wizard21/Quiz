import React, { useCallback } from 'react';
import i18n from '../../i18n';
import { Select } from '../../components/atoms';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { setGeneralSettings } from '../../redux/actions/settings.action';
import { TGeneralSettings } from '../../types/settings.type';

/**
 * A component that renders languages to select and change application's language upon selection.
 * @returns {React.ReactElement}
 */

const LanguageSelector: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const generalSettings: TGeneralSettings = useSelector(
    (state: RootState) => state.settings.generalSettings
  );
  const { language } = generalSettings;
  /**
   * Handles a change in the language selection.
   * @param {string} value - The language code to change to.
   * @returns {void}
   * */
  const handleChange = useCallback((value: string) => {
    i18n.changeLanguage(value);
    dispatch(
      setGeneralSettings({
        ...generalSettings,
        language: value,
      })
    );
  }, []);

  const languages = [
    { key: 1, value: 'en', label: 'English' },
    { key: 2, value: 'fr', label: 'French' },
  ];

  // const componentClassPrefix = 'language-selector';

  return (
    // <div className={styles[componentClassPrefix]}>
    <div className="float-right">
      {/* <GlobalOutlined /> */}
      <Select
        className="language-action"
        defaultValue="EN"
        value={language || 'en'}
        onChange={handleChange}
        options={languages}
        popupMatchSelectWidth={false}
      />
    </div>
  );
};

export default LanguageSelector;
