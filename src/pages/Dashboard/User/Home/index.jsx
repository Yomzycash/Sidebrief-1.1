import React from "react";
import styled from "styled-components";
import Navbar from "components/navbar";
import Sidebar from "../../../../components/sidebar";
import { Outlet } from "react-router-dom";
import TabNavBar from "components/TabNavBar/TabNavBar";

const UserDashboard = () => {
  return (
    <Dashboard>
      <Navbar dashboard />
      <Body>
        <BodyLeft>
          <Sidebar />
        </BodyLeft>
        <BodyRight>
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
  width: 100%;
`;
