/* eslint-disable import/prefer-default-export */
import { ThemeConfig } from 'antd';

export const defaultTheme: ThemeConfig = {
  token: {
    colorPrimary: '#F9DC30',
    colorLinkHover: '#D18700',
    colorLink: '#F2B41C',
    colorError: '#F2B41C',
    colorTextPlaceholder: 'white'
  },
  components: {
    Button: {
      colorPrimary: '#F9DC30',
      colorPrimaryHover: '#EECD07',
      colorBorderBg: '#F9DC30',
      colorBorder: '#F9DC30',
    },
    Input: {
      colorBgContainer: '#592EB0',
      colorText: 'white',
      colorErrorText: 'white',
    },
  },
};
