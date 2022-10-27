import React, { useEffect, useState } from "react";
import { sidebarLink } from "utils/config";
import {
  ListWrapper,
  Logout,
  LogoutText,
  LogoutWrapper,
  MobileSidebarWrapper,
  SidebarContentItem,
  SidebarContentItemIcon,
  SidebarContentItemLink,
  SidebarLinks,
  SidebarWrapper,
  SideLinkWrapper,
  Top,
} from "./styled";
import { HiMenu } from "react-icons/hi";
import { HiOutlineLogout } from "react-icons/hi";
import { store } from "redux/Store";
import { setSidebarWidth } from "redux/Slices";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { MdClear } from "react-icons/md";

const MobileSidebar = ({ toggleDrawer }) => {
  const [iconHovered, setIconHovered] = useState(0);

  const location = useLocation();
  const locationPath = location.pathname;

  const navigate = useNavigate();

  const ActiveStyle = {
    background: "rgba(0, 162, 212, 0.1)",
    color: "#00a2d4",
  };

  const handleLogout = () => {
    localStorage.clear();
    toggleDrawer(false);
    navigate("/login");
  };

  const handleNavigate = (path) => {
    toggleDrawer(false);
    navigate(path);
  };

  return (
    <MobileSidebarWrapper>
      <Top>
        <MdClear
          size={25}
          style={{ marginBottom: "28px", left: "10px", position: "relative" }}
          onClick={() => toggleDrawer(false)}
        />

        <SidebarLinks>
          {sidebarLink.map((item, index) => (
            <SideLinkWrapper key={index}>
              {
                <NavLink
                  to={item.path}
                  style={({ isActive }) => (isActive ? ActiveStyle : {})}
                  onMouseEnter={() => setIconHovered(item.id)}
                  onMouseLeave={() => setIconHovered(0)}
                  onClick={() => handleNavigate(item.path)}
                >
                  <SidebarContentItemIcon>
                    <item.icon
                      filled={locationPath?.includes(item.path)}
                      hover={iconHovered === item.id}
                    />
                  </SidebarContentItemIcon>
                  <SidebarContentItemLink>{item.title}</SidebarContentItemLink>
                </NavLink>
              }
            </SideLinkWrapper>
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
