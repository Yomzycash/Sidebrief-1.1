import { BusinessesChartCard } from "components/cards";
import AnalyticsChart from "components/cards/businessesChart/analyticsChart";
import StatusCard from "components/cards/StatusCard/StatusCard";
import { ApplicationTable } from "components/Tables";
import { MockData } from "components/Tables/ApplicationTable/constants";
import DashboardSection from "layout/DashboardSection";
import React from "react";
import { StaffContainer, StatusCardContainer } from "./styled";

const StaffDashboard = (props) => {
  return (
    <StaffContainer>
      <h3>Welcome back, Bamidele</h3>
      <StatusCardContainer>
        <StatusCard />
      </StatusCardContainer>
      <DashboardSection>
        <BusinessesChartCard completed={5} pending={3} awaiting={1} />
        <AnalyticsChart />
      </DashboardSection>
      <DashboardSection>
        <ApplicationTable data={MockData} />
      </DashboardSection>
    </StaffContainer>
  );
};

export default StaffDashboard;
