import {
  DetailContainer,
  DetailWrapper,
  Loader,
  ContinueButton,
} from "./styles";
import { StepBar } from "components/Indicators";
import StaffBusinessInfoCard from "components/cards/StaffBusinessInfoCard";
import { useSelector } from "react-redux";
import {
  useViewLaunchRequestQuery,
  useViewPayLaunchMutation,
} from "services/launchService";
import { Puff } from "react-loading-icons";
import { Dialog, DialogContent, useMediaQuery } from "@mui/material";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkPaymentStatus } from "pages/Launch/actions";

const BusinessDetail = () => {
  const [open, setOpen] = useState(false);
  const launchResponse = useSelector(
    (store) => store.LaunchReducer.launchResponse
  );

  const { data, isLoading } = useViewLaunchRequestQuery(launchResponse);
  const [viewPayLaunch, viewPayState] = useViewPayLaunchMutation();

  const navigate = useNavigate();

  const matches = useMediaQuery("(max-width:700px)");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleContinueNavigation = async () => {
    let paymentInfo = await checkPaymentStatus({
      ...launchResponse,
      viewPayLaunch,
    });

    if (paymentInfo.status) {
      navigate("/launch/address");
    } else {
      navigate("/launch");
    }
  };

  const StepbarStyle = {
    padding: 0,
    backgroundColor: "white",
    width: "max-width",
    borderRadius: "16px",
    boxShadow:
      "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)",
  };

  const isPending = isLoading ? false : data.registrationStatus === "pending";

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
                      <StepBar
                        applied={data.createdAt}
                        mobile
                        handleClose={handleClose}
                      />
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
              />
              <StepBar applied={data.createdAt} />
            </DetailContainer>
          </DetailWrapper>
          {isPending ? (
            <ContinueButton onClick={handleContinueNavigation}>
              {!viewPayState.isLoading ? (
                "Continue Application"
              ) : (
                <Puff stroke="white" width={25} />
              )}
            </ContinueButton>
          ) : null}
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
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: #ffbf29;
  background: rgba(255, 191, 41, 0.05);
  border-radius: 12px;
  padding: 4px 16px;
`;
const TimeLine = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  cursor: pointer;
  color: #00a2d4;
`;
