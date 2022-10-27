import { DetailContainer, Loader } from "./styles";
import { StepBar } from "components/Indicators";
import StaffBusinessInfoCard from "components/cards/StaffBusinessInfoCard";
import { useSelector } from "react-redux";
import { useViewLaunchRequestQuery } from "services/launchService";
import { Puff } from "react-loading-icons";

const BusinessDetail = () => {
	const launchResponse = useSelector(
		(store) => store.LaunchReducer.launchResponse
	);
	const { data, isLoading } = useViewLaunchRequestQuery(launchResponse);

	return (
		<>
			{isLoading ? (
				<Loader>
					<Puff stroke="#00A2D4" fill="white" />
				</Loader>
			) : (
				<DetailContainer>
					<StaffBusinessInfoCard
						businessNames={data.businessNames}
						businessObjectives={data.businessObjects}
						address={data.businessAddress}
						type={data.registrationType}
					/>
					<StepBar />
				</DetailContainer>
			)}
		</>
	);
};

export default BusinessDetail;
