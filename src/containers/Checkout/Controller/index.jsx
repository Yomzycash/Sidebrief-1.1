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
  forwardDisable,
  backDisable,
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
        disable={backDisable}
      />
      <CheckoutButton
        action={() => {
          forwardAction();
        }}
        text={forwardText}
        type={forwardSubmit ? "submit" : "button"}
        style={forwardButtonStyle}
        disable={forwardDisable}
      />
    </Container>
  );
};
