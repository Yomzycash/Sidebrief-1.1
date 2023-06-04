import React, { useEffect, useState, useMemo } from "react";
import {
  Container,
  Header,
  HeaderText,
  LeftContainer,
  ButtonContainer,
  TopSection,
  SearchBlock,
  SearchWrapper,
  MainSection,
  LeftSection,
  MetricSection,
  MetricContainer,
  Number,
  TopText,
  Divider,
  BottomText,
  TableSection,
  RightSection,
  StyledWrapper,
  SubHeader,
  Loading,
  searchStyle,
  iconStyle,
  TableHeader,
  EachDate,
  DateWrapper,
  LaunchClients,
  Users,
  ManageClients,
} from "./styled";
import { EmptyContainer } from "./tableStyle";
import Search from "components/navbar/Search";
import ActiveNav from "components/navbar/ActiveNav";
import { CommonButton } from "components/button";
import { compareAsc, format, isSameMonth, isWithinInterval } from "date-fns";
import { Puff } from "react-loading-icons";
import { useMediaQuery } from "@mui/material";
import { useGetAllLaunchQuery, useGetAllRegisteredUsersQuery } from "services/staffService";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import FeatureTable from "components/Tables/FeatureTable";
import { nav } from "./constants";
import CustomDropDown from "components/input/CustomDropdown/CustomDropDown";
import { BiFilter, BiSortAlt2 } from "react-icons/bi";
import { useViewAllComplyQuery } from "services/complyService";
import { useUserManagementActions } from "./actions";
import { Outlet, useLocation } from "react-router-dom";

const MetricCard = ({ number, percentage, topText, bottomText, onClick = () => {} }) => {
  return (
    <StyledWrapper tabIndex={0} className="button__effect" onClick={() => onClick(topText)}>
      <TopText>{topText}</TopText>
      <Number>{number}</Number>
      <BottomText>{bottomText}</BottomText>
    </StyledWrapper>
  );
};

const UserManagement = () => {
  const [calendarValue, setCalendarValue] = useState(new Date());
  const [dataArr, setDataArr] = useState([]);
  const [dateFrom, setdateFrom] = useState("");
  const [dateTo, setdateTo] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [activeCard, setActiveCard] = useState("");

  const { handleSort } = useUserManagementActions({ dataArr, setDataArr });

  const allUsers = useGetAllRegisteredUsersQuery();
  const allLaunch = useGetAllLaunchQuery();

  //  Products
  const manage = useUserManagementActions({ category: "MANAGE" });
  const tax = useUserManagementActions({ category: "TAX" });
  const onboard = useUserManagementActions({ category: "Onboard" });
  const compliance = useUserManagementActions({ category: "Compliance" });
  const intellectual = useUserManagementActions({ category: "Intellectual" });

  // Products data
  const allManage = manage?.complyFullInfo;
  const allTax = tax?.complyFullInfo;
  const allOnboard = onboard?.complyFullInfo;
  const allCompliance = compliance?.complyFullInfo;
  const allIntellectual = intellectual?.complyFullInfo;

  // Users data
  const launchUsers = dataArr?.filter((el) => el?.submitted_launch_requests?.length > 0);
  const manageUsers = [...new Set(allManage?.map((el) => el?.meta))]?.length;
  const usersThisMonth = dataArr?.filter((el) =>
    isSameMonth(new Date(el?.createdAt), new Date(calendarValue))
  );
  const launchUsersThisMonth = launchUsers?.filter((el) =>
    isSameMonth(new Date(el?.createdAt), new Date())
  );
  const draftLaunchUsersThisMonth = launchUsersThisMonth?.filter(
    (el) => el?.submitted_launch_requests
  );

  const totalUsers = dataArr.length || 0;
  const totalLaunchUsers = launchUsers?.length || 0;
  const totalUsersWithNoLaunch = totalUsers - totalLaunchUsers || 0;

  const submittedLaunch = allLaunch.data?.filter((el) => el?.registrationStatus === "submitted");
  const pendingLaunch = allLaunch.data?.filter((el) => el?.registrationStatus === "pending");

  // Filter Users
  useEffect(() => {
    const oneDayinMilli = 24 * 60 * 60 * 1000;
    let users = allUsers.data?.data || [];
    if (users) {
      // Filter by the calendar value
      users = users?.filter(
        (el) =>
          new Date(calendarValue).getTime() + oneDayinMilli - new Date(el?.createdAt).getTime() >= 0
      );
      // Filter by the selected date range
      if (dateFrom && dateTo) {
        users = users?.filter((el) =>
          isWithinInterval(new Date(el?.createdAt), {
            start: new Date(dateFrom),
            end: new Date(dateTo),
          })
        );
      }
      // Filter by the searched value
      if (searchValue) users = users?.filter((el) => handleSearch(el));
    }
    setDataArr(
      [...users]?.sort((a, b) => compareAsc(new Date(b?.createdAt), new Date(a?.createdAt)))
    );
  }, [allUsers.data, calendarValue, dateFrom, dateTo, searchValue]);

  const handleDateFrom = (e) => {
    const value = e.target.value;
    setdateFrom(value);
  };

  const handleDateTo = (e) => {
    const value = e.target.value;
    setdateTo(value);
  };

  const handleSearch = (el) => {
    if (
      includesSearch(el?.email) ||
      includesSearch(el?.first_name) ||
      includesSearch(el?.last_name) ||
      includesSearch(el?.referral_code) ||
      includesSearch(el?.phone) ||
      includesSearch(el?.username)
    ) {
      return true;
    }
  };

  const includesSearch = (text) => {
    if (typeof text !== "string") text = text?.toString();
    return text?.toLowerCase()?.includes(searchValue?.toLowerCase());
  };

  const handleCardClick = (topText) => {
    setActiveCard(topText?.toLowerCase());
    console.log(topText);
  };

  const { pathname } = useLocation();
  const isHomePath = pathname === "/staff-dashboard/customer-management";
  const matches = useMediaQuery("(max-width:700px)");

  return (
    <Container>
      <Header>
        <LeftContainer>
          <HeaderText>User Management</HeaderText>
          <CommonButton text="Send Bulk Mail" />
        </LeftContainer>
        <SearchWrapper>
          <Search
            style={searchStyle}
            iconStyle={iconStyle}
            placeholder="Search customers"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <DateWrapper>
            <BiFilter size={24} />
            <EachDate>
              <span>From:</span>
              <input type="date" onChange={handleDateFrom} />
            </EachDate>
            <EachDate>
              <span>To:</span>
              <input type="date" onChange={handleDateTo} />
            </EachDate>
          </DateWrapper>
        </SearchWrapper>
      </Header>
      <MainSection>
        <LeftSection>
          <MetricSection>
            <MetricContainer>
              <MetricCard
                topText={"All Users"}
                number={totalUsers}
                bottomText={
                  <Users>
                    <span>{usersThisMonth?.length}</span> users this month
                  </Users>
                }
                onClick={handleCardClick}
              />
              <MetricCard
                topText={"Launch Clients"}
                number={totalLaunchUsers}
                bottomText={
                  <LaunchClients>
                    <span>{submittedLaunch?.length || 0} </span> submitted{" "}
                    <span>{pendingLaunch?.length || 0}</span> drafts
                  </LaunchClients>
                }
                onClick={handleCardClick}
              />
              <MetricCard
                topText={"Manage Clients"}
                number={manageUsers}
                bottomText={
                  <ManageClients>
                    <span>{allManage?.length || 0}</span> products managed
                  </ManageClients>
                }
                onClick={handleCardClick}
              />
            </MetricContainer>
          </MetricSection>
          <TableSection>
            <TableHeader>
              <p>All Customers</p>
              <CustomDropDown
                initialValue="Sort"
                options={["Old Users", "New Users"]}
                onSelect={handleSort}
                icon={<BiSortAlt2 />}
              />
            </TableHeader>
            {!matches && (
              <SubHeader>
                {nav.map((el, i) => (
                  <ActiveNav
                    key={i}
                    index={i}
                    text={el.text}
                    path={el.path}
                    defaultActive={isHomePath}
                  />
                ))}
              </SubHeader>
            )}
            <Outlet context={{ dataArr, setDataArr }} />
          </TableSection>
        </LeftSection>
        <RightSection>
          <Calendar value={calendarValue} onChange={setCalendarValue} />
        </RightSection>
      </MainSection>
    </Container>
  );
};

export default UserManagement;

/* {isLoading ? (
              <Loading>
                <Puff stroke="#00A2D4" />
              </Loading>
            ) : data?.length > 0 ? (
              <MemoisedGeneralTable
                data={[...data]
                  ?.sort((a, b) => compareAsc(new Date(b?.createdAt), new Date(a?.createdAt)))
                  .map((element) => {
                    return {
                      key: element.complyCode,
                      name: element?.serviceName ? element?.serviceName : "No name ",
                      serviceId: element.serviceId,
                      date: format(new Date(element?.createdAt), "dd/MM/yyyy"),
                      status: element?.status,
                    };
                  })}
                columns={columns}
                normalLastRow
              />
            ) : (
              <EmptyContainer>No Data Available</EmptyContainer>
            )} */
