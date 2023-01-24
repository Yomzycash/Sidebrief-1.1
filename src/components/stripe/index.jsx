import React from "react";
import styled from "styled-components";

import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Button from "components/button";

const PaymentStripeForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = (stripe, elements) => async () => {
    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      // ... SEND to your API server to process payment intent
    }
  };

  return (
    <ButtonContainer onSubmit={handleSubmit(stripe, elements)}>
      {/* <PaymentElement /> */}
      <Button title="Pay with Stripe" />
    </ButtonContainer>
  );
};

export default PaymentStripeForm;

const ButtonContainer = styled.form`
  width: 80%;
`;
