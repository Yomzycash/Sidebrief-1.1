import React from "react";
import { Container } from "./styled";
import { CommonButton } from "components/button";
import LoadingErrorImg from "asset/svg/LoadingError.svg";

const LoadingError = ({ errorText, buttonText, action }) => {
  return (
    <Container>
      <p>{errorText || "Oops! Looks like an error occurred while loading this page!!!"}</p>
      <img src={LoadingErrorImg} alt="" />
      {buttonText && <CommonButton text={buttonText} action={action} />}
    </Container>
  );
};

export default LoadingError;
