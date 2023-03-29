import React, { useEffect } from "react";
import { DetailContainer, DetailWrapper } from "./styles";
import { Dialog, DialogContent, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { StepBar } from "components/Indicators";
import { useGetAllCountriesQuery, useGetSingleServiceQuery } from "services/staffService";
import { useLazyViewComplyQuery } from "services/complyService";
import ServiceInfoContainer from "containers/ServiceInfoContainer";

const ServiceInformation = () => {
  const [viewComply, viewComplyState] = useLazyViewComplyQuery();
  const [complyResponse, setComplyResponse] = useState([]);
  const countries = useGetAllCountriesQuery();

  const [open, setOpen] = useState(false);

  let complyCode = "302033545077050509";

  const handleViewResponse = async () => {
    const requiredData = {
      complyCode: complyCode,
    };
    const response = await viewComply(requiredData);
    console.log(response);
    setComplyResponse(response);
  };

  let serviceId = complyResponse?.data?.serviceId;

  const serviceData = useGetSingleServiceQuery(serviceId, { refetchOnMountOrArgChange: true });

  let getCountry = countries?.data?.find(
    (country) => country?.countryISO === serviceData?.data?.serviceCountry
  )?.countryName;

  useEffect(() => {
    handleViewResponse();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const matches = useMediaQuery("(max-width:700px)");
  const StepbarStyle = {
    padding: 0,
    backgroundColor: "white",
    width: "max-width",
    borderRadius: "16px",
    boxShadow:
      "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)",
  };
  return (
    <div>
      <DetailWrapper>
        {matches && (
          <StatusWrapper>
            <Status> Status</Status>
            <LowerContainer>
              <StatusContent>In Progress</StatusContent>
              <TimeLine onClick={handleClickOpen}>View timeline</TimeLine>
              <Dialog onClose={handleClose} open={open}>
                <DialogContent style={StepbarStyle}>
                  <StepBar
                    applied={complyResponse?.data?.createdAt}
                    mobile
                    handleClose={handleClose}
                  />
                </DialogContent>
              </Dialog>
            </LowerContainer>
          </StatusWrapper>
        )}
        <DetailContainer>
          <ServiceInfoContainer
            serviceDescription={serviceData?.data?.serviceDescription}
            serviceCategory={serviceData?.data?.serviceCategory}
            serviceCountry={getCountry}
            servicePrice={serviceData?.data?.servicePrice}
            serviceCurrency={serviceData?.data?.serviceCurrency}
            serviceTimeline={serviceData?.data?.serviceTimeline}
          />
          {/* <StepBar applied={complyResponse?.data?.createdAt} /> */}
        </DetailContainer>
      </DetailWrapper>
    </div>
  );
};

export default ServiceInformation;

const StatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  width: 100%;
`;
const Status = styled.h3`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #4e5152;
`;
const LowerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  justify-content: space-between;
  padding-block: 4px;
  width: 100%;
`;
const StatusContent = styled.div`
  background: #ffbf290c;
  border-radius: 12px;
  padding: 4px 16px;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: #ffbf29;
`;
const TimeLine = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  cursor: pointer;
  color: #00a2d4;
`;
