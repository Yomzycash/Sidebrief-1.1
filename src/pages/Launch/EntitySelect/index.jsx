import React from "react";
import { CheckoutController, CheckoutSection } from "containers";
import { Body, Bottom, Container, Header, EntityCardsWrapper } from "../styled";
import { EntityCard } from "components/cards";
import HeaderCheckout from "components/Header/HeaderCheckout";
import { useNavigate } from "react-router-dom";

const EntitySelect = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/checkout/address");
  };

  return (
    <Container>
      <Header>
        <HeaderCheckout />
      </Header>
      <Body>
        <CheckoutSection title="Operational Country: Nigeria">
          <EntityCardsWrapper>
            <EntityCard
              name="Limited Liability Company"
              shortname="L.L.C"
              price="15,000"
              company="Private Company"
              timeline={{ from: 20, to: 30 }}
              shareholder="Local Shareholders Only"
              shares={10000}
              type="Standard"
            />
            <EntityCard
              name="Public Liability Company"
              price="22,000"
              company="Private Company"
              timeline={{ from: 20, to: 30 }}
              shareholder="Local Shareholders Only"
              shares={10000}
              type="Standard"
            />
            <EntityCard
              name="C-Corporation"
              price={"35,000"}
              company="Private Company"
              timeline={{ from: 20, to: 30 }}
              shareholder="Local Shareholders Only"
              shares={10000}
              type="Standard"
            />
            <EntityCard
              name="Business Name"
              price={"15,000"}
              company="International Company"
              timeline={{ from: 20, to: 30 }}
              shareholder="Federal Shareholders Only"
              shares={10000}
              type="Standard"
            />
            <EntityCard
              name="Non Governmental Organisation"
              price={"25,000"}
              company="Public Company"
              timeline={{ from: 20, to: 30 }}
              shareholder="Local Shareholders Only"
              shares={10000}
              type="Standard"
            />
            <EntityCard
              name="Limited Liability Company"
              shortname="L.L.C"
              price={"40000"}
              company="Private Company"
              timeline={{ from: 20, to: 30 }}
              shareholder="Private Shareholders Only"
              shares={10000}
              type="Standard"
            />
          </EntityCardsWrapper>
        </CheckoutSection>
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

export default EntitySelect;
