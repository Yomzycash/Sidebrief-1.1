import React from "react";
import BusinessesChartCard from "components/cards/businessesChart";
import styled from "styled-components";
import Navbar from "components/navbar";
import Sidebar from "../../../components/sidebar";
import TabNavBar from "components/TabNavBar/TabNavBar";
import { LongCard } from "components/cards";
import DashboardSection from "layout/DashboardSection";

const UserDashboard = () => {
  return (
    <Dashboard>
      <Navbar dashboard />
      <Body>
        <BodyLeft>
          <Sidebar />
        </BodyLeft>
        <BodyRight>
          <RightTop>
            <TabNavBar />
          </RightTop>
          <RightBody>
            <Title>
              <p>Welcome back, Ayomide</p>
            </Title>
            <Main>
              <DashboardSection>
                <LongCard
                  title="Launch"
                  body="Start your business registration process with no paperwork"
                />
                <LongCard
                  title="Shelf"
                  body="Get pre-registered company in local markets"
                />
              </DashboardSection>
            </Main>
          </RightBody>
          <BusinessesChartCard completed={5} pending={3} awaiting={1} />
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
const BodyRight = styled.div``;
const RightTop = styled.div``;
const Title = styled.div``;
const RightBody = styled.div``;
const Main = styled.div``;
