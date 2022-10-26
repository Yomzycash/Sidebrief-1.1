import { PdfCard } from "components/cards";
import { CardContainer, Loader } from "./styles";
import { useViewLaunchRequestQuery } from "services/launchService";
import { Puff } from "react-loading-icons";
import { useSelector } from "react-redux";

const DetailBeneficiaries = () => {
	const launchResponse = useSelector(
		(store) => store.LaunchReducer.launchResponse
	);
	const { data, isLoading, isSuccess } =
		useViewLaunchRequestQuery(launchResponse);

	if (isSuccess) {
		console.log(data);
	}

	return (
		<>
			{isLoading ? (
				<Loader>
					<Puff stroke="#00A2D4" fill="white" />
				</Loader>
			) : (
				<CardContainer>
					{data.businessBeneficialOwners.map((item) => {
						return (
							<PdfCard
								name={item.beneficialOwnerName}
								email={item.beneficialOwnerEmail}
								phone={`+${item.beneficialOwnerPhone}`}
								title={`${item.beneficialOwnerOccupation} - ${item.beneficialOwnershipStake}% stake`}
							/>
						);
					})}
				</CardContainer>
			)}
		</>
	);
};

export default DetailBeneficiaries;
