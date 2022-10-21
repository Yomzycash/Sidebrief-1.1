import { BusinessesChartCard } from "components/cards";
import AnalyticsChart from "components/cards/businessesChart/analyticsChart";
import StatusCard from "components/cards/StatusCard/StaffStatusCard";
import { ApplicationTable } from "components/Staff/Tables";
import { MockData } from "components/Staff/Tables/ApplicationTable/constants";
import DashboardSection from "layout/DashboardSection";
import React from "react";
import { StaffContainer, StatusCardContainer } from "./styled";

const StaffDashboard = (props) => {
  const analytics = {
    title: "User Analytics",
    options: ["All time", 1, 2, 3, 4, 5, 6, 7],
    status1: {
      text: "Total Users",
      total: 825,
      color: "rgba(255, 255, 255, 0.4)",
    },
    status2: {
      text: "Registrations",
      total: 450,
      color: "#ffffff",
    },
  };

  return (
    <StaffContainer>
      <h3>Welcome back, Bamidele</h3>
      <StatusCardContainer>
        <StatusCard />
      </StatusCardContainer>
      <DashboardSection>
        <BusinessesChartCard analytics={analytics} staff />
        <AnalyticsChart />
      </DashboardSection>
      <DashboardSection>
        <ApplicationTable data={MockData} />
      </DashboardSection>
    </StaffContainer>
  );
};

export default StaffDashboard;
