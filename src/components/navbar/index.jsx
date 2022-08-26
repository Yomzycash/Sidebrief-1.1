import React, { useEffect, useState } from "react";
import { Image, NavWrapper } from "./styled";
import LogoNav from "./LogoNav";

import logo from "../../asset/images/SidebriefLogo.png";

const Navbar = () => {
  const [boxShadow, setBoxShadow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setBoxShadow(window.pageYOffset > 0 ? true : false);
    });
  }, []);

  return (
    <>
      <NavWrapper
        boxShadow={boxShadow}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image src={logo} alt="logo" />
      </NavWrapper>
    </>
  );
};

export default Navbar;
export { LogoNav };
