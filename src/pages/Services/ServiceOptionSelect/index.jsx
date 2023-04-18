import React from "react";
import { Body, Container } from "../styled";
import ServicesCheckoutHeader from "components/Header/ServicesCheckoutHeader";
import { CheckoutSection } from "containers";
import { Link } from "react-router-dom";
import ServicesCard from "components/cards/ServicesCard";
import { OptionsContainer } from "./styled";
import { GiLightningSpanner } from "react-icons/gi";
import { IoRocket } from "react-icons/io";


const ServiceOptionSelect = () => {
  return (
    <Container>
      <ServicesCheckoutHeader getStarted backToDashBoard />

      <Body>
        <CheckoutSection title="Select an Option" />
        <OptionsContainer>
          <ServicesCard
            Icon={GiLightningSpanner}
            title="Manage Your Business"
            body="Hi everyone, I'm the body of the above header. I hold the content of this coomponent."
            to="/services/manage"
          />
          <ServicesCard
            Icon={IoRocket}
            title="Onboard your business"
            body="Hi everyone, I'm the body of the above header. I hold the content of this coomponent."
            to="/services/onboard"
          />
        </OptionsContainer>
      </Body>
    </Container>
  );
};

export default ServiceOptionSelect;
