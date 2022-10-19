import TabNavBar from "components/TabNavBar/TabNavBar";
import React, { useState } from "react";
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
import { Outlet, useNavigate } from "react-router-dom";
import Button from "components/button";
import { ReactComponent as NoteIcon } from "../../../../asset/images/note.svg";
import { setGeneratedLaunchCode } from "redux/Slices";
import { store } from "redux/Store";
import {
  useGetUserDraftQuery,
  useGetUserSubmittedQuery,
} from "services/launchService";

const searchStyle = {
  borderRadius: "12px",
  backgroundColor: "white",
  maxWidth: "384px",
};

const Business = () => {
  const [businessesShown, setBusinessesShown] = useState({ all: 0, shown: 0 });
  const [applicationsShown, setAllApplicationsShown] = useState({
    all: 0,
    shown: 0,
  });
  const [draftsShown, setDraftsShown] = useState({ all: 0, shown: 0 });

  const drafts = useGetUserDraftQuery();
  const submitted = useGetUserSubmittedQuery();
  const navigate = useNavigate();

  const handleLaunch = () => {
    store.dispatch(setGeneratedLaunchCode(""));
    navigate("/launch");
  };

  const handleBusinessesShown = (shown, all) => {
    setBusinessesShown({ all: all, shown: shown });
  };

  const handleApplications = (shown, all) => {
    setAllApplicationsShown({ all: all, shown: shown });
  };

  const handleDrafts = (shown, all) => {
    setDraftsShown({ all: all, shown: shown });
  };

  return (
    <Container>
      <Header>
        <MainHeader>
          <TopContent>
            <div>
              <PageTitle>Businesses</PageTitle>
              <RewardSummaryCard shown={7} total={7} />
            </div>
            <Drop>
              <select>
                <option value="Sort">Sort</option>
                <option value="All">All</option>
              </select>
            </Drop>
          </TopContent>
          <BottomContent>
            <Search style={searchStyle} />
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
            handleShown={handleBusinessesShown}
          />
          <ActiveNav
            text="Pending Applications"
            total={submitted.isSuccess ? submitted?.currentData.length : 0}
            path="/dashboard/businesses/pending-applications"
            handleShown={handleApplications}
          />
          <ActiveNav
            text="Draft Applications"
            total={drafts.isSuccess ? drafts?.currentData.length : 0}
            path="/dashboard/businesses/draft-applications"
            handleShown={handleDrafts}
          />
        </SubHeader>
      </Header>
      <Outlet />
    </Container>
  );
};

export default Business;
