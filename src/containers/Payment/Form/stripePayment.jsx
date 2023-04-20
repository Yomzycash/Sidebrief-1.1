import React from "react";
import StripeForm from "./StripeForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./stripe.css";

//

import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import { usePayWithStripeMutation, useTestPayWithStripeMutation } from "services/launchService";

const PUBLIC_KEY =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_STRIPE_PUBLIC_LIVE_KEY
    : process.env.REACT_APP_STRIPE_PUBLIC_TEST_KEY;
// process.env.NODE_ENV === "production"
//   ? `${process.env.REACT_APP_STRIPE_PUBLIC_LIVE_KEY}`
//   : `${process.env.REACT_APP_STRIPE_PUBLIC_TEST_KEY}`;
const stripePromise = loadStripe(PUBLIC_KEY);

// const stripePromise = loadStripe(
//   "pk_test_51HeX6TIfUU2kDtjPErnZWbbWJ0o68xZNSFm5448kvxfyCR7Hz0wfoU9eO035HGbA7KrYSYEXIxQJ0DLsrPUEaIHJ00KBYIckOc"
// );

const StripePayment = ({ sendStripeRefToBackend, amount }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [payWithStripe, payWithStripeState] = usePayWithStripeMutation();
  const [testPayWithStripe, testPayWithStripeState] = useTestPayWithStripeMutation();

  const productionEnv = process.env.NODE_ENV === "production";

  useEffect(() => {
    if (amount) {
      (async () => {
        const paymentResponse = productionEnv
          ? await payWithStripe({ amount: amount * 100 })
          : await testPayWithStripe({ amount: amount * 100 });
        if (paymentResponse?.data?.clientSecret)
          setClientSecret(paymentResponse?.data?.clientSecret);
      })();
    }
  }, [amount]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    // appearance,
  };

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
          <StripeForm sendStripeRefToBackend={sendStripeRefToBackend} />
        </Elements>
      )}
    </>
  );
};

export default StripePayment;
