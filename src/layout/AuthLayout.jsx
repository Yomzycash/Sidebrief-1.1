import React from "react";
import styled from "styled-components";
import Illustration from "../asset/images/Register_illustration.png";
import { ReactComponent as SmallLogo } from "asset/svg/smallLogo.svg";
import { Link } from "react-router-dom";
import { LogoNav } from "components/navbar";

import SidebriefLogo1 from "../asset/images/SidebriefLogo.png";

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
        <LogoContainer>
          <img
            src={SidebriefLogo1}
            alt="Sidebrief logo"
            style={{ justifyContent: "center", alignItems: "center" }}
            // img_maxwidth={img_maxwidth}
            // img_minwidth={img_minwidth}
            // imgwidth={imgwidth}
          />
        </LogoContainer>
        <div>{children}</div>
      </LayoutRight>
    </Layout>
  );
};

export default AuthLayout;

const Layout = styled.div`
  display: flex;
  flex-flow: row nowrap;
  background-color: #f9fafb;
  /* height: 110vh; */
`;

const LayoutLeft = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100vh;
  display: none;
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
  flex-flow: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
  height: 100%;
  /* margin: 0 1.3rem; */
  > div {
    width: clamp(566px, 30%, 100%);
    /* max-width: 566px; */
    margin: 1rem auto 63px;
    padding: 10px;
    @media screen and (max-width: ${(props) => "1000px" || props.hideLeftAt}) {
      width: 90%;
    }
  }
`;

const LeftDetails = styled.div`
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

const LogoContainer = styled.div`
  justify-content: center;
  align-items: center;
  padding: 0 auto;
  display: flex;
`;
