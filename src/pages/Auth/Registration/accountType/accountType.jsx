import React from "react";
import { AccountTypeCard } from "../../../../components/cards";
import { HeadText } from "../../../../components/texts";
import styled from "styled-components";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Navbar from "../../../../components/navbar";
import TextsWithLink from "components/texts/TextWithLinks";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

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
    </AccountTypeMain>
  );
};

export default AccountType;

const AccountTypeMain = styled.div`
  @media screen and (max-width: 630px) {
    max-width: 90%;
    margin: auto;
  }
`;

const AccountTypeCont = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 3rem;
  align-self: "center";
  padding: clamp(16px, 5%, 58px);
`;

const AccountTypeBody = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  gap: 4rem;
  width: 100%;
  @media screen and (max-width: 630px) {
    align-items: flex-start;
  }
`;

const Top = styled.div`
  @media screen and (max-width: 630px) {
    div {
      align-items: flex-start;
    }
  }
`;

const Middle = styled(motion.div)`
  display: flex;
  justify-content: center;
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
    @media screen and (max-width: 630px) {
      width: 100%;
    }
  }
  @media screen and (max-width: 630px) {
    justify-content: flex-start;
    width: 100%;
  }
`;
const Bottom = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  gap: 5%;
  width: 100%;
  @media screen and (max-width: 630px) {
    flex-flow: column;
    align-items: stretch;
    gap: 1rem;
    justify-content: flex-start;
  }
`;
const AccountFooter = styled.div`
  display: flex;
  margin: 30px 0 20px;
  align-self: center;
  justify-self: center;
  align-items: center;
  padding: 0px auto;
  max-width: 381px;
  @media screen and (max-width: 630px) {
    padding: 0px 0px;
    justify-content: start;
  }
`;
