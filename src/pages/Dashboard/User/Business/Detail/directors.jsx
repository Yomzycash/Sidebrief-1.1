import { PdfCard } from "components/cards";
import { CardContainer, Loader } from "./styles";
import { useViewLaunchRequestQuery } from "services/launchService";
import { Puff } from "react-loading-icons";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DetailDirectors = () => {
	const { search } = useLocation();

	const searchParams = new URLSearchParams(search);

	const launchResponse = {
		launchCode: searchParams.get("launchCode"),
		registrationCountry: searchParams.get("registrationCountry"),
		registrationType: searchParams.get("registrationType"),
	};

	const { data, isLoading, isSuccess, refetch } =
		useViewLaunchRequestQuery(launchResponse);

	const members = isSuccess ? data.businessMembers : [];
	const memberKYC = isSuccess ? data.businessMembersKYC : [];

	useEffect(() => {
		refetch();
	}, [refetch]);

	return (
		<>
			{isLoading ? (
				<Loader>
					<Puff stroke="#00A2D4" fill="white" />
				</Loader>
			) : (
				<CardContainer>
					{data.businessDirectors.map((director) => {
						const member = members.find(
							(el) => el.memberCode === director.memberCode
						);
						const currentmemberKYC = memberKYC.filter(
							(el) => el.memberCode === director.memberCode
						);
						const NINSlip = currentmemberKYC
							.filter((el) =>
								el.documentType.includes("NIN Slip")
							)
							.slice(-1)[0];
						const proofFile = currentmemberKYC
							.filter((el) =>
								el.documentType.includes("Proof of address")
							)
							.slice(-1)[0];
						const eSignature = currentmemberKYC
							.filter((el) =>
								el.documentType.includes("E-signature")
							)
							.slice(-1)[0];
						const passportFile = currentmemberKYC
							.filter((el) =>
								el.documentType.includes("Passport Photograph")
							)
							.slice(-1)[0];

						return (
							<PdfCard
								name={member.memberName}
								email={member.memberEmail}
								phone={`+${member.memberPhone}`}
								code={member.memberCode}
								title={`${director.directorCode}`}
								nin={NINSlip}
								proof={proofFile}
								signature={eSignature}
								passport={passportFile}
								page={"directors"}
							/>
						);
					})}
				</CardContainer>
			)}
		</>
	);
};

export default DetailDirectors;
