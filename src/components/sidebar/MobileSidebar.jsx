import React, { useState } from "react";
import {
  Logout,
  LogoutText,
  LogoutWrapper,
  MobileSidebarWrapper,
  SidebarContentItemIcon,
  SidebarContentItemLink,
  SidebarLinks,
  SideLinkWrapper,
  Top,
} from "./styled";
import { HiOutlineLogout } from "react-icons/hi";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { MdClear } from "react-icons/md";
import { handleLogout as logout } from "utils/globalFunctions";
import SidebarItem from "./SidebarItem";

const MobileSidebar = ({ items, toggleDrawer }) => {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const handleLogout = () => {
    toggleDrawer(false);
    logout(navigate);
  };

  const handleNavigate = (path) => {
    toggleDrawer(false);
    navigate(path);
  };

  let homePath = pathname === "/staff-dashboard" || pathname === "/dashboard" ? true : false;

  return (
    <MobileSidebarWrapper>
      <Top>
        <MdClear
          size={25}
          style={{
            marginBottom: "18px",
            left: "10px",
            position: "relative",
          }}
          onClick={() => toggleDrawer(false)}
        />

        <SidebarLinks>
          {items?.map((item, index) => (
            <SidebarItem
              key={index}
              item={item}
              expanded={true}
              homePath={homePath}
              onClick={handleNavigate}
            />
          ))}
        </SidebarLinks>
      </Top>

      <Logout>
        <LogoutWrapper onClick={handleLogout}>
          <HiOutlineLogout color="#ed4e3a" size={20} />
          <LogoutText onClick={handleLogout}>Logout</LogoutText>
        </LogoutWrapper>
      </Logout>
    </MobileSidebarWrapper>
  );
};

export default MobileSidebar;
