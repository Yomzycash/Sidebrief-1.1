import React from "react";
import { AccountTypeCard } from "../../../../components/cards";
import { HeadText } from "../../../../components/texts";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Navbar from "../../../../components/navbar";
import TextsWithLink from "components/texts/TextWithLinks";
import { useLocation } from "react-router-dom";
import {
  AccountFooter,
  AccountTypeBody,
  AccountTypeCont,
  AccountTypeMain,
  Bottom,
  Middle,
  Top,
} from "./styled";
import AppFeedback from "components/AppFeedback";

const AccountType = () => {
  const location = useLocation();

  return (
    <AccountTypeMain>
      <Navbar />
      <AccountTypeCont>
        <AccountTypeBody>
          <Top>
            <HeadText
              title="Get started with Sidebrief"
              body="How would you like to use your account"
            />
          </Top>
          <Middle
            key="AccountTypeMiddle"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <AiOutlineInfoCircle />
              <p>Learn what the Sidebrief account types mean</p>
            </div>
          </Middle>
          <Bottom>
            <AccountTypeCard
              title="As a Reseller"
              body="Provide compliance services for businesses. For service professionals only. "
              to={`${location.pathname}/reseller`}
            />
            <AccountTypeCard
              title="As a Business Owner"
              body="The fastest way to build and scale businesses faster        "
              to={`${location.pathname}/user`}
              $shadow
            />
            <AccountTypeCard
              title="As a Partner"
              body="Manage client compliance better. For service professional only."
              to={`${location.pathname}/partner`}
            />
          </Bottom>
        </AccountTypeBody>

        <AccountFooter>
          <TextsWithLink
            text={[
              {
                text: "Already have an account? ",
                link: { text: "Sign In", to: "/login" },
              },
            ]}
          />
        </AccountFooter>
      </AccountTypeCont>
      <AppFeedback subProject="Account type" />
    </AccountTypeMain>
  );
};

export default AccountType;
