
import user1 from '../../assets/user/user2.svg';
import background from '../../assets/figma/Graphic.svg';
import vector from '../../assets/figma/Vector.svg';
import React, { useState, useEffect } from 'react';
import { buyticket } from '../../service/payment/payment.service';
import { useLocation } from 'react-router-dom';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import GooglePayButton from '@google-pay/button-react';
import ApplePayButton from './applePay';
const CardInputWrapper = styled.div`
  border: 2px solid #efefef;
  border-radius: 8px;
  padding: 20px 4px;
  background-color: #efefef;
  min-width: 120px;
`;
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: 'black',
      fontFamily: '"Roboto", sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: 'black',
      },
      padding: '20px',
    },
    invalid: {
      color: 'black',
      iconColor: '#fa755a',
    },
  },
};
const BuyTicket = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get('mode');
 
  const stripe = useStripe();
  const elements = useElements();
  const [value, setValue] = useState(1);
  const [mobile, setMobile] = useState('');
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    getOperatingSystem();
  }, []);

  useEffect(()=>{
    if(amount===0)
    {
      console.log(amount);
      return;
    }
  },[amount]);
  const getOperatingSystem = () => {
    const  userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      setMobile('iOS');
      console.log('##########iOS')
    }
    if (/android/i.test(userAgent)) {
      console.log('##########Adroid')
      setMobile('Android');
    }

    return 'unknown';
  };
  const handleSubmit = async () => {
    const cardNumberElement = elements.getElement(CardNumberElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardNumberElement,
    });
    if (!error && paymentMethod) {
      const { id } = paymentMethod;
      let amount,
      ticket = 0;
      switch (mode) {
        case '1':
          amount = 300;
          ticket = 1;
          break;
        case '2':
          amount = 500;
          ticket = 2;
          break;
        case '3':
          amount = 1000;
          ticket = 10;
          break;
        case '4':
          amount = 2000;
          ticket = 20;
          break;
        default:
          amount = 0;
      }
      
      const value = {
        payment_method_id: id,
        amount: amount,
        user: JSON.parse(localStorage.getItem('user')).user.name,
        email: JSON.parse(localStorage.getItem('user')).user.email,
        item: ticket,
      };
      console.log(amount);
      setAmount(amount);
      buyticket(value)
        .then((res) => {
          if (res.status == 200) {
            toast.success('successful', {
              autoClose: false,
            });
            document.getElementById('my_modal_1').showModal();
          } else {
            document.getElementById('my_modal_2').showModal();
          }
        })
        .catch((err) => {
          // handle error
          console.error(err.message);
        });
    } else {
      console.log('error', error.message);
      toast.error(error.message, {
        autoClose: false,
      });
    }
  };
  return (
    <>
      <div
        style={{ backgroundImage: `url(${background})` }}
        className="rounded-2xl bg-cover bg-center bg-no-repeat h-screen"
      >
        <div className="flex flex-col mb-4">
          <div className="mt-14 flex justify-center z-20">
            <img src={user1} alt="user2" className=" border-4  rounded-full" width={109} height={109} />
          </div>
        </div>
        <div className="pt-2">
          <div className="flex  flex-col p-4 bg-gradient-to-bl bg-white m-6 rounded-2xl">
            <div className="flex flex-row justify-center mt-6">
              <div className="ml-2 text-3xl font-bold text-center studregular">Select Payment </div>
            </div>
            
            <div className="flex justify-center mt-6">
              <button
                onClick={() => {
                  setValue(1);
                }}
                className={`bg-customBlue w-[265px] h-[62px] top-[320px] rounded-[30px] space-x-[6px]   ${
                  value === 1 ? 'z-10' : 'z-1'
                }`}
              >
                <div className="mr-10 text-white  text-base">Credit Card</div>
              </button>
{/*          
                {mobile === 'Android' ? (
                  <GooglePayButton
                    environment="TEST"
                    paymentRequest={{
                      apiVersion: 2,
                      apiVersionMinor: 0,
                      allowedPaymentMethods: [
                        {
                          type: 'CARD',
                          parameters: {
                            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                            allowedCardNetworks: ['MASTERCARD', 'VISA'],
                          },
                          tokenizationSpecification: {
                            type: 'PAYMENT_GATEWAY',
                            parameters: {
                              gateway: 'stripe',
                              'stripe:version': '2018-10-31',
                              'stripe:publishableKey':
                                'sk_test_51DOfAJIFbzohYGemOLOrA6C52yD7aHdglSfl0kMB95gRJoxcDGSqpWHxa4sGtJDb5mzPX2azyvGDF3GekVRLirFu00NPR9PV6c',
                            },
                          },
                        },
                      ],
                      // merchantInfo: {
                      //   merchantName: 'Example Merchant',
                      //   merchantId: '0123456789',
                      // },
                      transactionInfo: {
                        totalPriceStatus: 'FINAL',
                        totalPrice: amount,
                        currencyCode: 'SGD',
                      },
                    }}
                    onLoadPaymentData={(paymentRequest) => {
                      console.log('Success', paymentRequest);
                    }}
                    buttonRadius={40}
                    existingPaymentMethodRequired={true}
                    buttonColor="white"
                    buttonType="short"
                    buttonSizeMode="fill"
                    style={{ width: '100%', height: '57px', marginLeft: '10px' }}
                  />
                ) : (
                  <ApplePayButton
                    data = {amount}
                  />
                )} */}
            <ApplePayButton
                    data = {amount}
                  />
            </div>
            <form className="mt-4 mb-8">
              <div className="m-4 pl-2 pt-4">
                <label>Card Number</label>
                <CardInputWrapper>
                  <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
                </CardInputWrapper>
              </div>
              <div className="flex flex-column">
                <div className="m-4 pl-2 pt-4">
                  <label>Expiry Date</label>
                  <CardInputWrapper>
                    <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
                  </CardInputWrapper>
                </div>
                <div className="m-4 pl-2 pt-4">
                  <label className="">CVV</label>
                  <CardInputWrapper>
                    <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
                  </CardInputWrapper>
                </div>
              </div>
            </form>
            <div className="mt-4 ml-2 text-base font-bold text-center studregular">
              We will send you an order detail to your email after the successful payment.
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-14 mb-14">
          <button
            onClick={async (e) => {
              e.preventDefault();
              await handleSubmit(e);
            }}
            className="bg-customYellowBorder w-[315px] h-[52px] top-[320px] rounded-[30px] space-x-[6px]"
            // onLoad={loading}
          >
            <div className="flex items-center justify-center">
              <img src={vector} alt="user2" />
              <div className="ml-2 studregular text-center text-xl font-bold text-black mr-2 ">Continue to Payment</div>
            </div>
          </button>
        </div>
        <a href="/selectmode" className="flex items-center justify-center">
          <div className="studregular text-center text-xl font-bold text-white mr-2 underline">Cancel</div>
        </a>
      </div>
      <dialog id="my_modal_1" className="modal rounded-xl  border-white">
        <div className="modal-box">
          <div className="flex justify-center text-2xl font-bold text-center studregular">Transaction Success!!</div>
          <div className="py-4 flex justify-center">Welcome Contestant! Get to the top</div>
          <div className="py-1 flex justify-center"> positions to access the prize pool!</div>
          <div className="modal-action">
            <form method="dialog " className="justify-center flex">
              <button
                className="bg-customYellowBorder mt-8 w-[285px] h-[52px] top-[320px] rounded-[30px] space-x-[6px] border-white"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/dashboard');
                }}
              >
                <div className="flex justify-center text-xl font-bold text-center studregular">Okay, Game on!</div>
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id="my_modal_2" className="modal rounded-xl  border-white">
        <div className="modal-box">
          <div className="flex justify-center text-2xl font-bold text-center studregular">Transaction Decline</div>
          <div className="py-4 flex justify-center text-center">Oh Snap! The credit card </div>
          <div className="py-1 flex justify-center text-center"> information was decline</div>
          <div className="modal-action">
            <form method="dialog " className="justify-center flex">
              <button className="bg-customYellowBorder mt-8 w-[285px] h-[52px] top-[320px] rounded-[30px] space-x-[6px] border-white">
                <div className="flex justify-center text-xl font-bold text-center studregular">Try Again</div>
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
export default BuyTicket;
