import React, { useEffect, useRef, useState } from "react";
import { AccountTypeCard } from "../../../../components/cards";
import { HeadText } from "../../../../components/texts";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Navbar, { LogoNav } from "../../../../components/navbar";
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
import { TestBlock } from "../userRegistration/styles";

const AccountType = () => {
  const [navSticked, setNavSticked] = useState("");

  const location = useLocation();

  const TestRef = useRef();

  useEffect(() => {
    var observer = new IntersectionObserver((e) => {
      if (e[0].intersectionRatio === 0) {
        setNavSticked("true");
      } else if (e[0].intersectionRatio === 1) {
        setNavSticked("");
      }
    });
    if (TestRef.current) {
      observer.observe(TestRef.current);
    } else {
      const mutationObserver = new MutationObserver(() => {
        if (TestRef.current) {
          mutationObserver.disconnect();
          observer.observe(TestRef.current);
        }
        mutationObserver.observe(document, {
          subtree: true,
          childList: true,
        });
      });
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <AccountTypeMain>
      <TestBlock ref={TestRef} id="testdiv" />
      <Navbar />
      <LogoNav
        stick={0}
        nav_sticked={navSticked}
        style={{ padding: "15px clamp(20px, 5vw, 40px)", marginTop: "15px" }}
        $mobile
        $hideSignIn
      />

      <AccountTypeCont>
        <AccountTypeBody>
          <Top>
            <HeadText
              title="Get started with Sidebrief"
              body="How would you like to use your account?"
              titleStyle={{ fontSize: "clamp(20px, 2vw, 28px)" }}
              bodyStyle={{ fontSize: "clamp(14px, 1.4vw, 20px)" }}
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
                link: { text: "Sign in", to: "/login" },
              },
            ]}
            textStyle={{ fontSize: "clamp(14px, 1.4vw, 18px)" }}
            linkStyle={{ fontSize: "clamp(14px, 1.4vw, 18px)" }}
          />
        </AccountFooter>
      </AccountTypeCont>
      {/* <AppFeedback subProject="Account type" /> */}
    </AccountTypeMain>
  );
};

export default AccountType;
