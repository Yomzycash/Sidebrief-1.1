import { useEffect, useState } from "react";
import {
  Container,
  Header,
  MainHeader,
  TopContent,
  PageTitle,
  Drop,
  BottomContent,
  ButtonWrapper,
  ExportWrapper,
  Flex,
  SearchWrapper,
  SubHeader,
  TitleWrapper,
} from "./style";
import { SummaryCard } from "components/cards";
import ActiveNav from "components/navbar/ActiveNav";
import Search from "components/navbar/Search";
import React from "react";
import { ReactComponent as ExportIcon } from "asset/svg/ExportIcon.svg";
import { ReactComponent as NoteIcon } from "asset/images/note.svg";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  useGetAllLaunchQuery,
  useGetApprovedLaunchQuery,
  useGetDraftLaunchQuery,
  useGetRejectedLaunchQuery,
  useGetSubmittedLaunchQuery,
} from "services/staffService";
import { useSelector } from "react-redux";

const Registrationlayout = () => {
  const navigate = useNavigate();
  const [allReg, setAllReg] = useState([]);
  const [awaitingReg, setAwaiting] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const allLaunch = useGetAllLaunchQuery();

  const awaitingLaunch = useGetSubmittedLaunchQuery();

  const rejectedLaunch = useGetRejectedLaunchQuery();

  const pendingLaunch = useGetDraftLaunchQuery();

  const approvedLaunch = useGetApprovedLaunchQuery();
  let all = allLaunch?.currentData?.length;
  let awaiting = awaitingLaunch?.currentData?.length;
  let rejected = rejectedLaunch?.currentData?.length;
  let pending = pendingLaunch?.currentData?.length;
  let approved = approvedLaunch?.currentData?.length;
  let paid = pendingLaunch?.currentData?.filter((el) => el.paid).length;

  const { unreadLaunchNotifications } = useSelector((store) => store.UserDataReducer);

  useEffect(() => {
    setAllReg(all ? all : []);
    setAwaiting(awaiting ? awaiting : []);
  }, [all, awaiting, pending, approved]);

  const location = useLocation();

  let home = location.pathname === "/staff-dashboard/businesses/registration" ? true : false;

  const searchStyle = {
    borderRadius: "12px",
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  };

  const iconStyle = { width: "17px", height: "17px" };
  return (
    <Container>
      <Header>
        <MainHeader>
          <TopContent>
            <div>
              <PageTitle>Business Registrations</PageTitle>
              <SummaryCard shown={23} total={503} />
            </div>
            <Drop>
              <select>
                <option value="Sort">Sort</option>
                <option value="All">All</option>
              </select>
            </Drop>
          </TopContent>
          <BottomContent>
            <SearchWrapper onFocus={() => setSearchFocused(true)}>
              <Search
                style={searchStyle}
                iconStyle={iconStyle}
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                className={"searchbox"}
              />
            </SearchWrapper>
            <Flex>
              <ExportWrapper>
                <ExportIcon />
                <TitleWrapper>Export Businesses</TitleWrapper>
              </ExportWrapper>
              <ButtonWrapper onClick={() => navigate("/launch")}>
                <button>
                  <NoteIcon />
                  Start Business Registration
                </button>
              </ButtonWrapper>
            </Flex>
          </BottomContent>
        </MainHeader>
        <SubHeader>
          <ActiveNav
            text="All"
            total={allReg}
            status={unreadLaunchNotifications?.length > 0}
            path={"/staff-dashboard/businesses/registration/all"}
            defaultActive={home}
          />
          <ActiveNav
            text="Paid drafts"
            total={paid}
            path={"/staff-dashboard/businesses/registration/paid-draft"}
          />
          <ActiveNav
            text="Drafts"
            total={pending}
            path="/staff-dashboard/businesses/registration/pending"
          />
          <ActiveNav
            text="Submitted"
            total={awaitingReg}
            status={unreadLaunchNotifications?.length > 0}
            path="/staff-dashboard/businesses/registration/awaiting-approval"
          />
          <ActiveNav
            text="Approved"
            total={approved}
            path="/staff-dashboard/businesses/registration/in-progress"
          />
          <ActiveNav
            text="Rejected"
            total={rejected}
            path="/staff-dashboard/businesses/registration/rejected"
          />
        </SubHeader>
      </Header>
      <Outlet />
    </Container>
  );
};

export default Registrationlayout;
