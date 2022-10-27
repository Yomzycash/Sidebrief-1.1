import React from "react";
import styled from "styled-components";
import Navbar from "components/navbar";
import { useSelector } from "react-redux";
import BusinessRegistration from "./Dashboard/User/Home/BusinessRegistration";
import Sidebar from "components/sidebar";
import MobileNavbar from "components/navbar/MobileNavbar";

const Home = () => {
  const layoutInfo = useSelector((store) => store.LayoutInfo);
  const { sidebarWidth } = layoutInfo;

  return (
    <Dashboard>
      <MobileNavbar />
      <Navbar dashboard />
      <Body>
        <BodyLeft>
          <Sidebar />
        </BodyLeft>
        <BodyRight SidebarWidth={sidebarWidth}>
          <BusinessRegistration />
        </BodyRight>
      </Body>
    </Dashboard>
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
  /* @media screen and (max-width: 1050px) {
    width: 100%;
  } */
`;
