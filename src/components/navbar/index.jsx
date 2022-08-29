import React, { useEffect, useState } from "react";
import {
  Image,
  BellIcon,
  UserIcon,
  DownIcon,
  SearchIcon,
  NavWrapper,
  SearchBar,
  RightIcons,
  BellContainer,
  UserContainer,
  SearchBarWrapper,
  SearchIconWrapper,
} from "./styled";
import LogoNav from "./LogoNav";

import logo from "../../asset/images/SidebriefLogo.png";
import bell from "../../asset/images/bell.png";
import user from "../../asset/images/user.png";
import down from "../../asset/images/down.png";
import search from "../../asset/images/search.png";

const Navbar = ({ dashboard }) => {
  const [boxShadow, setBoxShadow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setBoxShadow(window.pageYOffset > 0 ? true : false);
    });
  }, []);

  return (
    <>
      {dashboard ? (
        <NavWrapper boxShadow={boxShadow} border="1px solid #EDF1F7">
          <Image src={logo} alt="logo" />
          <SearchBarWrapper>
            <SearchIconWrapper>
              <SearchIcon src={search} alt="logo" />
            </SearchIconWrapper>
            <SearchBar placeholder="Search something..." />
          </SearchBarWrapper>
          <RightIcons>
            <BellContainer>
              <BellIcon src={bell} alt="logo" />
            </BellContainer>
            <UserContainer>
              <UserIcon src={user} alt="logo" />
            </UserContainer>

            <DownIcon src={down} alt="logo" />
          </RightIcons>
        </NavWrapper>
      ) : (
        <NavWrapper boxShadow={boxShadow}>
          <Image src={logo} alt="logo" />
        </NavWrapper>
      )}
    </>
  );
};

export default Navbar;
export { LogoNav };
