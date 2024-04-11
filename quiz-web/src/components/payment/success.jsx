
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
  const [ticket, setTicket] = useState(0);
  const stripe = useStripe();
  const elements = useElements();
  const [value, setValue] = useState(1);
  const [mobile, setMobile] = useState('');
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    getOperatingSystem();
  }, []);
  useEffect(() => {
    let at,
      tk = 0;
    switch (mode) {
      case '1':
        at = 300;
        tk = 1;
        break;
      case '2':
        at = 500;
        tk = 2;
        break;
      case '3':
        at = 1000;
        tk = 10;
        break;
      case '4':
        at = 2000;
        tk = 20;
        break;
      default:
        at = 0;
    }
    setAmount(at);
    setTicket(tk);
  }, []);
  const paymentRequest = {
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
            'stripe:version': '2020-03-02',
            'stripe:publishableKey': 'pk_test_rGWIWC9peCMJJY0KXLhPScN3',
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: 'Test',
      merchantName: 'Demo Merchant',
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: '100',
      currencyCode: 'USD',
      countryCode: 'US',
    },
    callbackIntents: ['PAYMENT_AUTHORIZATION'],
  };
  const [buttonWidth] = useState(240);
  const [buttonHeight] = useState(40);
  const getOperatingSystem = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      setMobile('iOS');
    }
    if (/android/i.test(userAgent)) {
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
      const value = {
        payment_method_id: id,
        amount: amount,
        user: JSON.parse(localStorage.getItem('user')).user.name,
        email: JSON.parse(localStorage.getItem('user')).user.email,
        item: ticket,
      };
      console.log('amount', amount);
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
          <div className="mt-8 flex justify-center z-20">
            <img src={user1} alt="user2" className=" border-4  rounded-full" width={90} height={90} />
          </div>
        </div>
        <div className="modal-box bg-white mt-12 ml-4 mr-4 border-4 rounded-lg pt-4">
          <div className="flex justify-center mt-8 text-2xl font-bold text-center ">Transaction Success!!</div>
          <div className="py-4 flex justify-center">Welcome Contestant! Get to the top</div>
          <div className="py-1 flex justify-center"> positions to access the prize pool!</div>
          <div className="modal-action pb-12">
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
     
      </div>
     
       

      {/* <dialog id="my_modal_2" className="modal rounded-xl  border-white">
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
      </dialog> */}
    </>
  );
};
export default BuyTicket;
