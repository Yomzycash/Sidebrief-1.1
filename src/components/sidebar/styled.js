import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const SidebarWrapper = styled(motion.div)`
  width: ${(props) => props.width};
  box-sizing: border-box;
  padding: 0px 24px;
  height: 100vh;
  border-right: 1px solid #edf1f7;
`;
export const ListWrapper = styled.div`
  padding: 16px 15px;
`;

export const SidebarContentItem = styled(Link)`
  display: flex;
  padding: 12px 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  text-decoration: none;
  background: ${(props) => props.background};
  :hover {
    cursor: pointer;
  }
`;

export const SidebarContentItemLink = styled.p`
  color: ${(props) => props.color};
  text-decoration: none;
  width: 80%;
`;

export const SidebarContentItemIcon = styled.div`
  width: 20%;
`;

export const LogoutWrapper = styled.div`
  position: absolute;
  bottom: 40px;
  width: 100%;
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
