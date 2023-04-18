import React, { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@mui/material";
import toast from "react-hot-toast";
import { CheckoutController } from "containers";
import { HiX } from "react-icons/hi";
import {
  BackContainer,
  CloseWrapper,
  ModalButton,
  ModalWrapper,
  ProgressWrapper,
  Question,
  Text,
  Top,
  Wrapper,
} from "./styled";
import ServicesProgressBar from "components/Indicators/progressbar/ServicesProgressBar";
import { removeComplyFromLocalStorage } from "utils/globalFunctions";

const ServicesCheckoutHeader = ({ getStarted, backToDashBoard }) => {
  const LayoutInfo = useSelector((store) => store.LayoutInfo);
  const { serviceCheckoutProgress } = LayoutInfo;
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [headerShadow, setHeaderShadow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setHeaderShadow(window.pageXOffset > 0 ? true : false);
    });
  }, []);

  const handleClick = () => {
    setOpenModal(true);
  };

  const handleNext = () => {
    setOpenModal(false);
    removeComplyFromLocalStorage();
    toast.success("Saved");
    navigate("/dashboard");
  };

  const handlePrev = () => {
    setOpenModal(false);
  };

  const toDashboard = () => {
    navigate("/dashboard");
    removeComplyFromLocalStorage();
  };

  return (
    <>
      <Wrapper headerShadow={headerShadow}>
        {!getStarted && (
          <BackContainer onClick={handleClick}>
            <FiArrowLeft color="#151717" size={24} />
            <Text>Save & Exit</Text>
          </BackContainer>
        )}

        {backToDashBoard && (
          <BackContainer onClick={toDashboard}>
            <FiArrowLeft color="#151717" size={24} />
            <Text>Back to Dashboard</Text>
          </BackContainer>
        )}

        <ProgressWrapper style={{ left: getStarted && 0 }}>
          <ServicesProgressBar progress={serviceCheckoutProgress} />
        </ProgressWrapper>
      </Wrapper>

      <Dialog open={openModal} fullWidth maxWidth="sm">
        <ModalWrapper>
          <Top>
            <CloseWrapper onClick={() => setOpenModal(false)}>
              <HiX size={20} />
            </CloseWrapper>
          </Top>

          <Question>Save and continue later?</Question>
          <ModalButton>
            <CheckoutController
              backAction={handlePrev}
              backText={"No"}
              forwardAction={handleNext}
              forwardText={"Yes"}
            />
          </ModalButton>
        </ModalWrapper>
      </Dialog>
    </>
  );
};

export default ServicesCheckoutHeader;
