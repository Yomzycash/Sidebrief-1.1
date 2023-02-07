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

  const beneficiaryKYC = isSuccess ? data.beneficialOwnersKYC : [];

  return (
    <>
      {isLoading ? (
        <Loader>
          <Puff stroke="#00A2D4" fill="white" />
        </Loader>
      ) : (
        <CardContainer>
          {data.businessBeneficialOwners.map((beneficiary) => {
            const currentmemberKYC = beneficiaryKYC.filter(
              (el) => el.beneficialOwnerCode === beneficiary.beneficialOwnerCode
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

            console.log("checking", currentmemberKYC);
            return (
              <PdfCard
                name={beneficiary.beneficialOwnerName}
                email={beneficiary.beneficialOwnerEmail}
                phone={`+${beneficiary.beneficialOwnerPhone}`}
                title={`${beneficiary.beneficialOwnerOccupation} - ${beneficiary.beneficialOwnershipStake} stake`}
                nin={NINSlip}
                proof={proofFile}
                signature={eSignature}
                passport={passportFile}
              />
            );
          })}
        </CardContainer>
      )}
    </>
  );
};

export default DetailBeneficiaries;
