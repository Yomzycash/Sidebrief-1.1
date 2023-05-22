import StaffStatusCard from "components/cards/BusinessAddressCard/StaffStatusCard";
import StaffBusinessCard from "components/cards/StaffBusinessCard/StaffBusinessCard";
// import React from "react";
// import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as AddIcon } from "../../../../../src/asset/svg/Plus.svg";
import { ReactComponent as PlusIcon } from "../../../../../src/asset/Icons/Add.svg";
import { useEffect } from "react";
import { useState } from "react";
import { useGetAllTheEntitiesQuery } from "services/launchService";
import lookup from "country-code-lookup";
import { useMediaQuery } from "@mui/material";
import { IoIosAdd } from "react-icons/io";
import {
  useGetAllCountriesQuery,
  useGetApprovedLaunchQuery,
  useGetSubmittedLaunchQuery,
} from "services/staffService";
import { BusinessHomeTableLayout } from "./BusinessHomeTableLayout";

const StaffBusinesses = (props) => {
  const [countries, setCountries] = useState([]);
  const [entities, setEntities] = useState([]);
  //   const [completedLaunches, setCompletedLaunches] = useState([]);
  const [businessStatus, setBusinessStatus] = useState([]);

  const allCountries = useGetAllCountriesQuery();
  const allEntities = useGetAllTheEntitiesQuery();
  const allSubmittedLaunches = useGetSubmittedLaunchQuery();
  const allApprovedLaunches = useGetApprovedLaunchQuery();

  // const layoutInfo = useSelector((store) => store.LayoutInfo);
  // const { sidebarWidth } = layoutInfo;

  // const location = useLocation();
  // const navigate = useNavigate();

  // Fetch and set all countries and all entities
  const [isActive, setIsActive] = useState(false);
  const matches = useMediaQuery("(max-width:700px)");
  useEffect(() => {
    let countries = allCountries?.data;
    let entities = allEntities?.data;

    setCountries(
      countries &&
        countries.map((country) => {
          const iso2 = lookup.byIso(country.countryISO.split("-")[0])?.iso2 || "";

          return {
            text: country.countryName,
            link: "",
            image: `https://flagsapi.com/${iso2}/flat/64.png`,
            code: country.countryISO.slice(0, 2),
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
          //   completed: completedLaunches?.length,
        }
    );
    // console.log(countries);
    // console.log(entities);
  }, [
    allSubmittedLaunches?.data,
    allApprovedLaunches?.data,
    // completedLaunches,
  ]);

  const allMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date();
  const month = date.getMonth();
  const monthName = allMonths[month];
  allMonths.splice(month, 1, `This month (${monthName.slice(0, 3)})`);
  console.log(countries);

  return (
    <Container>
      <LeftContainer>
        <TopContainer>
          <SideWrapper>
            <Heading>Businesses</Heading>
            <LowerText>Jump right back in today</LowerText>
          </SideWrapper>
          <MonthWrapper defaultValue={allMonths[month]}>
            {allMonths.map((month, index) => (
              <TextDropdown key={index}>
                <Text>{month}</Text>
              </TextDropdown>
            ))}
          </MonthWrapper>
        </TopContainer>
        <BusinessTop>
          <ViewWrapper to="/staff-dashboard/businesses/countries">
            <TopText>See Countries</TopText>
          </ViewWrapper>
          <ViewWrapper to="/staff-dashboard/businesses/entities">
            <TopText>Entities</TopText>
          </ViewWrapper>
        </BusinessTop>

        {!matches ? (
          <>
            <MiddleContainer>
              <TitleWrapper>Business Summary</TitleWrapper>
            </MiddleContainer>
            <CardWrapper>
              <StaffStatusCard status={businessStatus} />
            </CardWrapper>
          </>
        ) : (
          <>
            <Wrapper>
              <TitleHead onClick={() => setIsActive(!isActive)} isActive={isActive}>
                <Title>Business Summary </Title>
                <ToggleArrow onClick={() => setIsActive(!isActive)} isActive={isActive}>
                  <IoIosAdd fontSize={"2em"} />
                </ToggleArrow>
              </TitleHead>
            </Wrapper>
            {isActive && (
              <CardWrapper>
                <StaffStatusCard status={businessStatus} />
              </CardWrapper>
            )}
          </>
        )}

        <BusinessHomeTableLayout>
          <Outlet />
        </BusinessHomeTableLayout>
      </LeftContainer>
      <RightContainer>
        <StaffBusinessCard
          title="Countries"
          subText="Countries we are currently available in"
          list={countries}
          link="/staff-dashboard/businesses/countries"
          code={countries?.code}
        />

        <StaffBusinessCard
          title="Entities"
          subText="Entities we currently provide our services in"
          list={entities}
          link="/staff-dashboard/businesses/entities"
        />
      </RightContainer>
    </Container>
  );
};

export default StaffBusinesses;

const Container = styled.div`
  display: flex;
  flex-flow: row;
  width: calc(100% - ${({ SidebarWidth }) => SidebarWidth});
  padding: 0px 0px 40px 40px;
  gap: 40px;

  @media screen and (max-width: 700px) {
    width: 100%;
    flex-direction: column;
    padding: 0px;
  }
`;
const LeftContainer = styled.div`
  max-height: calc(100vh - 136.96px);
  overflow-y: auto;
  margin-top: 40px;
  width: 100%;

  @media screen and (max-width: 700px) {
    margin-top: 0;
    max-height: none;
    overflow-y: none;
    padding: 0px 24px;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;
const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  max-width: max-content;
  max-height: calc(100vh - 106.96px);
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 700px) {
    display: none;
  }
`;
const TopContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-block-end: 40px;
  position: relative;
  top: 0;
  z-index: 10;
  background: #fff;
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
  color: ${({ theme }) => theme.grey1};
`;
const LowerText = styled.h4`
  font-weight: 500;
  font-size: 14px;
  line-height: 26px;

  letter-spacing: 0.01em;

  color: #4e5152;
`;

const MonthWrapper = styled.select`
  background: #f8f8f8;
  border-radius: 12px;
  width: 151px;
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  padding-inline: 14px;
`;

const TextDropdown = styled.option`
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
  // width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-block-end: 24px;

  @media screen and (max: width:700px) {
    // flex-direction: column;
    // align-items:flex-start;

    // gap: 16px;
    // width: 100%;
    // padding-inline: 0px !important;
    display: none;
  }
`;
const TitleWrapper = styled.h3`
  font-weight: 600;
  font-size: 16px;
  line-height: 30px;
  letter-spacing: 0.01em;
  color: ${({ theme }) => theme.grey1};
  width: 196px;
  height: 44px;
  background: none;
  border-radius: 8px;

  @media screen and (max: width:700px) {
    //  padding:0
    //  margin-block-end: 24px;
    max-width: 100%;
    width: 100%;
  }
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

  @media screen and (max: width:700px) {
    // padding:0;
    width: 100%;
  }
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
const BusinessTop = styled.div`
  display: none;

  @media screen and (max-width: 700px) {
    position: relative;
    display: flex;
    flex-direction: row;
    padding-bottom: 20px;
    gap: 32px;
  }
`;

const ViewWrapper = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none;
`;

const TopText = styled.h3`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.5px;
  color: #00a2d4;
`;
const ToggleDown = styled.p`
  // display:none;

  @media screen and (max-width: 700px) {
    display: block;
  }
`;

const Wrapper = styled.div`
  @media screen and (max-width: 700px) {
    box-sizing: border-box;
    width: 100%;
    padding: 20px 5px 20px 0px;
  }
`;
const TitleHead = styled.div`
  @media screen and (max-width: 700px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;
const Title = styled.h2`
  @media screen and (max-width: 700px) {
    font-weight: bold;
    font-size: 14px;
    line-height: 21px;

    letter-spacing: -0.01em;

    color: #000;
  }
`;
const ToggleArrow = styled.div`
  @media screen and (max-width: 700px) {
    display: flex;
    align-items: center;
    cursor: pointer;
    transform: ${({ isActive }) => (isActive ? "rotate(45deg)" : "")};
    transition: 0.3s transform ease;
    padding: 0 5px;
  }
`;
