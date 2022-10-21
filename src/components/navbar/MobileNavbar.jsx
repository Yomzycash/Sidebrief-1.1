import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as MenuIcon } from "asset/Icons/MenuIcon.svg";
import { ReactComponent as ArrowDownIcon } from "asset/Icons/ArrowDownIcon.svg";
import { ReactComponent as NotificationIcon } from "asset/Icons/NotificationIcon.svg";
import { NavLink, useNavigate } from "react-router-dom";

const MobileNavbar = () => {
  const [selected, setSelected] = useState("Registration");
  const [showServices, setShowServices] = useState(false);

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

  return (
    <MobileNavContainer>
      <MenuIcon />
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

  @media screen and (min-width: 761px) {
    display: none;
  }
`;

export const Select = styled.div`
  display: flex;
  gap: 6px;

  span {
    display: flex;
    align-items: center;
    cursor: pointer;
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
