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
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useViewAllComplyQuery } from "services/complyService";

const Registrationlayout = () => {
  const navigate = useNavigate();

  const {} = useSelector((store) => store.UserDataReducer);

  const { data, isLoading, isSuccess } = useViewAllComplyQuery();

  const searchStyle = {
    borderRadius: "12px",
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  };

  const submitted = data?.filter((el) => el.status === "submitted") || [];
  const draft = data?.filter((el) => el.status === "pending") || [];

  const iconStyle = { width: "17px", height: "17px" };
  return (
    <Container>
      <Header>
        <MainHeader>
          <TopContent>
            <div>
              <PageTitle>Compliances</PageTitle>
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
            <SearchWrapper>
              <Search style={searchStyle} iconStyle={iconStyle} className={"searchbox"} />
            </SearchWrapper>
            <Flex>
              {/* <ExportWrapper>
                <ExportIcon />
                <TitleWrapper>Export Businesses</TitleWrapper>
              </ExportWrapper> */}
              {/* <ButtonWrapper onClick={() => navigate("/launch")}>
                <button>
                  <NoteIcon />
                  Start Business Registration
                </button>
              </ButtonWrapper> */}
            </Flex>
          </BottomContent>
        </MainHeader>
        <SubHeader>
          <ActiveNav
            text="All"
            total={data?.length || 0}
            path={"/staff-dashboard/businesses/services/allcomply/all"}
          />
          <ActiveNav
            text="Submitted"
            total={submitted?.length}
            path={"/staff-dashboard/businesses/services/allcomply/submitted"}
          />
          <ActiveNav
            text="Draft"
            total={draft?.length}
            path={"/staff-dashboard/businesses/services/allcomply/draft"}
          />
        </SubHeader>
      </Header>
      <Outlet />
    </Container>
  );
};

export default Registrationlayout;
