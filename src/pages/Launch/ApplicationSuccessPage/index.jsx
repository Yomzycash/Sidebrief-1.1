import HeaderCheckout from "components/Header/HeaderCheckout";
import Success from "containers/Confirmation/Success";
import React from "react";
import styled from "styled-components";
import SuccessImage from "asset/svg/SuccessImage.svg";
import { useNavigate } from "react-router-dom";
import AppFeedback from "components/AppFeedback";
const ApplicationSuccessPage = () => {
  const navigate = useNavigate();
  const launchInfo = JSON.parse(localStorage.getItem("launchInfo"));
  console.log(launchInfo);
  const handleNavigate = () => {
    navigate(`/dashboard/business/${launchInfo.launchCode}/detail`);
  };
  const timeline = JSON.parse(localStorage.getItem("entityTimeline"));

  return (
    <>
      <HeaderCheckout />

      <Body>
        <Success
          title="Application Successful"
          description={`Thank you for your patience, your application would take ${timeline} `}
          image={SuccessImage}
          buttonTitle="View Application"
          onClick={handleNavigate}
        />
      </Body>
      {/* <AppFeedback subProject="Application success page" /> */}
    </>
  );
};

export default ApplicationSuccessPage;
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
