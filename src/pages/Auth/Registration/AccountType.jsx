import React from "react";
import { AccountTypeCard } from "../../../components/cards";
import { HeadText } from "../../../components/texts";
import styled from "styled-components";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { LogoNav } from "../../../components/navbar";
import TextsWithLink from "../../../components/texts/TextsWithLink";

const AccountType = () => {
  return (
    <AccountTypeCont>
      <AccountTypeHead>
        <LogoNav />
      </AccountTypeHead>
      <AccountTypeBody>
        <Top>
          <HeadText
            title="Get started with Sidebrief"
            body="How would you like to use your account"
          />
        </Top>
        <Middle>
          <div>
            <InfoOutlinedIcon sx={{ fontSize: 22 }} />
            <p>Learn what the Sidebrief account types mean</p>
          </div>
        </Middle>
        <Bottom>
          <AccountTypeCard
            title="As an individual"
            body="Register your business with ease  lorem ipsum dolor imit"
            // to="/register/user"
            to="/user"
          />
          <AccountTypeCard
            title="As a Reseller"
            body="Register your business with ease  lorem ipsum dolor imit"
            // to="/register/reseller"
            to="/reseller"
          />
          <AccountTypeCard
            title="As a Partner"
            body="Register your business with ease  lorem ipsum dolor imit"
            // to="/register/partner"
            to="/partner"
          />
        </Bottom>
      </AccountTypeBody>
      <AccountFooter>
        <TextsWithLink
          text={[
            {
              text: "Already have an account? ",
              link: { text: "Sign Up", to: "/account-type" },
            },
          ]}
        />
      </AccountFooter>
    </AccountTypeCont>
  );
};

export default AccountType;

const AccountTypeCont = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 3rem;
  padding: 1.5rem 5% 4rem;
`;

const AccountTypeHead = styled.div`
  width: 380px;
  @media screen and (max-width: 550px) {
    margin: 0 auto;
  }
`;

const AccountTypeBody = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  gap: 4rem;
  @media screen and (max-width: 550px) {
    align-items: flex-start;
    margin: 0 auto;
  }
`;

const Top = styled.div``;

const Middle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  div {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    font-size: clamp(14px, 1.5vw, 16px);
    background-color: var(--PrimaryBlue);
    color: var(--SecondaryBlue);
    gap: 0.5rem;
    border-radius: 1rem;
    padding: 1rem;
    @media screen and (max-width: 550px) {
      width: 100%;
    }
  }
  @media screen and (max-width: 550px) {
    justify-content: flex-start;
  }
`;
const Bottom = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  gap: 5%;
  @media screen and (max-width: 550px) {
    flex-flow: column;
    gap: 1rem;
    justify-content: flex-start;
  }
`;
const AccountFooter = styled.div`
  width: 380px;
  @media screen and (max-width: 550px) {
    margin: 0 auto;
  }
  display: none;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  font-size: var(--SFontsize) - 4px;
  span {
    color: var(--SecondaryBlue);
  }
  @media screen and (max-width: 550px) {
    display: flex;
    width: 380px;
    @media screen and (max-width: 550px) {
      margin: 0 auto;
    }
  }
`;
