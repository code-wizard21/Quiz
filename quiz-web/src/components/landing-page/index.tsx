import { Button, Col, Row } from 'antd';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <Row className="landing-page pt-96">
      <Col className="px-6 flex flex-col pb-6">
        <div className="text-5xl ">
          <div className="font-stud-regular font-bold text-white">The game</div>
          <div className="font-stud-regular font-bold text-white">is on.</div>
        </div>
        <p className="text-white text-base font-normal">
          Test your wits with our daily live quiz shows and win cash! Free quizzes of a variety of themes updated daily
          for all you brainiacs out there.
        </p>
        <Link to="/signup">
          <Button
            type="primary"
            className="quiz-action-btn h-12 mt-6 shadow-none text-black font-bold rounded-3xl w-full"
          >
            Sign up
          </Button>
        </Link>
        <div className="mt-auto text-center text-base">
          <span className="text-gray-300">Already have an account? </span>
          <Link to="/login" className="text-white">
            Log in.
          </Link>
        </div>
      </Col>
    </Row>
  );
};

export default LandingPage;
