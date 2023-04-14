import React from "react";
import {
  Container,
  DarkContainer,
  LeftTextContainer,
  LightContainer,
  RightTextContainer,
} from "./styles";

const PaymentDetailsCard = ({ amount, currency, id, provider, status, code }) => {
  return (
    <Container>
      <DarkContainer>
        <LeftTextContainer>Amount Paid</LeftTextContainer>
        <RightTextContainer>{amount}</RightTextContainer>
      </DarkContainer>
      <LightContainer>
        <LeftTextContainer>Currency</LeftTextContainer>
        <RightTextContainer>{currency}</RightTextContainer>
      </LightContainer>
      <DarkContainer>
        <LeftTextContainer>Transaction ID</LeftTextContainer>
        <RightTextContainer>{id}</RightTextContainer>
      </DarkContainer>
      <LightContainer>
        <LeftTextContainer>Payment Gateway</LeftTextContainer>
        <RightTextContainer>{provider}</RightTextContainer>
      </LightContainer>
      <DarkContainer>
        <LeftTextContainer>Payment Gateway </LeftTextContainer>
        <RightTextContainer>{status}</RightTextContainer>
      </DarkContainer>
      <LightContainer>
        <LeftTextContainer>Launch Code</LeftTextContainer>
        <RightTextContainer>{code}</RightTextContainer>
      </LightContainer>
    </Container>
  );
};

export default PaymentDetailsCard;
