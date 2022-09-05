import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

export const NavWrapper = styled.nav`
  position: sticky;
  top: 73px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid #edf1f6;
  background-color: white;
  z-index: 6;
  box-shadow: ${(props) =>
    props.boxshadow === "true" ? "0px 10px 15px -5px #9596971a" : ""};
`;
export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  gap: 18px;
  margin: 7px clamp(15px, 5vw, 28px);
  max-width: 820px;
`;
export const NavLinkWrapper = styled(Link)`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: 7px 10px;
  transition: 0.3s all ease;
  :hover {
    cursor: pointer;
    background: rgba(0, 162, 212, 0.1);
    border-radius: 20px;
    color: #00a2d4;
    > p {
      color: #00a2d4;
    }
  }
`;

export const LinkContent = styled.p`
  position: relative;
  display: flex;
  align-items: center;
  text-decoration: none;
  text-align: center;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  color: #242627;
  white-space: nowrap;
  max-width: max-content;
  transition: 0.3s all ease;
`;
