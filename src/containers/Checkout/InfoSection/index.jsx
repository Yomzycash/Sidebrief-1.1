import React from "react";
import { InputWithLabel, DropDown } from "components/input";
import Checkbox from "components/input/Checkbox";
import NumberInput from "components/input/phoneNumberInput";
import {
  ContentWrapper,
  DetailedSection,
  NumberPage,
  Title,
  TitleWrapper,
  Wrapper,
} from "./style";

export const CheckoutFormInfo = ({
  title = "Shareholder’s Information",
  page = "1",
}) => {
  return (
    <Wrapper>
      <TitleWrapper>
        <Title>{title}:</Title>
        <NumberPage>{page} of 4</NumberPage>
      </TitleWrapper>

      <ContentWrapper>
        <InputWithLabel
          label="Full Name"
          bottomText="Please start with the first name then the middle name (if available) and finally the last name"
          type="text"
          register={() => {}}
        />

        <DetailedSection>
          <NumberInput label="Phone number" />

          <InputWithLabel
            label="Email Address"
            type="email"
            register={() => {}}
          />
        </DetailedSection>
        <DetailedSection>
          <DropDown
            containerStyle={"DetailedSection"}
            labelStyle={"Label"}
            label="Share Percentage"
          />

          <DropDown
            containerStyle={"DetailedSection"}
            labelStyle={"Label"}
            label="Share Type"
          />
        </DetailedSection>
      </ContentWrapper>

      <DetailedSection>
        <Checkbox />

        <Checkbox
          text1="Click here if "
          styledSpan1="shareholder "
          text2="is also a "
          styledSpan2="Director "
        />
      </DetailedSection>
    </Wrapper>
  );
};
