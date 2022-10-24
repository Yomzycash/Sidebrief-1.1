import TabNavBar from "components/TabNavBar/TabNavBar";
import React, { useEffect, useState } from "react";
import {
  Body,
  ButtonWrapper,
  PageTitle,
  Container,
  Header,
  SubHeader,
  TopContent,
  BottomContent,
  MainHeader,
  Drop,
} from "./styled";
import image from "../../../../asset/images/coming.png";
import { RewardSummaryCard } from "components/cards";
import Search from "components/navbar/Search";
import ActiveNav from "components/navbar/ActiveNav";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Button from "components/button";
import { ReactComponent as NoteIcon } from "../../../../asset/images/note.svg";
import { setBusinessesShown, setGeneratedLaunchCode } from "redux/Slices";
import { store } from "redux/Store";
import {
  useGetUserDraftQuery,
  useGetUserSubmittedQuery,
} from "services/launchService";
import { useSelector } from "react-redux";

const searchStyle = {
  borderRadius: "12px",
  backgroundColor: "white",
  maxWidth: "384px",
  height: "40px",
};

const iconStyle = { width: "17px", height: "17px" };

const Business = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const drafts = useGetUserDraftQuery();
  const submitted = useGetUserSubmittedQuery();

  const businessesShown = useSelector(
    (store) => store.BusinessesInfo.businessesShown
  );

  console.log(businessesShown);

  let submittedTotal = submitted?.currentData?.length;
  let draftTotal = drafts?.currentData?.length;

  const handleLaunch = () => {
    store.dispatch(setGeneratedLaunchCode(""));
    navigate("/launch");
  };

  // This sets the shown of all rewards
  useEffect(() => {
    if (location.pathname === "/dashboard/businesses/all-businesses")
      store.dispatch(setBusinessesShown({ total: 0, shown: 0 }));
    if (location.pathname === "/dashboard/businesses/pending-applications")
      store.dispatch(
        setBusinessesShown({ total: submittedTotal, shown: submittedTotal })
      );
    if (location.pathname === "/dashboard/businesses/draft-applications")
      store.dispatch(
        setBusinessesShown({ total: draftTotal, shown: draftTotal })
      );
  }, [location.pathname]);

  return (
    <Container>
      <Header>
        <MainHeader>
          <TopContent>
            <div>
              <PageTitle>Businesses</PageTitle>
              <RewardSummaryCard
                shown={businessesShown.shown}
                total={businessesShown.total}
              />
            </div>
            <Drop>
              <select>
                <option value="Sort">Sort</option>
                <option value="All">All</option>
              </select>
            </Drop>
          </TopContent>
          <BottomContent>
            <Search style={searchStyle} iconStyle={iconStyle} />
            <ButtonWrapper>
              <button onClick={handleLaunch}>
                <NoteIcon />
                Launch a Business
              </button>
            </ButtonWrapper>
          </BottomContent>
        </MainHeader>
        <SubHeader>
          <ActiveNav
            text="All Businesses"
            total={0}
            path={"/dashboard/businesses/all-businesses"}
          />
          <ActiveNav
            text="Pending Applications"
            total={submitted.isSuccess ? submitted?.currentData.length : 0}
            path="/dashboard/businesses/pending-applications"
          />
          <ActiveNav
            text="Draft Applications"
            total={drafts.isSuccess ? drafts?.currentData.length : 0}
            path="/dashboard/businesses/draft-applications"
          />
        </SubHeader>
      </Header>
      <Outlet />
    </Container>
  );
};

export default Business;
