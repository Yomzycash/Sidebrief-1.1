import React from "react";
import styled from "styled-components";
import SidebriefLogo1 from "../assets/SidebriefLogo1.png";

const LogoNav = () => {
  return (
    <NavBarCont>
      <img src={SidebriefLogo1} alt="Sidebrief logo" />
    </NavBarCont>
  );
};

export default LogoNav;

const NavBarCont = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  width: 100%;
  img {
    min-width: 84px;
    width: 13%;
    max-width: 134px;
  }
`;
