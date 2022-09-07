import React from "react";
import { Container } from "./styles";

export const CheckoutButton = ({ text, action, back, hide }) => {
  return (
    <Container onClick={action} isBack={back} hide={hide}>
      <span>{text}</span>
    </Container>
  );
};
