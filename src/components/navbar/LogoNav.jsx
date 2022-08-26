import { motion } from "framer-motion";
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import SidebriefLogo1 from "../../asset/images/SidebriefLogo.png";

const LogoNav = ({
  justify,
  contwidth,
  imgwidth,
  imgminWidth,
  imgMaxwidth,
  stick,
  navSticked,
}) => {
  return (
    <NavBarCont
      justify={justify}
      contwidth={contwidth}
      width={imgwidth}
      imgminWidth={imgminWidth}
      imgMaxwidth={imgMaxwidth}
      stick={stick}
      navSticked={navSticked}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NavLink to="/">
        <img src={SidebriefLogo1} alt="Sidebrief logo" />
      </NavLink>
    </NavBarCont>
  );
};

export default LogoNav;

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
    props.navSticked === true ? "0px 10px 15px -5px #9596971a" : ""};
  img {
    min-width: ${(props) => props.imgminWidth || "94px"};
    width: ${(props) => props.imgwidth || "16vw"};
    max-width: ${(props) => props.imgMaxwidth || "134px"};
  }
`;
