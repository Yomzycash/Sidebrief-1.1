import React, { useEffect, useState } from "react";
import { Container } from "./styled";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { removeComplyFromLocalStorage } from "utils/globalFunctions";
import ProductHeader from "components/Header/ProductHeader";
import EmptyContent from "components/Fallbacks/EmptyContent";
import { useCategoriesActions } from "../actions";
import LoadingError from "components/Fallbacks/LoadingError";
import MobileStaff from "layout/MobileStaff";
import { useMediaQuery } from "@mui/material";

const StaffManage = () => {
  const [searchValue, setSearchValue] = useState("");

  const {
    submitted,
    drafts,
    paidDrafts,
    isLoading,
    isError,
    isSuccess,
    complyFullInfo,
    handleCategoryCreate,
  } = useCategoriesActions({ category: "MANAGE", createPath: "/services/manage" });

  const { pathname } = useLocation();
  
  const navigate = useNavigate();

  let submittedTotal = submitted?.length;
  let draftTotal = drafts?.length;
  let paidDraftTotal = paidDrafts?.length;
  let allTotal = complyFullInfo?.length;

  useEffect(() => {
    removeComplyFromLocalStorage();
  }, []);

  const handleSearch = (e) => {
    let value = e.target.value;
    setSearchValue(value);
  };

  const summary = {
    current: submittedTotal + draftTotal || 0,
    total: submittedTotal + draftTotal || 0,
  };

  const filterList = ["All"];

  const matches = useMediaQuery("(max-width:700px)");
  const navInfo = [
    {
      text: "All",
      total: submittedTotal + draftTotal || 0,
      path: "/staff-dashboard/businesses/manage/all-manage",
      isAvailable: submittedTotal + draftTotal > 0,
    },
    {
      text: "Submitted",
      total: submittedTotal || 0,
      path: "/staff-dashboard/businesses/manage/submitted-manage",
      isAvailable: submittedTotal > 0,
    },
    {
      text: "Draft",
      total: draftTotal || 0,
      path: "/staff-dashboard/businesses/manage/draft-manage",
      isAvailable: draftTotal > 0,
    },
    {
      text: "Paid Drafts",
      total: paidDraftTotal || 0,
      path: "/staff-dashboard/businesses/manage/paid-draft-manage",
      isAvailable: paidDrafts?.length > 0,
    },
  ];

  let isFirstNav =
    pathname === "/staff-dashboard/businesses/manage" &&
    "/staff-dashboard/businesses/manage/all-manage";


  let options = [
    {
      title: submittedTotal + draftTotal > 0 ? "All" : "",
      totalLength: submittedTotal + draftTotal,
    },
    {
      title: paidDraftTotal > 0 ? "Paid Drafts" : "",
      totalLength: paidDraftTotal,
    },
    {
      title: draftTotal > 0 ? "Drafts" : "",
      totalLength: draftTotal,
    },
    {
      title: submittedTotal > 0 ? "Submitted" : "",
      totalLength: submittedTotal,
    },
  ];

  //removing empty element from the array
  options = options.filter((el) => el?.title !== "");

  let pathNavigation = {
    All: "all-manage",
    Submitted: "submitted-manage",
    Drafts: "draft-manage",
    "Paid Drafts": "paid-draft-manage",
  };

  // staff-dashboard/businesses/registration/pending

  const selectedValue = (option) => {
    navigate(`/staff-dashboard/businesses/manage/${pathNavigation[option?.title]}`)
  }
  return (
    <Container>
     {!matches ? (
      <ProductHeader
        title="Manage"
        searchPlaceholder="Search manage..."
        summary={summary}
        filterList={filterList}
        action={handleCategoryCreate}
        actionText="Manage a Business"
        onSearchChange={handleSearch}
        navInfo={navInfo}
        defaultActive={isFirstNav}
    />
     ) :(
      <MobileStaff
        title={"Manage"}
        originalOptions={options} 
        initialTitle={"All"}
        initialLength={submittedTotal + draftTotal}
        realSelectedValue={selectedValue}
        mobile
      />
     )}
      {!allTotal && !isLoading ? (
        isError ? (
          <LoadingError />
        ) : (
          <EmptyContent
            emptyText="Users manage requests will appear here when they create one"
            buttonText="Manage a Business"
            action={handleCategoryCreate}
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
          }}
        />
      )}{" "}
    </Container>
  );
};
export default StaffManage;
