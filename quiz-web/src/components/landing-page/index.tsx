import { Button, Col, Row, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import google from '../../assets/social/Google.svg';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = async () => {
    await localStorage.clear();
    navigate('/dashboard');
    window.location.reload();
  };
  return (
    <>
      <Row className="landing-page pt-96">
        <Col className="px-6 flex flex-col ">
          <div className="text-4xl ">
            <div className="font-stud-regular font-bold text-white">Sign up for QuizMobb</div>
          </div>
          <p className="text-white text-base font-normal">
            Test your wits with our daily live quiz shows and win cash! Free quizzes of a variety of themes updated
            daily for all you brainiacs out there.
          </p>

          <Button
            type="primary"
            className="quiz-action-btn h-12 mt-6 shadow-none text-black font-bold rounded-3xl w-full"
          >
            <div className="flex items-center justify-center">
              <img src={google} alt="user2" />
              <div className="text-center text-base font-bold text-black mr-2 ">Continue with Google</div>
            </div>
          </Button>
          <Divider style={{ borderColor: 'white', color: 'white' }}>or</Divider>

          <div className="flex">
       
              <Button
                className="quiz-action-btn h-12  shadow-none font-bold rounded-3xl w-full"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                }}
                onClick={()=> navigate('/signup')}
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
                onClick={()=> navigate('/login')}
              >
                <div className="flex items-center justify-center">
                  <div className="ml-2 studregular text-center text-base font-bold text-white mr-2 ">Log in</div>
                </div>
              </Button>
          
          </div>
          <div className="mt-12 flex justify-center">
            <Link to="/dashboard"  onClick={handleButtonClick}>
              <div className="text-white text-xl underline">Continue as Guest </div>
            </Link>
          </div>
        </Col>
      </Row>

      <Row className="mt-2"></Row>
    </>
  );
};

export default LandingPage;
