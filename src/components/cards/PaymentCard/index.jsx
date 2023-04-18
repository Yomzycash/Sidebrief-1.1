import { DateText, DotSeperator } from "containers/BusinessDetail/Header/styles";
import React from "react";
import {
  BottomContainer,
  Container,
  DarkContainer,
  Date,
  LeftTextContainer,
  LightContainer,
  Name,
  RightTextContainer,
  SubDowwn,
  Title,
  TopContainer,
} from "./styles";
import { format } from "date-fns";
const PaymentDetailsCard = ({
  amount,
  currency,
  id,
  provider,
  status,
  code,
  firstname,
  lastname,
  isLoading,
  date,
}) => {
  return (
    <Container>
      <TopContainer>
        <Title>{`${firstname} ${lastname}`}</Title>
        <SubDowwn>
          <Name>{`${firstname} ${lastname}`}</Name>
          <SubDowwn>
            <DotSeperator />
            <DateText>{isLoading ? `--` : date}</DateText>
          </SubDowwn>
        </SubDowwn>
      </TopContainer>

      <BottomContainer>
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
          <RightTextContainer background={status === "successful" ? "#00D448" : "#F9C4BD"}>
            {status}
          </RightTextContainer>
        </DarkContainer>
        <LightContainer>
          <LeftTextContainer>Launch Code</LeftTextContainer>
          <RightTextContainer>{code}</RightTextContainer>
        </LightContainer>
      </BottomContainer>
    </Container>
  );
};

export default PaymentDetailsCard;
