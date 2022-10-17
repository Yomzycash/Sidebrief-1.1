import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export const SidebarWrapper = styled(motion.div)`
  position: sticky;
  top: 73px;
  width: ${(props) => props.width};
  box-sizing: border-box;
  padding: 0px 24px;
  height: calc(100vh - 90px);
  border-right: 1px solid #edf1f7;

  @media screen and (max-width: 1050px) {
    display: none;
  }
`;
export const ListWrapper = styled.div`
  padding: 20px 15px;
  margin-bottom: 12px;
  z-index: 15;
`;

export const SidebarContentItem = styled(NavLink)`
  display: flex;
  padding: 12px 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  border: none;
  text-decoration: none;
  background: ${(props) => props.background};
  z-index: 15;
  transition: 0.3s background-color ease;
  :hover {
    cursor: pointer;
  }
`;

export const SidebarContentItemLink = styled.p`
  color: ${(props) => props.color};
  text-decoration: none;
  width: 80%;
  white-space: nowrap;
  transition: 0.3s color ease;
`;

export const SidebarContentItemIcon = styled.div`
  width: 20%;
  transition: 0.3s color ease;
`;

export const LogoutWrapper = styled.div`
  margin-top: 200px;
  margin-left: 15px;
  display: flex;
  :hover {
    cursor: pointer;
  }
`;

export const LogoutText = styled.div`
  color: #ed4e3a;
  margin-left: 8px;
`;

export const SideLinkWrapper = styled.div`
  > a {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: 0.2s all ease;
    height: max-content;

    padding: 12px 16px;
    margin-bottom: 16px;
    border-radius: 8px;

    color: #242627;
    white-space: nowrap;
    border: none;
  }
  :hover {
    > a {
      background: rgba(0, 162, 212, 0.1);
      color: #00a2d4;
    }
  }
`;
