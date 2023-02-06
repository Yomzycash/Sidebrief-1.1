import StaffStatusCard from "components/cards/BusinessAddressCard/StaffStatusCard";
import StaffBusinessCard from "components/cards/StaffBusinessCard/StaffBusinessCard";
// import React from "react";
// import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as AddIcon } from "../../../../../src/asset/svg/Plus.svg";
import { useEffect } from "react";
import { useState } from "react";
import { useGetAllTheEntitiesQuery } from "services/launchService";
import {
  useGetAllCountriesQuery,
  useGetApprovedLaunchQuery,
  useGetSubmittedLaunchQuery,
} from "services/staffService";

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
                <Text>
                  {month}
                  {/* <RiArrowDropDownLine /> */}
                </Text>
              </TextDropdown>
            ))}
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
          link="/staff-dashboard/businesses/countries"
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
  min-width: 1050px;

  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;
const LeftContainer = styled.div`
  max-height: calc(100vh - 136.96px);
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
  max-height: calc(100vh - 106.96px);
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
	color: ${({ theme }) => theme.grey1};
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
