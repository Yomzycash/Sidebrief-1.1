import React, { useEffect, useState } from "react";
import BankAccountTable from "components/Tables/BankAccountTable";
import BankAccountContainer from "containers/BankAccount";
import { ResourcesIcon } from "asset/Icons";
import { BiRightArrowAlt } from "react-icons/bi";
import { ScrollBox } from "containers";
import { RewardCard } from "components/cards";
import NewEntityCard from "components/cards/EntityCard/NewEntityCard";
import { EntityCardsWrapper } from "./Launch/styled";
import { useGetAllEntitiesQuery } from "services/launchService";

const Test = () => {
  let iso = "NGA";
  const [entities, setEntities] = useState([]);
  const { data, error, isLoading, isSuccess } = useGetAllEntitiesQuery(
    iso
    // countryISO ? countryISO : countryISOView
  );

  useEffect(() => {
    setEntities(data);

    // if (error?.status === "FETCH_ERROR") {
    //   toast.error("Please check your internet connection");
    // }
  }, [data]);

  console.log(entities);

  return (
    <div style={{ display: "flex", flexFlow: "column", gap: "40px" }}>
      <BankAccountContainer
        title="Registered Businesses"
        subText="View and create bank accounts for all registered businesses"
        btnText="Create bank account"
        btnLeftIcon={ResourcesIcon}
      >
        <BankAccountTable />
      </BankAccountContainer>
      <BankAccountContainer
        title="Banks"
        subText="See all available banks to create an account with"
        searchPlaceholder="Search for a bank"
        btnText="View all"
        btnRightIcon={BiRightArrowAlt}
      >
        <ScrollBox>
          {Array(5)
            .fill("__")
            .map((reward, index) => (
              <RewardCard
                key={index}
                title={reward?.rewardPartner}
                body={reward?.rewardName}
                image={reward?.rewardImage}
              />
            ))}
        </ScrollBox>
      </BankAccountContainer>

      <EntityCardsWrapper>
        {entities?.map((entity) => (
          <NewEntityCard
            name={entity?.entityName}
            price={entity?.entityFee}
            timeline="3 days"
            requirement="dfgdfg"
            shares="dfgdf"
            type="dfg"
            currency="bgn"
            description="gfdegdfgdfgdfg"
          />
        ))}
      </EntityCardsWrapper>
    </div>
  );
};

export default Test;
