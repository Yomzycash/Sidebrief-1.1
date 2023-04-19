import Success from "containers/Confirmation/Success";
import React from "react";
import styled from "styled-components";
import SuccessImage from "asset/svg/SuccessImage.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleServiceQuery } from "services/staffService";
import { removeComplyFromLocalStorage } from "utils/globalFunctions";

const ServiceSuccessPage = () => {
  const navigate = useNavigate();

  const complyInfo = JSON.parse(localStorage.getItem("complyInfo"));
  let serviceId = complyInfo?.serviceId;

  const { option } = useParams();

  const viewService = useGetSingleServiceQuery(serviceId);
  let timeline = viewService?.data?.serviceTimeline;

  const handleNavigate = async () => {
    navigate(`/dashboard/${option}/${complyInfo?.complyCode}/info`);
    removeComplyFromLocalStorage();
  };

  return (
    <>
      <Body>
        <Success
          title="Service Request Successful"
          description={`Thank you for your patience, your service request would take ${timeline} working days`}
          image={SuccessImage}
          buttonTitle="View Service"
          onClick={handleNavigate}
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
