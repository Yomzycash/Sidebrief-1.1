import React from "react";
import styled from "styled-components";
import Illustration from "./assets/Register_illustration.png";

const RegisterLayout = ({ children }) => {
  return (
    <Layout>
      <LayoutLeft>
        <LayoutLeftContent>
          <img src={Illustration} alt="" />
          <p>Register and scale your business</p>
          <p>
            The fastest way for anyone to launch and manage a business from
            anywhere.
          </p>
        </LayoutLeftContent>
      </LayoutLeft>
      <LayoutRight>
        <div>{children}</div>
      </LayoutRight>
    </Layout>
  );
};

export default RegisterLayout;

const Layout = styled.div`
  display: flex;
  flex-flow: row nowrap;
  height: 100vh;
  background-color: white;
`;

const LayoutLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--SecondaryBlue);
  width: 40%;
  height: 70%;
`;

const LayoutLeftContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 80%;
  height: 80%;
  padding-bottom: 5rem;
  /* margin: 5% 10%; */
  img {
    max-width: 80%;
    max-height: 284px;
  }
  p:nth-of-type(1) {
    font-size: clamp(30px, 4vw, 36px);
    color: white;
    font-weight: 700;
  }
  p:nth-of-type(2) {
    font-size: clamp(18px, 2vw, 20px);
    color: var(--TextGrey);
    font-weight: 400;
  }
`;

const LayoutRight = styled.div`
  display: flex;
  align-items: flex-start;
  flex: 1;
  div {
    width: 80%;
    margin: 3rem auto;
  }
`;
