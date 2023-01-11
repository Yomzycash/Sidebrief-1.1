import React from "react";
import styled from "styled-components";
import Illustration from "../asset/images/Register_illustration.png";
import { ReactComponent as SmallLogo } from "asset/svg/smallLogo.svg";
import { Link } from "react-router-dom";

const AuthLayout = ({ children, hideLeftAt, linkText, link, question }) => {
  return (
    <Layout>
      <LayoutLeft>
        <LayoutLeftContent hideLeftAt={hideLeftAt}>
          <LeftDetails>
            <SmallLogo />
            <CreateText>
              Create an account to start, manage or scale your business
            </CreateText>
            <LinkText>
              <Question>{question}</Question>
              <Link
                to={link}
                style={{
                  textDecoration: "none",
                }}
              >
                <SpanText>{linkText}</SpanText>
              </Link>
            </LinkText>
          </LeftDetails>
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
  background-color: #fcfcfc;
  height: 100%;
`;

const LayoutLeft = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 50%;
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
`;

const LayoutRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 50%;
  /* margin: 0 1.3rem; */
  > div {
    width: clamp(570px, 52%, 100%);
    margin: 2rem auto 63px;
    @media screen and (max-width: ${(props) => "1000px" || props.hideLeftAt}) {
      width: 90%;
    }
  }
`;

const LeftDetails = styled.p`
  display: flex;
  flex-flow: column nowrap;
  gap: 48px;
`;

const LinkText = styled.div`
  display: flex;
  flex-flow: row;
  gap: 8px;
`;

const CreateText = styled.p`
  font-size: 18px;
  color: #4e5152;
  font-weight: 400;
  width: 80%;
`;
const Question = styled.p`
  font-size: 16px;
  color: #4e5152;
  font-weight: 400;
`;
const SpanText = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #00a2d4;
`;
