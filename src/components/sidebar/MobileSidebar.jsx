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

const MobileSidebar = ({ items, toggleDrawer }) => {
  const [iconHovered, setIconHovered] = useState(0);

  const location = useLocation();
  const locationPath = location.pathname;

  const navigate = useNavigate();

  const ActiveStyle = {
    background: "#00a2d419",
    color: "#00a2d4",
  };

  const handleLogout = () => {
    toggleDrawer(false);
    logout(navigate);
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
          style={{
            marginBottom: "28px",
            left: "10px",
            position: "relative",
          }}
          onClick={() => toggleDrawer(false)}
        />

        <SidebarLinks>
          {items.map((item, index) => (
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
