import HeaderCheckout from "components/Header/HeaderCheckout";
import { CheckoutController } from "containers";
import { CheckoutFormInfo } from "containers/Checkout";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCheckoutProgress } from "redux/Slices";
import { store } from "redux/Store";
import { Body, Bottom, Container, Header } from "../styled";

const BeneficiariesInfo = () => {
  const navigate = useNavigate();

  const currentBusiness = useSelector(
    (store) => store.RegisteredBusinessesInfo.currentBusiness
  );

  const { beneficiaries } = currentBusiness;

  const handleNext = () => {
    navigate("/checkout/review");
    store.dispatch(setCheckoutProgress({ total: 10, current: 7 })); // total- total pages and current - current page
  };

  const handlePrev = () => {
    navigate(-1);
    store.dispatch(setCheckoutProgress({ total: 10, current: 6 })); // total- total pages and current - current page
  };

  return (
    <Container>
      <Header>
        <HeaderCheckout />
      </Header>
      <Body>
        {Array.from(Array(beneficiaries), (_, index) => (
          <CheckoutFormInfo
            key={index}
            title="Beneficiary's Information"
            number={index + 1}
            numbers={beneficiaries ? beneficiaries : index + 1}
          />
        ))}
      </Body>
      <Bottom>
        <CheckoutController
          backText={"Previous"}
          forwardText={"Next"}
          forwardAction={handleNext}
          backAction={handlePrev}
        />
      </Bottom>
    </Container>
  );
};

export default BeneficiariesInfo;
