import React from "react";
import { AccountTypeCard } from "../../../components/cards";
import { PrimaryText } from "../../../components/texts";

const AccountType = () => {
  return (
    <div>
      <PrimaryText
        title="Get started with Sidebrief"
        body="How would you like to use your account"
      />
      <AccountTypeCard
        title="As an individual"
        body="Register your business with ease  lorem ipsum dolor imit"
        to="/register/user"
      />
    </div>
  );
};

export default AccountType;
