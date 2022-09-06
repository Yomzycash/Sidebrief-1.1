import HeaderCheckout from "components/Header/HeaderCheckout";
import { CheckoutController } from "containers";
import { CheckoutFormInfo } from "containers/Checkout";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Body, Bottom, Container, Header } from "../styled";

const ShareHoldersInfo = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/checkout/entity");
  };

  return (
    <Container>
      <Header>
        <HeaderCheckout />
      </Header>
      <Body>
        <CheckoutFormInfo />
      </Body>
      <Bottom>
        <CheckoutController
          backAction={() => console.log("Back button")}
          backText={"Previous"}
          forwardAction={handleNext}
          forwardText={"Proceed"}
        />
      </Bottom>
    </Container>
  );
};

export default ShareHoldersInfo;
