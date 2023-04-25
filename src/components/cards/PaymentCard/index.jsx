import { DateText, DotSeperator } from "containers/BusinessDetail/Header/styles";
import React from "react";
import {
  BottomContainer,
  Container,
  FieldContainer,
  Date,
  LeftTextContainer,
  Name,
  RightTextContainer,
  SubDowwn,
  Title,
  TopContainer,
} from "./styles";

const PaymentDetailsCard = ({
  amount,
  currency,
  id,
  email,
  provider,
  status,
  code,
  isLoading,
  date,
}) => {
  return (
    <Container>
      <TopContainer>
        {/* <Title>{`${firstname} ${lastname}`}</Title> */}
        <SubDowwn>
          {/* <Name>{`${firstname} ${lastname}`}</Name> */}
          <SubDowwn>
            <DotSeperator />
            <DateText>{isLoading ? `--` : `Date: ${date}`}</DateText>
          </SubDowwn>
        </SubDowwn>
      </TopContainer>

      <BottomContainer>
        <FieldContainer>
          <LeftTextContainer>Amount Paid</LeftTextContainer>
          <RightTextContainer>{amount}</RightTextContainer>
        </FieldContainer>
        <FieldContainer>
          <LeftTextContainer>Currency</LeftTextContainer>
          <RightTextContainer>{currency}</RightTextContainer>
        </FieldContainer>
        <FieldContainer>
          <LeftTextContainer>Transaction ID</LeftTextContainer>
          <RightTextContainer>{id}</RightTextContainer>
        </FieldContainer>
        <FieldContainer>
          <LeftTextContainer>Email</LeftTextContainer>
          <RightTextContainer>{email}</RightTextContainer>
        </FieldContainer>
        <FieldContainer>
          <LeftTextContainer>Payment Gateway</LeftTextContainer>
          <RightTextContainer>{provider}</RightTextContainer>
        </FieldContainer>
        <FieldContainer>
          <LeftTextContainer>Payment Gateway </LeftTextContainer>
          <RightTextContainer background={status === "successful" ? "#73d895" : "#F9C4BD"}>
            {status}
          </RightTextContainer>
        </FieldContainer>
        <FieldContainer>
          <LeftTextContainer>Launch Code</LeftTextContainer>
          <RightTextContainer>{code}</RightTextContainer>
        </FieldContainer>
      </BottomContainer>
    </Container>
  );
};

export default PaymentDetailsCard;
