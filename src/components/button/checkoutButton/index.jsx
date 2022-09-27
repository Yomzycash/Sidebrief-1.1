import React from "react";
import { Container } from "./styles";

export const CheckoutButton = ({
  text,
  action,
  back,
  hide,
  type,
  style,
  disable,
}) => {
  return (
    <Container
      onClick={action}
      isBack={back}
      hide={hide}
      type={type}
      style={style}
      disabled={disable}
    >
      <span>{text}</span>
    </Container>
  );
};
