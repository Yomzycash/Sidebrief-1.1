import React, { useState, useEffect } from "react";
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
import { usePayWithStripeMutation } from "services/launchService";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe(
  "pk_test_51HeX6TIfUU2kDtjPErnZWbbWJ0o68xZNSFm5448kvxfyCR7Hz0wfoU9eO035HGbA7KrYSYEXIxQJ0DLsrPUEaIHJ00KBYIckOc"
);

export default function StripeForm({ amount }) {
  const [clientSecret, setClientSecret] = useState("");
  const [payWithStripe, payWithStripeState] = usePayWithStripeMutation();

  useEffect(() => {
    (async () => {
      const paymentResponse = await payWithStripe({ amount: amount });
      console.log(paymentResponse);
      if (paymentResponse?.data?.clientSecret)
        setClientSecret(paymentResponse?.data?.clientSecret);
    })();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  //
  console.log(amount);
  console.log(clientSecret);
  //

  const stripe = useStripe(clientSecret);
  const elements = useElements("card");

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(elements);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <div className="stripe-payment">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <form id="payment-form" onSubmit={handleSubmit}>
            <LinkAuthenticationElement
              id="link-authentication-element"
              onChange={(e) => setEmail(e.target.value)}
            />
            <PaymentElement
              id="payment-element"
              options={paymentElementOptions}
            />
            <button
              // disabled={isLoading || !stripe || !elements}
              id="submit"
              type="submit"
            >
              <span id="button-text">
                {/* {isLoading ? ( */}
                {/* <div className="spinner" id="spinner"></div> */}
                {/* ) : ( */}
                "Pay now"
                {/* )} */}
              </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
          </form>
        </Elements>
      )}
    </div>
  );
}

//

//

//

//

//
