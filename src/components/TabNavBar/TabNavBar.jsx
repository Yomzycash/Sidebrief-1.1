import React, { useEffect, useState } from "react";
import { NavWrapper, NavLinkWrapper, ContentWrapper } from "./styled.js";
import { NavbarLink, NavMore } from "utils/config";
import styled from "styled-components";
import { IoChevronDown } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const TabNavBar = ({ icon }) => {
  const [boxshadow, setBoxShadow] = useState("false");

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setBoxShadow(window.pageYOffset > 0 ? "true" : "false");
    });
  }, []);

  const ActiveStyle = {
    backgroundColor: "#00a2d419",
    color: "#00a2d4",
  };

  return (
    <NavWrapper boxshadow={boxshadow}>
      <ContentWrapper>
        {NavbarLink.map((item, index) => (
          <NavLinkWrapper to={item.path} key={index}>
            <NavLink
              to={item.path}
              style={({ isActive }) => (isActive ? ActiveStyle : {})}
            >
              {item.title}
            </NavLink>
          </NavLinkWrapper>
        ))}
        <More>
          More
          <IoChevronDown size={15} />
          <MoreContent>
            {NavMore.map((item, index) => (
              <NavLinkWrapper to={item.path} key={index}>
                <NavLink
                  to={item.path}
                  style={({ isActive }) => (isActive ? ActiveStyle : {})}
                >
                  {item.title}
                </NavLink>
              </NavLinkWrapper>
            ))}
          </MoreContent>
        </More>
      </ContentWrapper>
    </NavWrapper>
  );
};

export default TabNavBar;
const More = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 12px;
  &:hover {
    > div {
      display: flex;
    }
  }
`;
const MoreContent = styled.div`
  position: absolute;
  left: -18px;
  top: 15px;
  display: none;
  flex-flow: column;
  background-color: #ffffff;
  box-shadow: 0 0 5px #bfbfbf8d;
  border-radius: 8px;
  padding: 5px 10px;
  /* &::before {
    content: "";
    width: 15px;
    height: 15px;
    border-bottom: 1px solid black;
    position: absolute;
    top: -15px;
    left: 25px;
    box-shadow: 0 0 5px #bfbfbf8d;
    background-color: #ffffff;
  } */
`;
