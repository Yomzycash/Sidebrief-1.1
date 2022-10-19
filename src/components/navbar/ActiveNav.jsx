import React, { useEffect } from "react";
import { AiTwotoneAlert } from "react-icons/ai";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";

const ActiveNav = ({ text, total, path, handleShown }) => {
  const ActiveStyles = {
    color: "#151717",
    borderBottom: "4px solid #00A2D4",
    borderRadius: 0,
  };

  return (
    <Container>
      <NavLink
        to={path}
        style={({ isActive }) => (isActive ? ActiveStyles : {})}
      >
        <p>{text}</p> <span>{total}</span>
      </NavLink>
    </Container>
  );
};

export default ActiveNav;

export const Container = styled.div`
  display: flex;
  p {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 400;
  }

  span {
    display: flex;
    align-items: center;
    padding: 4px 12px;
    background-color: #00a2d419;
    border-radius: 10px;
    color: #00a2d4;
    font-size: 14px;
    font-weight: 500;
    height: max-content;
  }
  a {
    display: flex;
    gap: 16px;
    align-items: center;
    color: #959697;
    text-decoration: none;
    margin: 0;
    border: none;
    padding: 16px;
  }
`;
const StyledLink = styled(NavLink)``;
