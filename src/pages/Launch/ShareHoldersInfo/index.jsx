import HeaderCheckout from "components/Header/HeaderCheckout";
import { CheckoutController } from "containers";
import { CheckoutFormInfo } from "containers/Checkout";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCheckoutProgress } from "redux/Slices";
import { store } from "redux/Store";
import { Body, Bottom, Container, Header } from "../styled";

const ShareHoldersInfo = () => {
  const navigate = useNavigate();

  const currentBusiness = useSelector(
    (store) => store.RegisteredBusinessesInfo.currentBusiness
  );

  const { shareHolders } = currentBusiness;

  const handleNext = () => {
    navigate("/launch/directors-info");
    store.dispatch(setCheckoutProgress({ total: 10, current: 5 })); // total- total pages and current - current page
  };

  const handlePrev = () => {
    navigate(-1);
    store.dispatch(setCheckoutProgress({ total: 10, current: 4 })); // total- total pages and current - current page
  };

  return (
    <Container>
      <Header>
        <HeaderCheckout />
      </Header>
      <Body>
        {Array.from(Array(shareHolders), (_, index) => (
          <CheckoutFormInfo
            key={index}
            title="Shareholder's Information"
            number={index + 1}
            numbers={shareHolders ? shareHolders : index + 1}
          />
        ))}
      </Body>
      <Bottom>
        <CheckoutController
          backAction={handlePrev}
          backText={"Previous"}
          forwardAction={handleNext}
          forwardText={"Proceed"}
        />
      </Bottom>
    </Container>
  );
};

export default ShareHoldersInfo;
