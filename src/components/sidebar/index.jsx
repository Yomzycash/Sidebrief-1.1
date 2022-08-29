import React, { useState } from "react";
import { sidebarLink } from "utils/config";
import {
  ListWrapper,
  LogoutText,
  LogoutWrapper,
  SidebarContentItem,
  SidebarContentItemIcon,
  SidebarContentItemLink,
  SidebarWrapper,
} from "./styled";
import { HiMenu } from "react-icons/hi";
import { HiOutlineLogout } from "react-icons/hi";

const Sidebar = () => {
  const [active, setActive] = useState(0);
  const [expanded, setExpaned] = useState(true);

  const sidebarVariants = {
    true: {
      width: "236px",
    },
    false: {
      width: "0px",
    },
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
        <SidebarContentItem
          to={item.path}
          background={active === index ? "rgba(0, 162, 212, 0.1)" : "white"}
          key={index}
          onClick={() => setActive(index)}
        >
          <SidebarContentItemIcon>
            <item.icon
              color={active === index ? "#00A2D4" : "black"}
              size={20}
            />
          </SidebarContentItemIcon>
          <SidebarContentItemLink
            color={active === index ? "#00A2D4" : "black"}
          >
            {expanded ? item.title : null}
          </SidebarContentItemLink>
        </SidebarContentItem>
      ))}

      <LogoutWrapper>
        <HiOutlineLogout color="#ed4e3a" size={20} />
        {expanded ? <LogoutText>Logout</LogoutText> : null}
      </LogoutWrapper>
    </SidebarWrapper>
  );
};

export default Sidebar;
