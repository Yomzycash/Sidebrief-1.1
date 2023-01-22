import HeaderCheckout from "components/Header/HeaderCheckout";
import Success from "containers/Confirmation/Success";
import React from "react";
import styled from "styled-components";
import SuccessImage from "asset/svg/SuccessImage.svg";
import { useNavigate } from "react-router-dom";
import AppFeedback from "components/AppFeedback";
const SuccessPage = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/launch/address");
  };

  return (
    <>
      <HeaderCheckout />

      <Body>
        <Success
          image={SuccessImage}
          buttonTitle="continue"
          onClick={handleNavigate}
        />
      </Body>
      {/* <AppFeedback subProject="Payment success" /> */}
    </>
  );
};

export default SuccessPage;
const Body = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 81.5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
