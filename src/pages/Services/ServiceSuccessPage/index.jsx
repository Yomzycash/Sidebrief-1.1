import HeaderCheckout from "components/Header/HeaderCheckout";
import Success from "containers/Confirmation/Success";
import React from "react";
import styled from "styled-components";
import SuccessImage from "asset/svg/SuccessImage.svg";
import { useNavigate } from "react-router-dom";
import { useGetSingleServiceQuery } from "services/staffService";

const ServiceSuccessPage = () => {
  const navigate = useNavigate();

  const complyCodeData = JSON.parse(localStorage.getItem("complyData"));
  let serviceId = complyCodeData.serviceId;

  const viewService = useGetSingleServiceQuery(serviceId);
  let timeline = viewService?.data?.serviceTimeline;

  const handleNavigate = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <Body>
        <Success
          title="Service Request Successful"
          description={`Thank you for your patience, your service request would take ${timeline} `}
          image={SuccessImage}
          buttonTitle="View Service"
          onButtonClick={handleNavigate}
        />
      </Body>
    </>
  );
};

export default ServiceSuccessPage;

const Body = styled.div`
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
