import React from "react";
import StripeForm from "./StripeForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./stripe.css";

//

import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import { usePayWithStripeMutation } from "services/launchService";

const PUBLIC_KEY = `${process.env.REACT_APP_STRIPE_PUBLIC_LIVE_KEY}`;
// process.env.NODE_ENV === "production"
//   ? `${process.env.REACT_APP_STRIPE_PUBLIC_LIVE_KEY}`
//   : `${process.env.REACT_APP_STRIPE_PUBLIC_TEST_KEY}`;

const stripePromise = loadStripe(PUBLIC_KEY);

// const stripePromise = loadStripe(
//   "pk_test_51HeX6TIfUU2kDtjPErnZWbbWJ0o68xZNSFm5448kvxfyCR7Hz0wfoU9eO035HGbA7KrYSYEXIxQJ0DLsrPUEaIHJ00KBYIckOc"
// );

const StripePayment = ({ amount }) => {
  console.log(amount * 100);

  const [clientSecret, setClientSecret] = useState("");
  const [payWithStripe, payWithStripeState] = usePayWithStripeMutation();

  useEffect(() => {
    (async () => {
      const paymentResponse = await payWithStripe({ amount: amount });
      if (paymentResponse?.data?.clientSecret)
        setClientSecret(paymentResponse?.data?.clientSecret);
    })();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    // appearance,
  };

  //
  console.log(amount);
  console.log(clientSecret);
  //

  const stripe = useStripe(clientSecret);
  const elements = useElements("card");

  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  return (
    <>
      {clientSecret && stripePromise && (
        <Elements options={options} stripe={stripePromise}>
          <StripeForm />
        </Elements>
      )}
    </>
  );
};

export default StripePayment;
