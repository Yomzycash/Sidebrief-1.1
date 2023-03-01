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
import { ButtonHolder, SPaymentButton } from "./styles";
import { toast } from "react-hot-toast";
import { Oval } from "react-loading-icons";
import {
  useGetSingleEntityQuery,
  usePayLaunchMutation,
} from "services/launchService";
import { store } from "redux/Store";
import { setLaunchPaid } from "redux/Slices";
import { useNavigate } from "react-router-dom";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.

export default function StripeForm() {
  const [payLaunch] = usePayLaunchMutation();

  const launchInfo = JSON.parse(localStorage.getItem("launchInfo"));

  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements("card");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          receipt_email: localStorage.getItem("userEmail"),
        },
        redirect: "if_required",
      })
      .then((result) => {
        console.log(result);
        if (result?.error) {
          toast.error(result.error?.message);
          setIsLoading(false);
        } else if (result?.paymentIntent)
          sendRefToBackend(result?.paymentIntent);
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

    setIsLoading(false);
  };

  const sendRefToBackend = async (paymentIntent) => {
    const requiredData = {
      launchCode: launchInfo.launchCode,
      paymentDetails: {
        paymentAmount: paymentIntent.amount,
        paymentCurrency: paymentIntent.currency,
        paymentTransactionId: paymentIntent.id,
        paymentProvider: "Stripe",
        paymentStatus: paymentIntent.status === "succeeded" ? "successful" : "",
      },
    };

    store.dispatch(setLaunchPaid(requiredData));
    localStorage.setItem(
      "paymentDetails",
      JSON.stringify(requiredData.paymentDetails)
    );

    const payResponse = await payLaunch(requiredData);
    setIsLoading(false);
    setSuccess(true);
    toast.success("Payment successful");
    console.log("payResponse", payResponse);
    navigate("/launch/address");
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
            disabled={isLoading || !stripe || !elements || success}
            $success={success}
          >
            {isLoading ? (
              <Oval stroke="#ffffff" fill="white" width={22} height={22} />
            ) : success ? (
              "Successful"
            ) : (
              "Pay Now"
            )}
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
// Make sure to change this to your payment completion page
// return_url: `${window.location.origin}/launch/payment-confirmation`,
