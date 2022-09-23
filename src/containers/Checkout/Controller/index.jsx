import React from "react";
import { Container } from "./styles";
import { CheckoutButton } from "components/button";

export const CheckoutController = ({
  backAction,
  forwardAction,
  backText,
  forwardText,
  hidePrev,
  forwardSubmit,
  containerStyle,
  backBottonStyle,
  forwardButtonStyle,
  backwardSubmit,
}) => {
  return (
    <Container style={containerStyle}>
      <CheckoutButton
        back
        action={backAction}
        text={backText}
        hide={hidePrev}
        type={backwardSubmit || "button"}
        style={backBottonStyle}
      />
      <CheckoutButton
        action={() => {
          forwardAction();
        }}
        text={forwardText}
        type={forwardSubmit ? "submit" : "button"}
        style={forwardButtonStyle}
      />
    </Container>
  );
};
