import TabNavBar from "components/TabNavBar/TabNavBar";
import React from "react";
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
import { useGetUserDraftQuery, useGetUserSubmittedQuery } from "services/launchService";

const searchStyle = {
  borderRadius: "12px",
  backgroundColor: "white",
  maxWidth: "384px",
};

const Business = () => {
  const drafts = useGetUserDraftQuery()
  const submitted = useGetUserSubmittedQuery()
  const navigate = useNavigate();

  const handleLaunch = () => {
    store.dispatch(setGeneratedLaunchCode(""));
    navigate("/launch");
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
            total={4}
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
