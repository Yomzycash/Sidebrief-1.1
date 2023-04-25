import HeaderCheckout from "components/Header/HeaderCheckout";
import Success from "containers/Confirmation/Success";
import React from "react";
import styled from "styled-components";
import SuccessImage from "asset/svg/SuccessImage.svg";
import { useNavigate } from "react-router-dom";

const ApplicationSuccessPage = () => {
  const navigate = useNavigate();
  const launchInfo = JSON.parse(localStorage.getItem("launchInfo"));

  let launchCode = launchInfo?.launchCode;
  let registrationCountry = launchInfo?.registrationCountry;
  let registrationType = launchInfo?.registrationType;

  const handleNavigate = () => {
    let link = `/dashboard/my-products/business/detail?launchCode=${launchCode}&registrationCountry=${registrationCountry}&registrationType=${registrationType}`;
    navigate(link);
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
