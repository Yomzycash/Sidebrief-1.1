import { TextsWithLink } from "components/texts";
import { motion } from "framer-motion";
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import SidebriefLogo1 from "../../asset/images/SidebriefLogo.png";

const LogoNav = ({
  justify,
  contwidth,
  imgwidth,
  img_minwidth,
  img_maxwidth,
  stick,
  nav_sticked,
  $mobile,
  style,
  $loginPage,
}) => {
  return (
    <NavBarCont
      justify={justify}
      contwidth={contwidth}
      width={imgwidth}
      img_minwidth={img_minwidth}
      img_maxwidth={img_maxwidth}
      stick={stick}
      nav_sticked={nav_sticked}
      key="LogoNav"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      $mobile={$mobile}
      style={{ ...style }}
    >
      <div>
        <NavLink to="/">
          <img
            src={SidebriefLogo1}
            alt="Sidebrief logo"
            img_maxwidth={img_maxwidth}
            img_minwidth={img_minwidth}
            imgwidth={imgwidth}
          />
        </NavLink>
        <Right>
          <TextsWithLink
            text={
              $loginPage
                ? [
                    {
                      text: "Don't have an account? ",
                      link: { text: "Sign up", to: "/register" },
                    },
                  ]
                : [
                    {
                      text: "Already have an account? ",
                      link: { text: "Sign in", to: "/login" },
                    },
                  ]
            }
            textStyle={{ fontSize: "12px" }}
            linkStyle={{ fontSize: "12px" }}
          />
        </Right>
      </div>
    </NavBarCont>
  );
};

export default LogoNav;

// Styles
const NavBarCont = styled(motion.div)`
  position: sticky;
  top: ${(props) => props.stick};
  display: flex;
  flex-flow: row nowrap;
  justify-content: ${(props) => props.justify || "flex-start"};
  width: ${(props) => props.contwidth || "100%"};
  background-color: white;
  padding: 1rem 0;
  z-index: 2;
  box-shadow: ${(props) =>
    props.nav_sticked === "true" ? "0px 10px 15px -5px #9596971a" : ""};

  img {
    min-width: ${(props) => props.img_minwidth || "84px"};
    width: ${(props) => props.imgwidth || "10vw"};
    max-width: ${(props) => props.img_maxwidth || "100px"};
  }

  > div {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    width: 100%;
    text-decoration: none;
  }

  @media screen and (min-width: 631px) {
    display: ${({ $mobile }) => $mobile && "none"};
  }
`;

const Right = styled.div`
  display: ${({ $hideSignIn }) => $hideSignIn && "none"};

  @media screen and (min-width: 1000px) {
    display: none;
  }
`;
