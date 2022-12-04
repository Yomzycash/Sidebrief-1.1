import RewardHeaderDetail from "components/Header/RewardHeaderDetail";
import Navbar from "components/navbar";
import StaffSidebar from "components/sidebar/StaffSidebar";
import StaffRewardDetails from "components/staffRewardDetails";
import React from "react";
import { Body, Container } from "./style";

const StaffRewardDetailsPage = () => {
  return (
    <Container>
      <Body>
        <StaffRewardDetails />
      </Body>
    </Container>
  );
};

export default StaffRewardDetailsPage;
