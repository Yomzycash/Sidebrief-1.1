import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

export const NavWrapper = styled.nav`
  position: sticky;
  top: 57.1px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid #edf1f6;
  background-color: white;
  z-index: 6;
  box-shadow: ${(props) =>
    props.boxshadow === "true" ? "0px 10px 15px -5px #9596971a" : ""};

  @media screen and (max-width: 760px) {
    display: none;
  }
`;
export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 4px 12px;
  gap: 18px;
  margin: 7px clamp(8px, 5vw, 28px);

  max-width: 820px;
`;
export const NavLinkWrapper = styled.div`
  > a {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    padding: 7px 10px;
    transition: 0.3s all ease;
    border-radius: 20px;
    border: none;
    height: max-content;
    margin: 0;
    font-weight: 500;
    font-size: 12px;
    color: #242627;
    white-space: nowrap;
  }
  :hover {
    > a {
      background: #edf1f6;
    }
  }
`;
