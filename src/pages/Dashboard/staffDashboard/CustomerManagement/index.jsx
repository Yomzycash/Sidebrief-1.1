import React, { useEffect, useState, useMemo } from "react";
import {
  Container,
  Header,
  HeaderText,
  LeftContainer,
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
import {
  compareAsc,
  format,
  getDate,
  getDay,
  getDaysInMonth,
  getMonth,
  getYear,
  isSameMonth,
  isSameYear,
  isWithinInterval,
} from "date-fns";
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

const MetricCard = ({ number, topText, bottomText, onClick = () => {} }) => {
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
  const [usersData, setUsersData] = useState([]);
  const [dateFrom, setdateFrom] = useState("");
  const [dateTo, setdateTo] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [activeCard, setActiveCard] = useState("");

  const { handleSort, formatDate } = useUserManagementActions({
    usersData,
    setUsersData,
    calendarValue,
  });

  const allUsers = useGetAllRegisteredUsersQuery();

  const getComplyUsers = (complyInfo, usersInfo) => {
    const filteredComply = usersInfo?.filter((el) =>
      complyInfo?.find((val) => val?.meta === el?._id)
    );
    return filteredComply;
  };

  //  Products
  const manage = useUserManagementActions({ category: "MANAGE" })?.complyFullInfo;
  const submittedManage = useUserManagementActions({ category: "MANAGE" })?.submitted;
  const pendingManage = useUserManagementActions({ category: "MANAGE" })?.drafts;
  const tax = useUserManagementActions({ category: "TAX" })?.complyFullInfo;
  const onboard = useUserManagementActions({ category: "Onboard" })?.complyFullInfo;
  const compliance = useUserManagementActions({ category: "Compliance" })?.complyFullInfo;
  const intellectual = useUserManagementActions({
    category: "Intellectual Property",
  })?.complyFullInfo;

  // Products users
  const manageUsers = getComplyUsers(manage, usersData);
  const submittedManageUsers = getComplyUsers(submittedManage, usersData);
  const pendingManageUsers = getComplyUsers(pendingManage, usersData);
  const taxUsers = getComplyUsers(tax, usersData);
  const onboardUsers = getComplyUsers(onboard, usersData);
  const complianceUsers = getComplyUsers(compliance, usersData);
  const intellectualUsers = getComplyUsers(intellectual, usersData);

  // Users data
  const usersUsernames = usersData?.map((el) => el?.username);
  const launchUsers = usersData?.filter(
    (el) => el?.submitted_launch_requests?.length > 0 || el?.draft_launch_requests?.length > 0
  );
  const submittedLaunchUsers = usersData?.filter((el) => el?.submitted_launch_requests?.length > 0);
  // const manageUsers = [...new Set(allManage?.map((el) => el?.meta))]?.length;
  const usersThisMonth = usersData?.filter((el) =>
    isSameMonth(new Date(el?.createdAt), new Date(calendarValue))
  );

  const totalUsers = usersData.length || 0;
  const totalManageUsers = submittedManageUsers?.length + pendingManageUsers?.length || 0;

  let submittedLaunch = usersData
    ?.filter((el) => el?.submitted_launch_requests?.length > 0)
    ?.map((el) => el?.submitted_launch_requests);
  submittedLaunch = submittedLaunch?.flat();

  let pendingLaunch = usersData
    ?.filter((el) => el?.draft_launch_requests?.length > 0)
    ?.map((el) => el?.draft_launch_requests);
  pendingLaunch = pendingLaunch?.flat();

  // Filter Users
  useEffect(() => {
    let users = allUsers.data?.data || [];
    if (users) {
      const oneDayinMilli = 24 * 60 * 60 * 1000;
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
    setUsersData(
      [...users]?.sort((a, b) => compareAsc(new Date(b?.createdAt), new Date(a?.createdAt)))
    );
  }, [allUsers.data, calendarValue, dateFrom, dateTo, searchValue]);

  const handleFilter = () => {};

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
                    <span>{usersThisMonth?.length}</span> users {formatDate()}
                  </Users>
                }
                onClick={handleCardClick}
              />
              <MetricCard
                topText={"Launch Clients"}
                number={
                  <span>
                    {launchUsers?.length} ({submittedLaunchUsers?.length || 0})
                  </span>
                }
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
                number={
                  <span>
                    {totalManageUsers} ({submittedManageUsers?.length || 0})
                  </span>
                }
                bottomText={
                  <ManageClients>
                    <span>{submittedManage?.length || 0}</span> managed{" "}
                    <span>{pendingManage?.length || 0}</span> drafts
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
                options={["New Users", "Old Users"]}
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
            <Outlet
              context={{
                usersData,
                setUsersData,
                launchUsers,
                manageUsers,
                taxUsers,
                onboardUsers,
                complianceUsers,
                intellectualUsers,
              }}
            />
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
