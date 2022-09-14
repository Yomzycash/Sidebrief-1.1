import React from "react";
import HeaderCheckout from "components/Header/HeaderCheckout";
import { Page, Inputs } from "../styled";
import {
  CheckoutController,
  CheckoutSection,
  CheckoutInfoKYC,
} from "containers";

const ShareHolderKYC = () => {
  return (
    <>
      <HeaderCheckout />
      <Page>
        <CheckoutSection title={"Shareholders KYC Information"}>
          <CheckoutInfoKYC name={"Mrs Grace Nwankwo"} />
        </CheckoutSection>
      </Page>

      <Page>
        <CheckoutSection>
          <CheckoutInfoKYC name={"Mr Lawal Ogundana"} />
        </CheckoutSection>
        <CheckoutController backText={"Previous"} forwardText={"Next"} />
      </Page>
    </>
  );
};

export default ShareHolderKYC;
