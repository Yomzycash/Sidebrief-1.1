import StaffBusinessInfoCard from "components/cards/StaffBsinessInfoCard";
import { DetailContainer } from "./styles";
import { StepBar } from "components/Indicators";

const BusinessDetail = () => {
	return (
		<DetailContainer>
			<StaffBusinessInfoCard />
			<StepBar />
		</DetailContainer>
	);
};

export default BusinessDetail;
