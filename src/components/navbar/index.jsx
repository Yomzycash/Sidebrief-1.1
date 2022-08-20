import React from "react";
import { Image, NavWrapper } from "./styled";
import LogoNav from "./LogoNav";

import logo from "../../asset/images/SidebriefLogo.png";

const Navbar = () => {
  return (
    <NavWrapper>
      <Image src={logo} alt="logo" />
    </NavWrapper>
  );
};

export default Navbar;
export { LogoNav };
