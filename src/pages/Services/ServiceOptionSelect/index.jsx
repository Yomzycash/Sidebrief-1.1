import React from "react";
import { Body, Container } from "../styled";
import ServicesCheckoutHeader from "components/Header/ServicesCheckoutHeader";
import { CheckoutSection } from "containers";
import ProductCard from "components/cards/ProductCard";
import { OptionsContainer } from "./styled";
import { GiLightningSpanner } from "react-icons/gi";
import { HiRocketLaunch } from "react-icons/hi2";

const ServiceOptionSelect = () => {
  return (
    <Container>
      <ServicesCheckoutHeader getStarted backToDashBoard />

      <Body>
        <CheckoutSection title="Select an Option" />
        <OptionsContainer>
          <ProductCard
            Icon={GiLightningSpanner}
            title="Manage Your Business"
            body="Make changes to already registered companies"
            to="/services/manage"
          />
          <ProductCard
            Icon={HiRocketLaunch}
            title="Onboard your business"
            body="Automate your business compliance"
            to="/services/onboard"
          />
        </OptionsContainer>
      </Body>
    </Container>
  );
};

export default ServiceOptionSelect;
