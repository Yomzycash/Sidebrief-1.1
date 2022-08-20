import React from "react";
import styled from "styled-components";
import Illustration from "./assets/Register_illustration.png";

const AuthLayout = ({ children, hideLeftAt }) => {
  return (
    <Layout>
      <LayoutLeft>
        <LayoutLeftContent hideLeftAt={hideLeftAt}>
          <img src={Illustration} alt="" />
          <div>
            <p>Register and scale your business</p>
            <p>
              The fastest way for anyone to launch and manage a business from
              anywhere.
            </p>
          </div>
        </LayoutLeftContent>
      </LayoutLeft>
      <LayoutRight>
        <div>{children}</div>
      </LayoutRight>
    </Layout>
  );
};

export default AuthLayout;

const Layout = styled.div`
  display: flex;
  flex-flow: row nowrap;
  background-color: white;
  height: 100%;
`;

const LayoutLeft = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--SecondaryBlue);
  width: 40%;
  height: 100vh;
  @media screen and (max-width: ${(props) => "700px" || props.hideLeftAt}) {
    display: none;
  }
`;

const LayoutLeftContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-start;
  width: 80%;
  height: 90%;
  padding-bottom: 4rem;
  img {
    max-width: 70%;
    margin: 0 8%;
    max-height: 284px;
  }
  div {
    display: flex;
    flex-flow: column nowrap;
    gap: 2rem;
    p:nth-of-type(1) {
      font-size: clamp(30px, 3vw, 36px);
      color: white;
      font-weight: 700;
    }
    p:nth-of-type(2) {
      font-size: clamp(14px, 1vw, 20px);
      color: var(--TextGrey);
      font-weight: 400;
    }
  }
`;

const LayoutRight = styled.div`
  display: flex;
  align-items: flex-start;
  flex: 1;
  width: 60%;
  margin: 0 1.3rem;
  > div {
    margin: 2rem auto;
  }
`;
