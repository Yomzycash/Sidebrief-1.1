import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import React from "react";
import { Outlet } from "react-router-dom";
import { Body, BodyLeft, BodyRight, Container } from "./styled";

const RewardsPage = () => {
  return (
    <Container>
      <Navbar rewards />
      <Body>
        <BodyLeft>
          <Sidebar />
        </BodyLeft>
        <BodyRight>
          <Outlet />
        </BodyRight>
      </Body>
    </Container>
  );
};

export default RewardsPage;
