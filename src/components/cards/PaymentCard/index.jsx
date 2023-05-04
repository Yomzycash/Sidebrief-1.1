import { DateText, DotSeperator } from "containers/BusinessDetail/Header/styles";
import React from "react";
import {
  BottomContainer,
  Container,
  FieldContainer,
  LeftTextContainer,
  RightTextContainer,
  TopContainer,
} from "./styles";

const PaymentDetailsCard = ({ isLoading, date, info }) => {
  return (
    <Container>
      <TopContainer>
        <DotSeperator />
        <DateText>{isLoading ? `--` : `Date: ${date}`}</DateText>
      </TopContainer>

      <BottomContainer>
        {info?.map((el) => (
          <FieldContainer>
            <LeftTextContainer>{el?.fieldName}</LeftTextContainer>
            <RightTextContainer>{el?.fieldValue}</RightTextContainer>
          </FieldContainer>
        ))}
      </BottomContainer>
    </Container>
  );
};

export default PaymentDetailsCard;
