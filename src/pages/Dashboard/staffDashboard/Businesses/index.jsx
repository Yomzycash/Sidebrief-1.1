import StaffStatusCard from "components/cards/BusinessAddressCard/StaffStatusCard";
import StaffBusinessCard from "components/cards/StaffBusinessCard/StaffBusinessCard";
import Navbar from "components/navbar";
import { BusinessHomeTable } from "components/Staff/Tables";
import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RiArrowDropDownLine } from "react-icons/ri";
import { ReactComponent as AddIcon } from "../../../../../src/asset/svg/Plus.svg";
import StaffSidebar from "components/sidebar/StaffSidebar";
import {
  useGetAllApprovedLaunchesQuery,
  useGetAllCountriesQuery,
  useGetAllSubmittedLaunchesQuery,
  useGetAllTheEntitiesQuery,
} from "services/launchService";
import { useEffect } from "react";
import { useState } from "react";

const StaffBusinesses = (props) => {
  const [countries, setCountries] = useState([]);
  const [entities, setEntities] = useState([]);
  const [submittedLaunches, setSubmittedLaunches] = useState([]);
  const [approvedLaunches, setApprovedLaunches] = useState([]);
  const [completedLaunches, setCompletedLaunches] = useState([]);
  const [businessStatus, setBusinessStatus] = useState([]);

  const allCountries = useGetAllCountriesQuery();
  const allEntities = useGetAllTheEntitiesQuery();
  const allSubmittedLaunches = useGetAllSubmittedLaunchesQuery();
  const allApprovedLaunches = useGetAllApprovedLaunchesQuery();

  const layoutInfo = useSelector((store) => store.LayoutInfo);
  const { sidebarWidth } = layoutInfo;

  const location = useLocation();
  const navigate = useNavigate();

  // Fetch and set all countries and all entities
  useEffect(() => {
    let countries = allCountries?.data;
    let entities = allEntities?.data;

    setCountries(
      countries &&
        countries.map((country) => {
          return {
            text: country.countryName,
            link: "",
            image: `https://countryflagsapi.com/png/${
              country.countryISO.split("-")[0]
            }`,
          };
        })
    );

    setEntities(
      entities &&
        entities.map((entity) => {
          return {
            text: entity.entityName,
            link: "",
          };
        })
    );
  }, [allCountries?.data, allEntities?.data]);

  // Fetch and set all submitted and approved applications
  useEffect(() => {
    let submittedLaunches = allSubmittedLaunches?.data;
    let approvedLauches = allApprovedLaunches?.data;

    setBusinessStatus(
      submittedLaunches &&
        approvedLauches && {
          awaiting: submittedLaunches?.length,
          inProgress: approvedLauches?.length,
          completed: completedLaunches?.length,
        }
    );
    // console.log(countries);
    // console.log(entities);
  }, [allSubmittedLaunches?.data, allApprovedLaunches?.data]);

  return (
    <Dashboard>
      <Navbar
        dashboard
        imgStyles={{ maxWidth: "100px" }}
        style={{ padding: "12px 24px" }}
      />
      <Body>
        <BodyLeft>
          <StaffSidebar />
        </BodyLeft>
        <BodyRight SidebarWidth={sidebarWidth}>
          <LeftContainer>
            <TopContainer>
              <SideWrapper>
                <Heading>Businesses</Heading>
                <LowerText>Jump right back in today</LowerText>
              </SideWrapper>
              <MonthWrapper>
                <TextDropdown>
                  <Text> This Month</Text>
                  <RiArrowDropDownLine />
                </TextDropdown>
              </MonthWrapper>
            </TopContainer>
            <MiddleContainer>
              <TitleWrapper>Business Summary</TitleWrapper>
              <RegistrationBlock>
                <AddIcon color={"#FFFFFF"} />
                <TextContent to="/launch" target="_blank">
                  Start Registration
                </TextContent>
              </RegistrationBlock>
            </MiddleContainer>
            <CardWrapper>
              <StaffStatusCard status={businessStatus} />
            </CardWrapper>
            <Outlet />
          </LeftContainer>
          <RightContainer>
            <StaffBusinessCard
              title="Countries"
              subText="Countries we are currently available in"
              list={countries}
            />
            <StaffBusinessCard
              title="Entities"
              subText="Entities we currently provide our services in"
              list={entities}
            />
          </RightContainer>
        </BodyRight>
      </Body>
    </Dashboard>
  );
};

export default StaffBusinesses;
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
  flex-flow: row;
  width: calc(100% - ${({ SidebarWidth }) => SidebarWidth});
  padding: 0px 0px 0px 40px;
  gap: 40px;
  min-width: 1050px;

  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;
const LeftContainer = styled.div`
  max-height: calc(100vh - 96.96px);
  overflow-y: auto;
  margin-top: 40px;
  width: 100%;

  ::-webkit-scrollbar {
    display: none;
  }
`;
const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  max-width: max-content;
  max-height: calc(100vh - 96.96px);
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`;
const TopContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-block-end: 40px;
`;
const SideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const Heading = styled.h3`
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 0.01em;
  color: #242627;
`;
const LowerText = styled.h4`
  font-weight: 500;
  font-size: 14px;
  line-height: 26px;

  letter-spacing: 0.01em;

  color: #4e5152;
`;
const MonthWrapper = styled.div`
  background: #f8f8f8;
  border-radius: 12px;
  width: 151px;
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const TextDropdown = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 8px;
`;
const Text = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.02em;
  color: #4e5152;
`;
const MiddleContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-block-end: 24px;
`;
const TitleWrapper = styled.h3`
  font-weight: 600;
  font-size: 16px;
  line-height: 30px;
  letter-spacing: 0.01em;
  color: #242627;
`;
const RegistrationBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 24px;
  gap: 8px;
  width: 196px;
  height: 44px;
  background: #00a2d4;
  border-radius: 8px;
`;
const TextContent = styled(Link)`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.5px;
  color: #ffffff;
  cursor: pointer;
  text-decoration: none;
`;
const CardWrapper = styled.div`
  margin-block-end: 40px;
`;
