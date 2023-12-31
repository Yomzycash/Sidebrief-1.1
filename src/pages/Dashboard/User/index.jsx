import React from "react";
import styled from "styled-components";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import MobileNavbar from "components/navbar/MobileNavbar";
import { userSidebarItems } from "utils/config";

const UserDashboardLayout = () => {
  const layoutInfo = useSelector((store) => store.LayoutInfo);
  const { sidebarWidth } = layoutInfo;

  const location = useLocation();

  let hideSearch = location.pathname.includes("/dashboard/rewards");

  let hideMobileNav =
    location.pathname.includes("/dashboard/rewards") && location.pathname.length > 31;

  let path =
    location.pathname.includes("/dashboard/my-products") || location.pathname.includes("rewards");

  return (
    <Dashboard>
      <Navbar
        dashboard
        imgStyles={{ maxWidth: "100px" }}
        style={{ padding: "12px 24px" }}
        hideSearch={hideSearch}
      />
      {!path && <MobileNavbar hideNav={hideMobileNav} items={userSidebarItems} />}
      <Body>
        <BodyLeft>
          <Sidebar items={userSidebarItems} />
        </BodyLeft>
        <BodyRight SidebarWidth={sidebarWidth}>
          <Outlet />
        </BodyRight>
      </Body>
    </Dashboard>
  );
};

export default UserDashboardLayout;

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

  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;
