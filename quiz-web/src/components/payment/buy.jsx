
import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements, PaymentRequestButtonElement } from "@stripe/react-stripe-js";
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState(null);
  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Demo total',
          amount: 1000, // in cents
        },
      });
      // Check the availability of the Payment Request API.
      pr.canMakePayment().then(result => {
        if (result) {
          setPaymentRequest(pr);
        }
      });
    }
  }, [stripe]);
  if (paymentRequest) {
    return <PaymentRequestButtonElement options={{ paymentRequest }} />
  }
  // Fallback to standard checkout form if Payment Request API is not available.
  return <CardElement />;
}
export default function Payment() {
  return (
    
      <CheckoutForm />
    
  );
}
