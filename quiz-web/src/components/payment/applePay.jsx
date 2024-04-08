import  { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';


const ApplePayButton = (prop) => {
    const {data} = prop;
    console.log(data);
    const [stripe, setStripe] = useState(null);

    // Load Stripe
    useEffect(() => {
        const fetchStripe = async() => {
          const stripe = await loadStripe('pk_test_rGWIWC9peCMJJY0KXLhPScN3');
          setStripe(stripe);
        }
        fetchStripe();
    }, []);

        const handlePayment = async () => {
            if (!stripe) return;
            const paymentRequest = stripe.paymentRequest({
                country: 'SGP',
                currency: 'SGD',
                total: {
                    label: 'Demo total',
                    amount: 100, // amount to be paid
                },
            });

            paymentRequest.canMakePayment().then(function(result) {
                if (result) {
                    paymentRequest.show();
                } else {
                    alert("Apple Pay is not available");
                }
            });

            paymentRequest.on('token', function(ev) {
                fetch('/payment/buyticketapp', {
                    method: 'POST',
                    body: JSON.stringify({ token: ev.token.id,amount:data }),
                }).then(function(res) {
                if (res.ok) {
                    ev.complete('success'); 
                } else {
                    ev.complete('fail');
                    }
                });
            });
        }

    return (
  
          <button  onClick={handlePayment} className="-ml-20 bg-white border-custom_gray w-[265px] h-[62px] z-2  top-[320px] rounded-[30px] space-x-[6px]  z-5">
            Apple Pay
        </button>
    )
}

export default ApplePayButton;