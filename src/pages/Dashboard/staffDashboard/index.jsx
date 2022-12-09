import { BusinessesChartCard } from "components/cards";
import AnalyticsChart from "components/cards/businessesChart/analyticsChart";
import StatusCard from "components/cards/StatusCard/StaffStatusCard";
import Navbar from "components/navbar";
import MobileNavbar from "components/navbar/MobileNavbar";
import Sidebar from "components/sidebar";
import StaffSidebar from "components/sidebar/StaffSidebar";
import { ApplicationTable } from "components/Staff/Tables";
import { MockData } from "components/Staff/Tables/ApplicationTable/constants";
import DashboardSection from "layout/DashboardSection";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  useGetAllApprovedLaunchesQuery,
  useGetAllSubmittedLaunchesQuery,
  useGetUserSubmittedQuery,
} from "services/launchService";
import styled from "styled-components";
import { StaffContainer, StatusCardContainer } from "./styled";

const StaffDashboard = (props) => {
  const [allApplications, setAllApplications] = useState([]);

  const { data, isLoading, isSuccess } = useGetUserSubmittedQuery();
  const allSubmittedLaunches = useGetAllSubmittedLaunchesQuery();
  const allApprovedLaunches = useGetAllApprovedLaunchesQuery();

  const layoutInfo = useSelector((store) => store.LayoutInfo);
  const { sidebarWidth } = layoutInfo;

  const location = useLocation();

  let hideSearch = location.pathname.includes("/dashboard/rewards");

  let hideMobileNav =
    location.pathname.includes("/dashboard/rewards") &&
    location.pathname.length > 31;

  // Get user data information
  const userInfo = useSelector((store) => store.UserDataReducer.userInfo);
  let firstName_raw = userInfo?.first_name;
  let firstName =
    firstName_raw?.charAt(0)?.toUpperCase() + firstName_raw?.slice(1);
  let newUser = userInfo?.newUser;

  // Get all users submitted launch requests
  useEffect(() => {
    console.log(allSubmittedLaunches?.data);
    setAllApplications(
      allSubmittedLaunches &&
        allSubmittedLaunches?.data?.map((application, index) => {
          return {
            id: index + 1,
            name: "Ismael Hassan",
            type: application.registrationType,
            country: application.registrationCountry,
            status: application.registrationStatus,
            date: application?.createdAt.slice(0, 10),
          };
        })
    );
  }, [allSubmittedLaunches?.data]);

  return (
    <Dashboard>
      <Navbar
        dashboard
        imgStyles={{ maxWidth: "100px" }}
        style={{ padding: "12px 24px" }}
      />
      <MobileNavbar hideNav={hideMobileNav} />
      <Body>
        <BodyLeft>
          <StaffSidebar />
        </BodyLeft>
        <BodyRight SidebarWidth={sidebarWidth}>
          <StaffContainer>
            <DashboardSection
              title={
                newUser
                  ? `Welcome to Sidebrief${firstName ? ", " + firstName : ""}`
                  : `Welcome back${firstName ? ", " + firstName : ""}`
              }
              nowrap
            >
              <StatusCardContainer>
                <StatusCard />
              </StatusCardContainer>
            </DashboardSection>
            <DashboardSection>
              <BusinessesChartCard analytics={analytics} staff />
              <AnalyticsChart />
            </DashboardSection>
            <DashboardSection>
              <ApplicationTable data={allApplications} />
            </DashboardSection>
          </StaffContainer>
        </BodyRight>
      </Body>
    </Dashboard>
  );
};

export default StaffDashboard;

export const Dashboard = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  flex: 1;
`;

export const Body = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

export const BodyLeft = styled.div``;

export const BodyRight = styled.div`
  display: flex;
  flex-flow: column;
  width: calc(100% - ${({ SidebarWidth }) => SidebarWidth});

  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;
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
