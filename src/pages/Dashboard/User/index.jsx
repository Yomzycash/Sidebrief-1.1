import React from "react";
import styled from "styled-components";
import Navbar from "components/navbar";
import Sidebar from "../../../components/sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import MobileNavbar from "components/navbar/MobileNavbar";

const UserDashboard = () => {
  const layoutInfo = useSelector((store) => store.LayoutInfo);
  const { sidebarWidth } = layoutInfo;

  const location = useLocation();

  let hideSearch = location.pathname.includes("/dashboard/rewards");

  return (
    <Dashboard>
      <Navbar
        dashboard
        imgStyles={{ maxWidth: "100px" }}
        style={{ padding: "12px 24px" }}
        hideSearch={hideSearch}
      />
      <MobileNavbar />
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
