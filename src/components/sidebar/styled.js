import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export const Top = styled.div``;

export const SidebarWrapper = styled(motion.div)`
  display: flex;
  flex-flow: column;
  flex: 1;
  gap: 16px;

  position: sticky;
  top: 57.1px;

  font-size: 14px;
  width: ${(props) => props.width};
  box-sizing: border-box;
  padding: 0px 24px;
  height: calc(100vh - 57.1px);
  border-right: 1px solid #edf1f7;
  background-color: white;
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 700px) {
    display: none;
  }
`;
export const ListWrapper = styled.div`
  margin: 20px 15px 22px;
  width: max-content;
  z-index: 15;
  cursor: pointer;

  @media screen and (max-width: 1050px) {
    display: none;
  }
`;

export const SideLinkWrapper = styled.div`
  > a {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: 0.3s all ease;
    height: max-content;

    padding: 12px 16px;
    border-radius: 8px;

    color: #242627;
    white-space: nowrap;
    border: none;
  }

  :hover {
    > a {
      color: #00a2d4;
    }
  }
`;

export const SidebarContentItemLink = styled.p`
  color: ${(props) => props.color};
  text-decoration: none;
  white-space: nowrap;
  margin-top: -3px;
`;

export const SidebarContentItemIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s color ease;
`;

export const Logout = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  flex: 1;
  padding: 40px 16px 60px;
  /* padding: 12px 16px 100px; */
`;

export const LogoutWrapper = styled.div`
  display: flex;

  :hover {
    cursor: pointer;
  }
`;

export const LogoutText = styled.div`
  color: #ed4e3a;
  margin-left: 8px;
`;

export const SidebarLinks = styled.div`
  display: flex;
  flex-flow: column;
  gap: 8px;
  padding-top: 10px;
`;

export const MobileSidebarWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column;
`;
export const SidebarFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;
