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
import Button from "components/button";
import { useViewPayLaunchMutation } from "services/launchService";
import { checkPaymentStatus } from "pages/Launch/actions";
import { store } from "redux/Store";
import { setLaunchPaid, setLaunchResponse } from "redux/Slices";
import { useNavigate } from "react-router-dom";
import { ButtonHolder, SPaymentButton } from "./styles";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.

export default function StripeForm() {
  const stripe = useStripe();
  const elements = useElements("card");
  console.log("checking my location", window.location.origin);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        return_url: "http://localhost:3000/launch/payment-confirmation",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an interm ediate site first to authorize the payment, then
    // redirected to the `return_url`.
    // if (error.type === "card_error" || error.type === "validation_error") {
    //   setMessage(error.message);
    // } else {
    //   setMessage("An unexpected error occurred.");
    // }

    if (error) {
      setMessage(error.message);
    }

    // console.log("confirmStripe", confirmStripe);
    setIsLoading(false);
  };

  return (
    <div className="stripe-payment">
      <form id="payment-form" onSubmit={handleSubmit}>
        {/* <LinkAuthenticationElement
              id="link-authentication-element"
              onChange={(e) => setEmail(e.target.value)}
            /> */}
        <PaymentElement
        // id="payment-element"
        // options={paymentElementOptions}
        />
        <ButtonHolder>
          <SPaymentButton
            bg_color="#00A2D4"
            color="white"
            title="Pay Now"
            type="submit"
            disabled={isLoading || !stripe || !elements}
          >
            Pay Now
          </SPaymentButton>
        </ButtonHolder>

        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
}

//

//

//

//

//
