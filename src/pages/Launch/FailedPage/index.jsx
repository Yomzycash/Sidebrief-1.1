import HeaderCheckout from "components/Header/HeaderCheckout";
import Success from "containers/Confirmation/Success";
import React from "react";
import styled from "styled-components";
import Failed from "asset/svg/Failed.svg";
import { useNavigate } from "react-router-dom";
import AppFeedback from "components/AppFeedback";
const FailedPage = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("");
  };

  return (
    <>
      <HeaderCheckout />

      <Body>
        <Success
          image={Failed}
          title="Payment Failed"
          buttonTitle="Retry Payment"
          description="Uh oh! An error occured and we were unable to receive your payment. Kindly check your account balance and try again."
          onClick={handleNavigate}
          lastText
        />
      </Body>
      {/* <AppFeedback subProject="Failed page" /> */}
    </>
  );
};

export default FailedPage;
const Body = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: 768px) {
    height: 81.5vh;
  }
`;
