import PetalsCard from "components/cards/RewardCard/PetalsCard";
import FeatureDetails from "components/featureDetails";
import { ScrollBox } from "containers";
import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useGetSingleBankQuery } from "services/staffService";
import { useGetAllBanksQuery } from "services/staffService";
import { FiArrowUpRight } from "react-icons/fi";

const BankAccountDetails = () => {
  const params = useParams();

  const { data } = useGetSingleBankQuery(params.bankCode);
  console.log("check", data?.bankUrl);
  const allBanks = useGetAllBanksQuery();

  const navigate = useNavigate();

  return (
    <FeatureDetails
      backLink="/dashboard/bank-account"
      backText="Back to Bank Accounts"
      image={data?.bankLogo}
      title={data?.bankName}
      detailText={data?.bankDescription}
      btnText="Create an account"
      btnIcon={FiArrowUpRight}
      btnAction={() => window.open(`https://${data?.bankUrl}`, "_blank")}
      pageTitle="Bank Accounts"
      title2="Check out similar banks"
      viewAllLink="/dashboard/bank-account"
    >
      {console.log(data?.bankUrl)}
      <ScrollBox>
        {allBanks?.data?.slice(0, 8)?.map((reward, index) => (
          <PetalsCard
            key={index}
            title={reward?.bankCountry}
            subText={reward?.bankName}
            image={reward?.bankLogo}
            action={() =>
              navigate(`/dashboard/bank-account/${reward?.bankCode}`)
            }
          />
        ))}
      </ScrollBox>
    </FeatureDetails>
  );
};

export default BankAccountDetails;
