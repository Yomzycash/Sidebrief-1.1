import React from "react";
import { AccountTypeCard } from "../../../../components/cards";
import { HeadText } from "../../../../components/texts";
import styled from "styled-components";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Navbar from "../../../../components/navbar";
import { SecondaryText } from "components/text/text";
import { useNavigate } from "react-router-dom";



const AccountType = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login')
  }
  return (
    <>
        <Navbar />
    <AccountTypeCont>
      <AccountTypeBody>
        <Top>
          <HeadText
            title="Get started with Sidebrief"
            body="How would you like to use your account"
          />
        </Top>
        <Middle>
          <div>
            <AiOutlineInfoCircle />
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
          <SecondaryText>
						Already have an account?{" "}
					</SecondaryText>
					<SecondaryText clickColor cursor left='10px' onClick={handleClick}>
						Sign In
					</SecondaryText>
      </AccountFooter>

    </AccountTypeCont>
    </>
  );
};

export default AccountType;

const AccountTypeCont = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 3rem;
  padding: 3rem 5% 4rem;
`;

// const AccountTypeHead = styled.div`
//   width: 380px;
//   @media screen and (max-width: 550px) {
//     margin: 0 auto;
//   }
// `;

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
  display: flex;
  margin-top: 70px;
  justify-content: center;
  align-items: center;
  padding: 0px auto;
  @media screen and (max-width: 550px) {
  padding: 0px 0px;
  justify-content: start;
  }
`;