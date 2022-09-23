import HeaderCheckout from "components/Header/HeaderCheckout";
import { CheckoutController } from "containers";
import { CheckoutFormInfo, CheckoutSection } from "containers/Checkout";
import LaunchFormContainer from "containers/Checkout/CheckoutFormContainer/LaunchFormContainer";
import LaunchPrimaryContainer from "containers/Checkout/CheckoutFormContainer/LaunchPrimaryContainer";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCheckoutProgress } from "redux/Slices";
import { store } from "redux/Store";
import { AddMore, Body, Bottom, Container, Header } from "../styled";
import { ReactComponent as AddIcon } from "asset/Launch/Add.svg";
import { Dialog } from "@mui/material";
import LaunchSummaryCard from "components/cards/LaunchSummaryCard";

const DirectorsInfo = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const currentBusiness = useSelector(
    (store) => store.RegisteredBusinessesInfo.currentBusiness
  );
  const LaunchApplicationInfo = useSelector((store) => store.LaunchReducer);
  const { directorsLaunchInfo } = LaunchApplicationInfo;
  console.log(directorsLaunchInfo);

  const { shareHolders } = currentBusiness;

  const handleNext = () => {
    navigate("/launch/beneficiaries-info");
    store.dispatch(setCheckoutProgress({ total: 10, current: 5 })); // total- total pages and current - current page
  };

  const handlePrev = () => {
    navigate(-1);
    store.dispatch(setCheckoutProgress({ total: 10, current: 4 })); // total- total pages and current - current page
  };

  const handleCheckbox = (checked) => {
    console.log(checked);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };
  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <Container>
      <HeaderCheckout />
      <Body>
        <CheckoutSection
          title={"Director's Information"}
          checkbox="Directors"
          checkBoxAction={handleCheckbox}
        />
        <LaunchPrimaryContainer>
          <LaunchFormContainer>
            {directorsLaunchInfo.map((director, index) => (
              <LaunchSummaryCard
                key={index}
                number={index + 1}
                name={director.full_name}
                shares={director.share_type}
                email={director.email}
                phone={director.phone}
                sharesPercentage={director.share_percentage}
              />
            ))}
            <AddMore onClick={handleModalOpen}>
              <AddIcon />
              <span>Add a Director</span>
            </AddMore>
            <Dialog onClose={handleModalClose} open={openModal}>
              <CheckoutFormInfo
                title="Director"
                handleClose={handleModalClose}
              />
            </Dialog>
          </LaunchFormContainer>
          <Bottom>
            <CheckoutController
              backAction={handlePrev}
              backText={"Previous"}
              forwardAction={handleNext}
              forwardText={"Proceed"}
            />
          </Bottom>
        </LaunchPrimaryContainer>
        {/* {Array.from(Array(shareHolders), (_, index) => (
          <CheckoutFormInfo
            key={index}
            title="Shareholder's Information"
            number={index + 1}
            numbers={shareHolders ? shareHolders : index + 1}
          />
        ))} */}
      </Body>
    </Container>
  );
};

export default DirectorsInfo;
