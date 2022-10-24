import React from "react";
import styled from "styled-components";
import Illustration from "../asset/images/Register_illustration.png";

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
      <LayoutRight hideLeftAt={hideLeftAt}>
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
  @media screen and (max-width: ${(props) => "1000px" || props.hideLeftAt}) {
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
    max-width: 80%;
    margin-inline: 4% 0;
    max-height: 284px;
  }

  div {
    display: flex;
    margin-top: 100px;
    flex-flow: column nowrap;
    gap: 24px;

    p:nth-of-type(1) {
      font-size: 28px;
      color: white;
      font-weight: 700;
    }

    p:nth-of-type(2) {
      font-size: 18px;
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
  /* margin: 0 1.3rem; */
  > div {
    width: clamp(400px, 52%, 100%);
    margin: 2rem auto 63px;
    @media screen and (max-width: ${(props) => "1000px" || props.hideLeftAt}) {
      width: 90%;
    }
  }
`;
