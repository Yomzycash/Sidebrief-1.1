import React from "react";
import { AccountTypeCard } from "../../../components/cards";
import { NavBar } from "../../../components/navbar";
import { PrimaryText } from "../../../components/texts";
import styled from "styled-components";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const AccountType = () => {
  return (
    <AccountTypeCont>
      <AccountTypeHead>
        <NavBar />
      </AccountTypeHead>
      <AccountTypeBody>
        <Top>
          <PrimaryText
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
            to="/register/user"
          />
          <AccountTypeCard
            title="As a Reseller"
            body="Register your business with ease  lorem ipsum dolor imit"
            to="/register/reseller"
          />
          <AccountTypeCard
            title="As a Partner"
            body="Register your business with ease  lorem ipsum dolor imit"
            to="/register/partner"
          />
        </Bottom>
      </AccountTypeBody>
      <AccountFooter>
        <p>
          Already have an account? <span>Sign In</span>
        </p>
      </AccountFooter>
    </AccountTypeCont>
  );
};

export default AccountType;

const AccountTypeCont = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 4rem;
  padding: 2.5rem 5%;
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
    font-size: clamp(14px, 2vw, 16px);
    background-color: var(--PrimaryBlue);
    color: var(--SecondaryBlue);
    gap: 0.5rem;
    max-width: 380px;
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
  }
`;
