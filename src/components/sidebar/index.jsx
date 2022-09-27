import React, { useEffect, useState } from "react";
import { sidebarLink } from "utils/config";
import {
  ListWrapper,
  LogoutText,
  LogoutWrapper,
  SidebarContentItem,
  SidebarContentItemIcon,
  SidebarContentItemLink,
  SidebarWrapper,
  SideLinkWrapper,
} from "./styled";
import { HiMenu } from "react-icons/hi";
import { HiOutlineLogout } from "react-icons/hi";
import { store } from "redux/Store";
import { setSidebarWidth } from "redux/Slices";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  // const [active, setActive] = useState(0);
  const [expanded, setExpaned] = useState(true);

  const sidebarVariants = {
    true: {
      width: "236px",
    },
    false: {
      width: "0px",
    },
  };

  useEffect(() => {
    store.dispatch(
      setSidebarWidth(expanded ? sidebarVariants.true.width : "100px")
    );
  }, [expanded]);

  const ActiveStyle = {
    background: "rgba(0, 162, 212, 0.1)",
    color: "#00a2d4",
  };

  return (
    <SidebarWrapper
      width="100px"
      variants={sidebarVariants}
      animate={expanded ? `${expanded}` : ""}
    >
      <ListWrapper onClick={() => setExpaned(!expanded)}>
        <HiMenu color="#00A2D4" size={24} />
      </ListWrapper>
      {sidebarLink.map((item, index) => (
        <SideLinkWrapper key={index}>
          <NavLink
            to={item.path}
            style={({ isActive }) => (isActive ? ActiveStyle : {})}
            // background={active === index ? "rgba(0, 162, 212, 0.1)" : "white"}

            // onClick={() => setActive(index)}
          >
            <SidebarContentItemIcon>
              <item.icon
                // color={active === index ? "#00A2D4" : "black"}
                size={20}
              />
            </SidebarContentItemIcon>
            <SidebarContentItemLink
            // color={active === index ? "#00A2D4" : "black"}
            >
              {expanded ? item.title : null}
            </SidebarContentItemLink>
          </NavLink>
        </SideLinkWrapper>
      ))}

      <LogoutWrapper>
        <HiOutlineLogout color="#ed4e3a" size={20} />
        {expanded ? <LogoutText>Logout</LogoutText> : null}
      </LogoutWrapper>
    </SidebarWrapper>
  );
};

export default Sidebar;
