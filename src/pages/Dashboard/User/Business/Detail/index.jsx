import { DetailContainer, DetailWrapper, Loader } from "./styles";
import { StepBar } from "components/Indicators";
import StaffBusinessInfoCard from "components/cards/StaffBusinessInfoCard";
import { useSelector } from "react-redux";
import { useViewLaunchRequestQuery } from "services/launchService";
import { Puff } from "react-loading-icons";
import { useMediaQuery } from "@mui/material";
import styled from "styled-components";

const BusinessDetail = () => {
  const launchResponse = useSelector(
    (store) => store.LaunchReducer.launchResponse
  );
  const { data, isLoading } = useViewLaunchRequestQuery(launchResponse);
  const matches = useMediaQuery("(max-width:700px)");
  return (
    <>
      {isLoading ? (
        <Loader>
          <Puff stroke="#00A2D4" fill="white" />
        </Loader>
      ) : (
        <DetailWrapper>
          {matches && (
            <StatusWrapper>
              <Status> Status</Status>
              <LowerContainer>
                <StatusContent>In Progress</StatusContent>
                <TimeLine>View timeline</TimeLine>
              </LowerContainer>
            </StatusWrapper>
          )}
          <DetailContainer>
            <StaffBusinessInfoCard
              businessNames={data.businessNames}
              businessObjectives={data.businessObjects}
              address={data.businessAddress}
              type={data.registrationType}
            />
            <StepBar />
          </DetailContainer>
        </DetailWrapper>
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
const TimeLine = styled.h3`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  cursor: pointer;
  color: #00a2d4;
`;
