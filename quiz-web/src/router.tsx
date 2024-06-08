import React, { Suspense, lazy, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Spin } from './components/atoms';
import LandingPage from './components/landing-page';
import QuizDetail from './components/quiz/details';
import QuizLayout from './components/quiz/layout';
import SingUp from './components/signup';
import i18n from './i18n';
import AuthLayout from './layout/auth-layout.component';
import ForgetPassword from './pages/auth/forget-password';
import Login from './pages/auth/login';
import ResetPassword from './pages/auth/reset-password';
import PageNotFound from './pages/page-not-found/page-not-found';
import { RootState } from './redux/reducers';
import { TGeneralSettings } from './types/settings.type';
import PaymentLayout from './components/payment/layout';
import SelectAvatar from './components/signup/setavatar';
import HomePage from './components/home';
import Terms from './components/signup/term';
import Profile from './components/profile';

const load = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<Spin tip="Loading" size="large" className="content-loading" />}>
      <Component {...props} />
    </Suspense>
  );

const QuizOverview = load(lazy(() => import('./components/quiz-overview')));

const Router: React.FC<{}> = (): React.ReactElement => {
  const { language }: TGeneralSettings = useSelector((state: RootState) => state.settings.generalSettings);

  const intialiseApplicationSettings = useCallback(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language || 'en');
    }
  }, [i18n, language]);

  React.useEffect(() => {
    intialiseApplicationSettings();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<QuizLayout />}>
          {/* <Route element={<AuthRoute />}></Route> */}
          <Route path="/quiz" element={<QuizOverview />} />

          <Route path="/quiz/:id" element={<QuizDetail />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<LandingPage />} />
          <Route path="/create" element={<SingUp />} />
          <Route path="/setavatar" element={<SelectAvatar />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<SelectAvatar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        <Route element={<PaymentLayout />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
