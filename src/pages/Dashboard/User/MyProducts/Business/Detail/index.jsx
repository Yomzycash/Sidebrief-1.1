import { DetailContainer, DetailWrapper, Loader } from "./styles";
import { StepBar } from "components/Indicators";
import StaffBusinessInfoCard from "components/cards/StaffBusinessInfoCard";
import { Puff } from "react-loading-icons";
import { Dialog, DialogContent, useMediaQuery } from "@mui/material";
import styled from "styled-components";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const BusinessDetail = () => {
  const [open, setOpen] = useState(false);

  const { data, isLoading, getCountry } = useOutletContext();

  const matches = useMediaQuery("(max-width:700px)");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const StepbarStyle = {
    padding: 0,
    backgroundColor: "white",
    width: "max-width",
    borderRadius: "16px",
    boxShadow:
      "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)",
  };

  return (
    <>
      {isLoading ? (
        <Loader>
          <Puff stroke="#00A2D4" fill="white" />
        </Loader>
      ) : (
        <>
          <DetailWrapper>
            {matches && (
              <StatusWrapper>
                <Status> Status</Status>
                <LowerContainer>
                  <StatusContent>In Progress</StatusContent>
                  <TimeLine onClick={handleClickOpen}>View timeline</TimeLine>
                  <Dialog onClose={handleClose} open={open}>
                    <DialogContent style={StepbarStyle}>
                      <StepBar applied={data?.createdAt} mobile handleClose={handleClose} />
                    </DialogContent>
                  </Dialog>
                </LowerContainer>
              </StatusWrapper>
            )}
            <DetailContainer>
              <StaffBusinessInfoCard
                businessNames={data?.businessNames}
                businessObjectives={data?.businessObjects}
                address={data?.businessAddress}
                type={data?.registrationType}
                country={getCountry?.countryName}
              />
              <StepBar applied={data?.createdAt} />
            </DetailContainer>
          </DetailWrapper>
        </>
      )}
    </>
  );
};

export default BusinessDetail;

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
