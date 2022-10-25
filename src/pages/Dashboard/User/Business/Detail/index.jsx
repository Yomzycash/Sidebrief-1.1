import { DetailContainer } from "./styles";
import { StepBar } from "components/Indicators";
import StaffBusinessInfoCard from "components/cards/StaffBusinessInfoCard";
import { useSelector } from "react-redux";
import { useViewLaunchRequestQuery } from "services/launchService";

const BusinessDetail = () => {
	const launchResponse = useSelector(
		(store) => store.LaunchReducer.launchResponse
	);
	const { data, isLoading } = useViewLaunchRequestQuery(launchResponse);

	return (
		<DetailContainer>
			<StaffBusinessInfoCard
				businessNames={isLoading ? {} : data.businessNames}
				businessObjectives={isLoading ? {} : data.businessObjects}
				address={isLoading ? {} : data.businessAddress}
				type={isLoading ? `` : data.registrationType}
			/>
			<StepBar />
		</DetailContainer>
	);
};

export default BusinessDetail;
