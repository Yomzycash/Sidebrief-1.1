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
import { Outlet } from "react-router-dom";
import Button from "components/button";
import { ReactComponent as NoteIcon } from "../../../../asset/images/note.svg";

const searchStyle = {
  borderRadius: "12px",
  backgroundColor: "white",
  maxWidth: "384px",
};

const Business = () => {
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
              <button>
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
            total={1}
            path="/dashboard/businesses/pending-applications"
          />
        </SubHeader>
      </Header>
      <Outlet />
    </Container>
  );
};

export default Business;
