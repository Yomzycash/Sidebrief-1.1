import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { ButtonHolder, SPaymentButton } from "./styles";
import { toast } from "react-hot-toast";
import { Oval } from "react-loading-icons";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.

export default function StripeForm({ sendStripeRefToBackend }) {
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
        // console.log(result);
        if (result?.error) {
          toast.error(result.error?.message);
          setIsLoading(false);
        } else if (result?.paymentIntent) sendRefToBackend(result?.paymentIntent);
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
    await sendStripeRefToBackend(paymentIntent);
    setIsLoading(false);
    setSuccess(true);
    toast.success("Payment successful");
  };

  return (
    <div className="stripe-payment">
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement />
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
