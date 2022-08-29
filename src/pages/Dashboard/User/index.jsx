import React from "react";
import BusinessesChartCard from "components/cards/businessesChart";
import styled from "styled-components";

const UserDashboard = () => {
  return (
    <Dashboard>
      <Header>User Dashboard Header</Header>
      <Body>
        <BodyLeft>User Dashboard Left</BodyLeft>
        <BodyRight>
          <RightTop>User Dashboard Right Top</RightTop>
          <RightBody>User Dashboard Right Body</RightBody>
        </BodyRight>
      </Body>
      <BusinessesChartCard completed={5} pending={3} awaiting={1} />
    </Dashboard>
  );
};

export default UserDashboard;

const Dashboard = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
`;
const Header = styled.div`
  display: flex;
  width: 100%;
`;
const Body = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;
const BodyLeft = styled.div``;
const BodyRight = styled.div``;
const RightTop = styled.div``;
const RightBody = styled.div``;
