import React from "react";
import { ReactComponent as Error } from "asset/svg/LoadingError.svg";
import { Container } from "./styled";
import { CommonButton } from "components/button";

const LoadingError = ({ errorText, buttonText, action }) => {
  return (
    <Container>
      <p>{errorText || "Oops! Looks like an error occurred while loading this page!!!"}</p>
      <Error />
      {buttonText && <CommonButton text={buttonText} action={action} />}
    </Container>
  );
};

export default LoadingError;
