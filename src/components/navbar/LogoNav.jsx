import React from "react";
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
    >
      <img src={SidebriefLogo1} alt="Sidebrief logo" />
    </NavBarCont>
  );
};

export default LogoNav;

const NavBarCont = styled.div`
  position: sticky;
  top: ${(props) => props.stick};
  display: flex;
  flex-flow: row nowrap;
  justify-content: ${(props) => props.justify || "flex-start"};
  width: ${(props) => props.contwidth || "100%"};
  background-color: white;
  padding: 1rem 0;
  box-shadow: ${(props) =>
    props.navSticked === true ? "0px 10px 15px -5px #9596971a" : ""};
  img {
    min-width: ${(props) => props.imgminWidth || "84px"};
    width: ${(props) => props.imgwidth || "24%"};
    max-width: ${(props) => props.imgMaxwidth || "134px"};
  }
`;
