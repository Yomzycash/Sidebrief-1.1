import React from "react";
import { Oval } from "react-loading-icons";
import { Container } from "./styles";

export const CheckoutButton = ({
  text,
  action,
  back,
  hide,
  type,
  style,
  disable,
  loading,
  loadingIconColor,
}) => {
  return (
    <Container
      onClick={action && action}
      isBack={back}
      $hide={hide}
      type={type}
      style={style}
      disabled={disable}
    >
      {loading ? (
        <Oval
          stroke={loadingIconColor || "#ffffff"}
          fill="white"
          width={24}
          height={24}
        />
      ) : (
        <span>{text}</span>
      )}
    </Container>
  );
};
