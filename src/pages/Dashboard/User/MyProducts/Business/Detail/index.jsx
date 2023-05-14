import { DetailContainer, DetailWrapper, Loader } from "./styles";
import { StepBar } from "components/Indicators";
import StaffBusinessInfoCard from "components/cards/StaffBusinessInfoCard";
import { Puff } from "react-loading-icons";

import { useOutletContext } from "react-router-dom";

const BusinessDetail = () => {
  const { data, isLoading, getCountry } = useOutletContext();

  return (
    <>
      {isLoading ? (
        <Loader>
          <Puff stroke="#00A2D4" fill="white" />
        </Loader>
      ) : (
        <>
          <DetailWrapper>
            <DetailContainer>
              <StaffBusinessInfoCard
                businessNames={data?.businessNames}
                businessObjectives={data?.businessObjects}
                address={data?.businessAddress}
                type={data?.registrationType}
                country={getCountry?.countryName}
              />
              <StepBar applied={data?.createdAt} />
            </DetailContainer>
          </DetailWrapper>
        </>
      )}
    </>
  );
};

export default BusinessDetail;
