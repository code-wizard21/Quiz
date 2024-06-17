import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
const PrizeItem = ({ title, percentage, cap }) => (
  <div className="space-y-2">
    <div className="text-yellow-400 text-[20px] max-[500px]:text-[14px] font-bold">{title}</div>
    <div className="max-lg:mr-[50px] max-[500px]:mr-0 mr-[90px]">
      <div className="text-white text-[36px] max-[500px]:text-[24px] font-bold">{percentage} of prize pool</div>
      <div className="text-white text-[24px] max-[500px]:text-[20px] font-medium">+ sponsored prizes (if any)</div>
      <div className="text-[14px] text-white">{cap}</div>
    </div>
  </div>
);

function App() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/signup');
  };
  const handleClickCheck = () => {
    navigate('/quiz');
  };
  return (
    <div
      style={{ backgroundImage: "url('/home/background.jpg')" }}
      className="w-full bg-cover bg-center bg-no-repeat bg-[#030737]"
    >
      <div className="py-4 ">
        <div className="flex p-8   justify-between">
          <div className="flex gap-2 items-center">
            <img src="/home/first.svg" />
            <div className="text-white text-2xl">QuizMobb</div>
          </div>
          <div className="flex">
            <Button
              type="primary"
              onClick={handleClick}
              className=" bg-customYellowBorder h-12 border-customYellowBorder rounded-3xl"
            >
              <div className="text-black font-bold">Sign up / Log in</div>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="p-4 sm:p-24 flex justify-around">
          <div className="flex flex-col">
            <div className="flex flex-col">
              <div className="text-white text-4xl sm:text-7xl font-bold">The game is</div>
              <div className="text-white text-4xl sm:text-7xl font-bold">on.</div>
              <div className="mt-4 text-white text-base">Test your wits with our daily live quiz shows</div>
              <div className="text-white text-base">and win cash! Free quizzes of a variety of</div>
              <div className="text-white text-base">themes updated daily for all you brainiacs</div>
              <div className="mb-4 text-white text-base">out there.</div>
            </div>
            <div className="flex">
              <Button type="primary" onClick={handleClickCheck} className=" bg-customYellowBorder p-4 h-12 rounded-3xl">
                <div className="text-black px-4  font-bold">Check out the Quiz </div>
              </Button>
            </div>
          </div>
        </div>
        <div
          className="flex pt-4 scale-70 md:scale-100 sm:px-80 sm:pt-0  bg-cover bg-center bg-no-repeat "
          style={{ backgroundImage: "url('/home/backcom.svg')" }}
        >
          <img className="mx-auto sm:mx-0" src="/home/card.svg" alt="" />
        </div>
      </div>
      <div className="space-y-3 mt-32">
        <div className="text-5xl my-8 font-bold text-white text-center">How it works</div>
        <div className="mx-auto flex flex-col sm:flex-row justify-around space-y-10 sm:space-y-0">
          <div className="flex flex-col items-center ">
            <img src="/home/ticket.svg" className="max-w-[160px] w-full max-h-[185px] h-full" alt="credits" />
            <div className="mt-12 text-4xl  text-white">Buy Credits</div>
            <div className="mt-4 text-base max-w-[227px] text-white text-center font-sans">
              Our tickets are always affordable and contributes to the prize pool!
            </div>
          </div>
          <div className="flex flex-col items-center ">
            <img src="/home/quiz.svg" className=" w-full max-h-[185px] h-full" alt="credits" />
            <div className="mt-12 text-4xl  text-white">Play the Quiz</div>
            <div className="mt-4 text-base max-w-[227px] text-white text-center font-sans">
              Livestream Quizzes happen every weekday! Watch the poll to know the upcoming topic.
            </div>
          </div>
          <div className="flex flex-col items-center ">
            <img src="/home/win.svg" className="max-w-[160px] w-full  h-full" alt="credits" />
            <div className="mt-12 text-4xl  text-white">Win Prizes</div>
            <div className="mt-4 text-base max-w-[227px] text-white text-center font-sans">
              All Winners are declared the moment the quiz is done. No waiting with uncertainty!
            </div>
          </div>
        </div>
      </div>
      {/* <div className="mx-auto py-8">
        <div className="text-[48px] my-8 pl-32 fon-sans font-bold text-white">Categories</div>
        <div className="flex gap-4 justify-end">
          <div className="space-y-8">
            <div className="flex gap-8">
              <img src="/home/category1.png" className="w-[340px] h-[168px]" alt="category1" />
              <img src="/home/category2.png" className="w-[340px] h-[168px]" alt="category2" />
            </div>
            <div className="flex gap-8">
              <img src="/home/category3.png" className="w-[340px] h-[168px]" alt="category1" />
              <img src="/home/category4.png" className="w-[340px] h-[168px]" alt="category2" />
            </div>
          </div>
          <div className="space-y-8">
            <div className="flex gap-8">
              <img src="/home/category5.png" className="w-[340px] h-[168px]" alt="category1" />
              <img src="/home/category6.png" className="w-[240px] h-[168px]" alt="category2" />
            </div>
            <div className="flex gap-8">
              <img src="/home/category7.png" className="w-[340px] h-[168px]" alt="category1" />
              <img src="/home/category8.png" className="w-[240px] h-[168px]" alt="category2" />
            </div>
          </div>
        </div>
      </div> */}
         <div className="max-w-[1086px] mx-auto pt-[126px] container">
        <div className="flex gap-[20px] max-[840px]:flex-col-reverse">
          <div className="bg-[#1A3EEC] p-[19px] min-[990px]:p-[50px] max-[500px]:ml-[9px] max-[500px]:mr-[17px] max-[500px]:w-auto content-center max-[840px]:mx-auto">
            <div className="flex gap-[5px] justify-center">
              <img
                src="/home/trophy.svg"
                className="w-9 h-9 max-[500px]:w-6 max-[500px]:h-6"
                alt="image"
              />
              <div className="space-y-6">
                <PrizeItem
                  title="WINNER"
                  percentage="50%"
                  cap="Capped at 5000 per quiz per month"
                />
                <PrizeItem
                  title="2ND PRIZE"
                  percentage="25%"
                  cap="Capped at 2000 per quiz per month"
                />
                <PrizeItem
                  title="3RD PRIZE"
                  percentage="10%"
                  cap="Capped at 1000 per quiz per month"
                />
              </div>
            </div>
          </div>
          <div className="max-w-[439px] max-[500px]:max-w-[258px] max-[500px]:ml-[9px] my-auto max-[840px]:mr-auto">
            <div className="text-white text-[48px] max-[500px]:text-[32px] font-bold">
              Prize Distribution
            </div>
            <div className="text-white text-[24px] max-[500px]:text-[20px] font-bold">
              Unclaimed prize money goes to Social Causes
            </div>
          </div>
        </div>
        <div className="min-[840px]:max-w-[604px] min-[840px]:w-full w-fit max-[840px]:mr-[1px] max-[840px]:ml-[32px] ml-auto py-[60px] mt-[-10vh] max-[840px]:mx-auto max-[840px]:mt-[-3vh] bg-[#4500B2] space-y-[7px]">
          <div className="ml-auto max-w-[406px] justify-center w-auto h-auto p-[20px]">
            <div className="text-[20px] max-[500px]:text-[14px] text-[#FFD500] font-bold">
              CONSOLATIONS
            </div>
            <div className="w-auto">
              <div className="text-[24px] max-[500px]:text-[20px] text-white">
                if you have answered all questions correctly and placed outside
                of the top placed winners.
              </div>
              <div className="text-[36px] max-[500px]:text-[24px] w-auto text-white font-bold">
                15% of prize pool
              </div>
              <div className="text-[14px] text-white">
                Capped at 20 per quiz per month
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{ backgroundImage: "url('/home/back.svg')" }}
        className="my-24 mx-4 sm:mx-24 bg-gradient-to-r bg-cover bg-center rounded-4xl "
      >
        <div className="px-4 sm:px-24 py-4 mx-auto flex flex-col sm:flex-row items-center">
          <div className="my-12 sm:mx-16 text-center sm:text-left">
            <div className=" text-4xl text-white font-bold">Ready to play?</div>
            <div className="text-2xl my-4 font-bold text-white">Start here with us!</div>
            <div className="flex">
              <Button
                type="primary"
                onClick={handleClickCheck}
                className="bg-[#F9DC30] border-customYellowBorder px-4 py-3 h-12 rounded-3xl text-base text-black font-bold  sm:mt-0 "
              >
                <div className="text-black text-bold text-left">Check out the Quiz</div>
              </Button>
            </div>
          </div>
          <img src="/home/image.png" className="mx-auto sm:ml-auto w-1/2 sm:w-auto h-auto my-4 sm:my-0" alt="icon" />
        </div>
      </div>
      <div className="text-base text-center  mx-auto pb-4">
        <span className="text-white">©2024 MobQuiz Pte Ltd. All rights reserved.</span>
        <span className="text-[#ABFF75] mx-2">Terms of Use</span>
        <span className="text-white">and</span>
        <span className="text-[#ABFF75] mx-2">Privacy Policy</span>
      </div>
    </div>
  );
}

export default App;