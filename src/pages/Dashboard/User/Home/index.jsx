import React from "react";
import styled from "styled-components";
import Navbar from "components/navbar";
import Sidebar from "../../../../components/sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const UserDashboard = () => {
  const layoutInfo = useSelector((store) => store.LayoutInfo);
  const { sidebarWidth } = layoutInfo;
  console.log(sidebarWidth);

  return (
    <Dashboard>
      <Navbar dashboard />
      <Body>
        <BodyLeft>
          <Sidebar />
        </BodyLeft>
        <BodyRight SidebarWidth={sidebarWidth}>
          <Outlet />
        </BodyRight>
      </Body>
    </Dashboard>
  );
};

export default UserDashboard;

const Dashboard = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  flex: 1;
`;
const Body = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;
const BodyLeft = styled.div``;
const BodyRight = styled.div`
  display: flex;
  flex-flow: column;
  width: calc(100% - ${({ SidebarWidth }) => SidebarWidth});
  @media screen and (max-width: 1050px) {
    width: 100%;
  }
`;
