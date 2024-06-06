import { Button, Col, Row, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import google from '../../assets/social/Google.svg';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import close from '../../assets/close.svg';
const LandingPage: React.FC = () => {
  const clientId = '1082715081696-mgk2hen3l75jf0oin4lavv7ga0r4pf9a.apps.googleusercontent.com';
  const navigate = useNavigate();
  const handleButtonClick = async () => {
    await localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  const onSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log('Success:', response);
    navigate('/');
  };

  const onFailure = (response: any) => {
    console.error('Login Failed:', response);

    if (response.error === 'popup_closed_by_user') {
      console.log('User manually closed the popup without signing in');
    }
  };
  return (
    <>
      <Row className="landing-page ">
        <div className="flex px-4 py-4">
          <div onClick={() => history.back()} className="flex">
            <img src={close} alt="live" width={30} height={30} />
          </div>
        </div>
        <Col className="px-6 flex flex-col pt-60 justify-center">
          <div className="flex justify-center">
            <div className="text-3xl font-stud-regular font-bold text-white">Sign up for QuizMobb</div>
          </div>
          <p className="text-white text-sm font-normal">
            Test your wits with our daily live quiz shows and win cash! Free quizzes of a variety of themes updated
            daily for all you brainiacs out there.
          </p>
          <GoogleLogin
            clientId={clientId}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            render={(renderProps) => (
              <Button
                type="primary"
                onClick={() => renderProps.onClick()}
                className="quiz-action-btn h-12  shadow-none text-black font-bold rounded-3xl w-full"
              >
                <div className="flex items-center justify-center">
                  <img src={google} alt="user2" />
                  <div className="text-center text-base font-bold text-black mr-2 ">Continue with Google</div>
                </div>
              </Button>
            )}
          />
          {/* <Button type="primary" className="quiz-action-btn h-12  shadow-none text-black font-bold rounded-3xl w-full">
            <div className="flex items-center justify-center">
              <img src={google} alt="user2" />
              <div className="text-center text-base font-bold text-black mr-2 ">Continue with Google</div>
            </div>
          </Button> */}
          <Divider style={{ borderColor: 'white', color: 'white' }}>or</Divider>

          <div className="flex">
            <Button
              className="quiz-action-btn h-12  shadow-none font-bold rounded-3xl w-full"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF',
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }}
              onClick={() => navigate('/signup')}
            >
              <div className="flex items-center justify-center">
                <div className="ml-2 studregular text-center text-base font-bold text-white mr-2 ">Sign up</div>
              </div>
            </Button>

            <Button
              className="quiz-action-btn h-12 shadow-none font-bold ml-4 rounded-3xl w-full"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF',
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }}
              onClick={() => navigate('/login')}
            >
              <div className="flex items-center justify-center">
                <div className="ml-2 studregular text-center text-base font-bold text-white mr-2 ">Log in</div>
              </div>
            </Button>
          </div>
          <div className="mt-4 flex justify-center">
            <Link to="/" onClick={handleButtonClick}>
              <div className="text-white text-xl underline">Continue as Guest </div>
            </Link>
          </div>
          <div className="mt-8 text-center">
            <div className="text-[#D0B3FF] text-xs font-normal">By continuing with an account located in Singapore</div>
            <div className="text-[#D0B3FF] text-xs font-normal">
              you agree to our Terms of Service and Privacy Policy.
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default LandingPage;
