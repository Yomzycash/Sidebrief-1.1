import React from "react";
import { Container } from "./styles";

export const CheckoutButton = ({ text, action, back, hide, type, style }) => {
  return (
    <Container
      onClick={action}
      isBack={back}
      hide={hide}
      type={type}
      style={style}
    >
      <span>{text}</span>
    </Container>
  );
};
