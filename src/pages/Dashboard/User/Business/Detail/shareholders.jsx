import { PdfCard } from "components/cards";
import { CardContainer, Loader } from "./styles";
import { useSelector } from "react-redux";
import { useViewLaunchRequestQuery } from "services/launchService";
import { Puff } from "react-loading-icons";

const DetailShareholder = () => {
	const launchResponse = useSelector(
		(store) => store.LaunchReducer.launchResponse
	);
	const { data, isLoading, isSuccess } =
		useViewLaunchRequestQuery(launchResponse);

	if (isSuccess) {
		console.log(data);
	}

	const members = isSuccess ? data.businessMembers : [];

	return (
		<>
			{isLoading ? (
				<Loader>
					<Puff stroke="#00A2D4" fill="white" />
				</Loader>
			) : (
				<CardContainer>
					{data.businessShareholders.map((item) => {
						const member = members.find(
							(el) => el.memberCode === item.memberCode
						);
						return (
							<PdfCard
								name={member.memberName}
								email={member.memberEmail}
								phone={`+${member.memberPhone}`}
								title={`${item.shareholderOwnershipType} - ${item.shareholderOwnershipPercentage}%`}
							/>
						);
					})}
				</CardContainer>
			)}
		</>
	);
};

export default DetailShareholder;
