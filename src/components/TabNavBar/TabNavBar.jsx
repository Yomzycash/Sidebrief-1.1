import React, { useEffect, useState } from "react";
import { NavWrapper, NavLinkWrapper, ContentWrapper } from "./styled.js";
import { NavbarLink } from "utils/config";
import { NavLink } from "react-router-dom";

const TabNavBar = () => {
  // const [boxshadow, setBoxShadow] = useState("false");

  // useEffect(() => {
  //   window.addEventListener("scroll", () => {
  //     setBoxShadow(window.pageYOffset > 0 ? "true" : "false");
  //   });
  // }, []);

  return (
    <NavWrapper boxshadow={false}>
      <ContentWrapper>
        {NavbarLink.map((item, index) => (
          <NavLinkWrapper to={item.path} key={index}>
            <NavLink to={item.path} style={({ isActive }) => (isActive ? ActiveStyle : {})}>
              {item.title}
            </NavLink>
          </NavLinkWrapper>
        ))}
      </ContentWrapper>
    </NavWrapper>
  );
};

export default TabNavBar;

const ActiveStyle = {
  backgroundColor: "#00a2d419",
  color: "#00a2d4",
};
