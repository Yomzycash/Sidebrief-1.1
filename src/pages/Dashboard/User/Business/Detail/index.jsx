import { DetailContainer } from "./styles";
import { StepBar } from "components/Indicators";
import StaffBusinessInfoCard from "components/cards/StaffBusinessInfoCard";

const BusinessDetail = () => {
  return (
    <DetailContainer>
      <StaffBusinessInfoCard />
      <StepBar />
    </DetailContainer>
  );
};

export default BusinessDetail;
