import React from "react";
import { Container } from "./styles";
import { CheckoutButton } from "components/button";

export const CheckoutController = ({
  backAction,
  forwardAction,
  backText,
  forwardText,
  hidePrev,
}) => {
  return (
    <Container>
      <CheckoutButton
        back
        action={backAction}
        text={backText}
        hide={hidePrev}
      />
      <CheckoutButton action={forwardAction} text={forwardText} />
    </Container>
  );
};
