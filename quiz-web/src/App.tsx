import { ConfigProvider } from 'antd';
import { FC } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './App.css';
import './assets/styles/antd-ovverride.css';
import { SocketProvider } from './context/socket.context';
import i18n from './i18n';
import { persistor, store } from './redux/store';
import Router from './router';
import { defaultTheme } from './themes/default-theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

const App: FC = () => {
  const clientId = '1082715081696-mgk2hen3l75jf0oin4lavv7ga0r4pf9a.apps.googleusercontent.com';
  return (
    <div className="app">
      <ToastContainer />
      <GoogleOAuthProvider clientId={clientId}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <I18nextProvider i18n={i18n}>
              <ConfigProvider theme={defaultTheme}>
                <SocketProvider>
                  <Router />
                </SocketProvider>
              </ConfigProvider>
            </I18nextProvider>
          </PersistGate>
        </Provider>
      </GoogleOAuthProvider>
    </div>
  );
};

export default App;
