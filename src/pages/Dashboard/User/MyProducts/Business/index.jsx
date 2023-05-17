import React, { useState } from "react";
import { ButtonWrapper, Container } from "./styled";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { setGeneratedLaunchCode, setLaunchResponse } from "redux/Slices";
import { store } from "redux/Store";
import { useGetUserDraftQuery, useGetUserSubmittedQuery } from "services/launchService";
import { removeLaunchFromLocalStorage } from "utils/globalFunctions";
import ProductHeader from "components/Header/ProductHeader";
import LoadingError from "components/Fallbacks/LoadingError";
import EmptyContent from "components/Fallbacks/EmptyContent";
import { useMediaQuery } from "@mui/material";
import MobileBusiness from "layout/MobileBusiness";
import { ReactComponent as NoteIcon } from "asset/images/note.svg";
import styled from "styled-components";

//

const Business = () => {
  const [searchValue, setSearchValue] = useState("");
  const [listShown, setListShown] = useState(0);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const drafts = useGetUserDraftQuery({
    refetchOnMountOrArgChange: true,
  });
  const submitted = useGetUserSubmittedQuery({
    refetchOnMountOrArgChange: true,
  });
  const paidDrafts = drafts.currentData?.filter((el) => el?.paid === true);

  const handleLaunch = () => {
    store.dispatch(setGeneratedLaunchCode(""));
    store.dispatch(setLaunchResponse({}));
    removeLaunchFromLocalStorage();
    navigate("/launch");
  };

  let isLoading = drafts.isLoading || submitted.isLoading;
  let isError = drafts.isError || submitted.isError;
  let isSuccess = drafts.isSuccess && submitted.isSuccess;

  let submittedTotal = submitted?.currentData?.length;
  let draftTotal = drafts?.currentData?.length;
  let paidDraftTotal = paidDrafts?.length;
  let allTotal = submittedTotal + draftTotal;

  const handleSearch = (e) => {
    let value = e.target.value;
    setSearchValue(value);
  };

  const summary = {
    current: listShown,
    total: listShown,
  };

  const filterList = ["All", "Onboarded", "Launched"];

  const matches = useMediaQuery("(max-width:700px)");

  const navInfo = [
    {
      text: "All",
      total: submittedTotal + draftTotal || 0,
      path: "/dashboard/my-products/business/all-businesses",
      isAvailable: submittedTotal + draftTotal > 0,
    },
    {
      text: "Submitted",
      total: submittedTotal || 0,
      path: "/dashboard/my-products/business/submitted-applications",
      isAvailable: submittedTotal > 0,
    },
    {
      text: "Draft",
      total: draftTotal || 0,
      path: "/dashboard/my-products/business/draft-applications",
      isAvailable: draftTotal > 0,
    },
    {
      text: "Paid Drafts",
      total: paidDraftTotal || 0,
      path: "/dashboard/my-products/business/paid-draft-applications",
      isAvailable: paidDrafts?.length > 0,
    },
  ];

  let isFirstNav =
    pathname === "/dashboard/my-products/business" &&
    "/dashboard/my-products/business/all-applications";

  //const options = ["All", "Submitted", "Drafts", "Paid Drafts"];
  let options = [
    {
      title: submittedTotal + draftTotal > 0 ? "All" : "",
      totalLength: submittedTotal + draftTotal,
    },
    {
      title: submittedTotal > 0 ? "Submitted" : "",
      totalLength: submittedTotal,
    },

    {
      title: draftTotal > 0 ? "Drafts" : "",
      totalLength: draftTotal,
    },
    {
      title: paidDraftTotal > 0 ? "Paid Drafts" : "",
      totalLength: paidDraftTotal,
    },
  ];
  //removing empty element from the array
  options = options.filter((el) => el?.title !== "");

  let pathNavigation = {
    All: "all-businesses",
    Submitted: "submitted-applications",
    Drafts: "draft-applications",
    "Paid Drafts": "paid-draft-applications",
  };

  const selectedValue = (option) => {
    console.log(option);
    navigate(`/dashboard/my-products/business/${pathNavigation[option?.title]}`);
    //console.log(pathNavigation[option]);
  };

  return (
    <Container>
      {matches ? (
        <MobileBusiness
          realSelectedValue={selectedValue}
          originalOptions={options}
          title={"Businesses"}
          initialTitle={"All"}
          initialLength={submittedTotal + draftTotal}
          mobile
        />
      ) : (
        <ProductHeader
          title="Businesses"
          searchPlaceholder="Search business names..."
          summary={summary}
          filterList={filterList}
          action={handleLaunch}
          actionText="Launch a Business"
          onSearchChange={handleSearch}
          navInfo={navInfo}
          defaultActive={isFirstNav}
        />
      )}
       {/* <ProductHeader
          title="Businesses"
          searchPlaceholder="Search business names..."
          summary={summary}
          filterList={filterList}
          action={handleLaunch}
          actionText="Launch a Business"
          onSearchChange={handleSearch}
          navInfo={navInfo}
          defaultActive={isFirstNav}
        /> */}

      {!allTotal && !isLoading ? (
        isError ? (
          <LoadingError />
        ) : (
          <EmptyContent
            emptyText="Your businesses will appear here."
            buttonText="Launch a Business"
            action={handleLaunch}
          />
        )
      ) : (
        <Outlet
          context={{
            submitted,
            paidDrafts,
            drafts,
            searchValue,
            isLoading,
            isError,
            isSuccess,
            setListShown,
          }}
        />
      )}
      {matches && (
        <LastWrapper>
          <ButtonWrapper>
            <button onClick={handleLaunch}>
              <NoteIcon />
              Launch a Business
            </button>
          </ButtonWrapper>
        </LastWrapper>
      )}
    </Container>
  );
};
export default Business;

const LastWrapper = styled.div`
  position: sticky;
  bottom: 0px;
  padding: 24px;
  z-index: 1000;
  background-color: #ffffff;
`;
