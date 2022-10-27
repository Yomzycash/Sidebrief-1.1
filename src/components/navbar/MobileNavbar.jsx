import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as MenuIcon } from "asset/Icons/MenuIcon.svg";
import { ReactComponent as ArrowDownIcon } from "asset/Icons/ArrowDownIcon.svg";
import { ReactComponent as NotificationIcon } from "asset/Icons/NotificationIcon.svg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Box, Dialog, Drawer, List } from "@mui/material";
import Sidebar from "components/sidebar";
import MobileSidebar from "components/sidebar/MobileSidebar";

const MobileNavbar = ({ hideNav }) => {
  const location = useLocation();

  let path = location.pathname;
  let current = path.slice(path.lastIndexOf("/") + 1, path.length);

  const [selected, setSelected] = useState(current);
  const [showServices, setShowServices] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  const navigate = useNavigate();

  const services = [
    {
      title: "Registration",
      path: "/dashboard/business-registration",
    },
    {
      title: "Compliance",
      path: "/dashboard/compliance",
    },
    {
      title: "Taxes",
      path: "/dashboard/taxes",
    },
    {
      title: "Hiring & Payroll",
      path: "/dashboard/hiring-and-payroll",
    },
    {
      title: "Intellectual Assets",
      path: "/dashboard/intellectualAssets",
    },
  ];

  const handleService = (service) => {
    navigate(service.path);
    setSelected(service.title);
    setShowServices(false);
  };

  useEffect(() => {
    if (showServices) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style.overflow = "auto";
    }
  }, [showServices]);

  const toggleDrawer = (open) => {
    // if (
    //   event.type === "keydown" &&
    //   (event.key === "Tab" || event.key === "Shift")
    // ) {
    //   return;
    // }
    setOpenSidebar(open);
  };

  useEffect(() => {
    if (current === "business-registration")
      setSelected("Business Registration");
    else if (current === "hiring-and-payroll") setSelected("Hiring & Payroll");
    else if (current === "intellectualAssets")
      setSelected("Intellectual Assets");
    else setSelected(current);
    console.log(current);
  }, [current]);

  return (
    <MobileNavContainer $hideNav={hideNav}>
      <MenuIcon onClick={() => setOpenSidebar(true)} />
      <React.Fragment key="left">
        <Drawer
          anchor="left"
          open={openSidebar}
          onClose={() => toggleDrawer(false)}
        >
          <Box
            sx={{ height: "100%", padding: "40px 24px 0" }}
            role="presentation"
          >
            <List sx={{ height: "100%" }}>
              <MobileSidebar toggleDrawer={toggleDrawer} />
            </List>
          </Box>
        </Drawer>
      </React.Fragment>
      {/* </Dialog> */}
      <Select>
        <span onClick={() => setShowServices(!showServices)}>
          {selected}
          <ArrowWrapper>
            <ArrowDownIcon />
          </ArrowWrapper>
        </span>
        {showServices && (
          <NavListWrapper onClick={() => setShowServices(false)}>
            <NavList neme="services" tabIndex={0}>
              {services.map((service, index) => (
                <NavLink
                  key={index}
                  to={service.path}
                  onMouseDown={() => handleService(service)}
                  style={{
                    borderBottom:
                      index !== services.length - 1 && "1px solid #EDF1F7",
                  }}
                >
                  {service.title}
                </NavLink>
              ))}
            </NavList>
          </NavListWrapper>
        )}
      </Select>
      <NotificationIcon />
    </MobileNavContainer>
  );
};

export default MobileNavbar;

export const MobileNavContainer = styled.div`
  position: sticky;
  top: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  color: #242627;
  font-size: 14px;
  font-weight: 500;
  padding: 30px 24px 20px 24px;
  border-bottom: 1px solid #edf1f7;
  background-color: white;

  box-shadow: 0px 4px 4px #95969714;
  z-index: 3;

  @media screen and (min-width: 701px) {
    display: none;
  }

  @media screen and (max-width: 700px) {
    display: ${({ $hideNav }) => $hideNav && "none"};
  }
`;

export const Select = styled.div`
  display: flex;
  gap: 6px;

  span {
    display: flex;
    align-items: center;
    cursor: pointer;
    text-transform: capitalize;
  }
`;

export const NavListWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  padding-top: 83px;
  background-color: #24262766;
  z-index: 6;
`;

export const NavList = styled.div`
  text-transform: capitalize;
  border: none;
  outline: none;
  width: max-content;
  height: max-content;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 5px 4px #c3c3c36b;

  white-space: nowrap;

  a {
    display: flex;
    justify-content: center;
    padding: 16px 19px;
    text-decoration: none;
    color: inherit;
  }
`;

export const ArrowWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  position: relative;
  top: 1px;
`;
