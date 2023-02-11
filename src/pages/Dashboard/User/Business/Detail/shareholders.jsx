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

  const members = isSuccess ? data.businessMembers : [];
  const memberKYC = isSuccess ? data.businessMembersKYC : [];
  return (
    <>
      {isLoading ? (
        <Loader>
          <Puff stroke="#00A2D4" fill="white" />
        </Loader>
      ) : (
        <CardContainer>
          {data.businessShareholders.map((shareholder) => {
            const member = members.find(
              (el) => el.memberCode === shareholder.memberCode
            );
            const currentmemberKYC = memberKYC.filter(
              (el) => el.memberCode === shareholder.memberCode
            );
            const NINSlip = currentmemberKYC
              .filter((el) => el.documentType.includes("NIN Slip"))
              .slice(-1)[0];
            const proofFile = currentmemberKYC
              .filter((el) => el.documentType.includes("Proof of address"))
              .slice(-1)[0];
            const eSignature = currentmemberKYC
              .filter((el) => el.documentType.includes("E-signature"))
              .slice(-1)[0];
            const passportFile = currentmemberKYC
              .filter((el) => el.documentType.includes("Passport Photograph"))
              .slice(-1)[0];

            return (
              <PdfCard
                name={member.memberName}
                email={member.memberEmail}
                phone={`+${member.memberPhone}`}
                title={`${shareholder.shareholderOwnershipType} - ${shareholder.shareholderOwnershipPercentage}`}
                nin={NINSlip}
                proof={proofFile}
                signature={eSignature}
                passport={passportFile}
                page={"sharehholders"}
              />
            );
          })}
        </CardContainer>
      )}
    </>
  );
};

export default DetailShareholder;
