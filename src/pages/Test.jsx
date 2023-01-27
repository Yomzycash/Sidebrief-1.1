import React from "react";
import BankAccountTable from "components/Tables/BankAccountTable";
import BankAccountContainer from "containers/BankAccount";
import { ResourcesIcon } from "asset/Icons";
import { BiRightArrowAlt } from "react-icons/bi";
import { ScrollBox } from "containers";
import { RewardCard } from "components/cards";

const Test = () => {
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
    </div>
  );
};

export default Test;
