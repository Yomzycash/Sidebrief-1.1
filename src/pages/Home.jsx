import React from "react";
import styled from "styled-components";
import Navbar from "components/navbar";
import { useSelector } from "react-redux";
import BusinessRegistration from "./Dashboard/User/Home/BusinessRegistration";
import Sidebar from "components/sidebar";
import MobileNavbar from "components/navbar/MobileNavbar";
import { checkStaffEmail } from "utils/globalFunctions";
import StaffLayout from "./Dashboard/staffDashboard/layout";
import StaffDashboard from "./Dashboard/staffDashboard";

const Home = () => {
  const layoutInfo = useSelector((store) => store.LayoutInfo);
  const { sidebarWidth } = layoutInfo;

  let userEmail = localStorage.getItem("userEmail");
  let staffEmail = checkStaffEmail(userEmail);

  return (
    <div>
      {staffEmail ? (
        <StaffLayout>
          <StaffDashboard />
        </StaffLayout>
      ) : (
        <Dashboard>
          <MobileNavbar />
          <Navbar
            dashboard
            imgStyles={{ maxWidth: "100px" }}
            style={{ padding: "12px 24px" }}
          />
          <Body>
            <BodyLeft>
              <Sidebar />
            </BodyLeft>
            <BodyRight SidebarWidth={sidebarWidth}>
              <BusinessRegistration />
            </BodyRight>
          </Body>
        </Dashboard>
      )}
    </div>
  );
};
export default Home;

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
  /* max-width: 1200px; */

  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;
