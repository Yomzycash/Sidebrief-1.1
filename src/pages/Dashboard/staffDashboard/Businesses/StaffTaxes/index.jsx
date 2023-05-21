import React, { useEffect, useState } from "react";
import { Container } from "./styled";
import { removeComplyFromLocalStorage } from "utils/globalFunctions";
import ProductHeader from "components/Header/ProductHeader";
import EmptyContent from "components/Fallbacks/EmptyContent";
import { useCategoriesActions } from "../actions";
import LoadingError from "components/Fallbacks/LoadingError";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MobileStaff from "layout/MobileStaff";
import { useMediaQuery } from "@mui/material";
//

const StaffTax = () => {
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
  } = useCategoriesActions({ category: "TAX", createPath: "/services/tax" });

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

  const navInfo = [
    {
      text: "All",
      total: submittedTotal + draftTotal || 0,
      path: "/staff-dashboard/businesses/tax/all-taxes",
      isAvailable: submittedTotal + draftTotal > 0,
    },
    {
      text: "Submitted",
      total: submittedTotal || 0,
      path: "/staff-dashboard/businesses/tax/submitted-taxes",
      isAvailable: submittedTotal > 0,
    },
    {
      text: "Draft",
      total: draftTotal || 0,
      path: "/staff-dashboard/businesses/tax/draft-taxes",
      isAvailable: draftTotal > 0,
    },
    {
      text: "Paid Drafts",
      total: paidDraftTotal || 0,
      path: "/staff-dashboard/businesses/tax/paid-draft-taxes",
      isAvailable: paidDrafts?.length > 0,
    },
  ];

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
      title: submittedTotal > 0 ? "Submitted" : "",
      totalLength: submittedTotal,
    },
    {
      title: draftTotal > 0 ? "Drafts" : "",
      totalLength: draftTotal,
    },
  ];
  const matches = useMediaQuery("(max-width:700px)");
  //removing empty element from the array
  options = options.filter((el) => el?.title !== "");

  let pathNavigation = {
    All: "all-taxes",
    Submitted: "submitted-taxes",
    Drafts: "draft-taxes",
    "Paid Drafts": "paid-draft-taxes",
  };

  let isFirstNav =
    pathname === "/staff-dashboard/businesses/tax" && "/staff-dashboard/businesses/tax/all-taxes";

  const selectedValue = (option) => {
      navigate(`/staff-dashboard/businesses/tax/${pathNavigation[option?.title]}`)
    }
  return (
    <Container>
      {matches ? (
        <MobileStaff
          title={"Tax"}
          originalOptions={options} 
          initialTitle={"All"}
          initialLength={submittedTotal + draftTotal}
          realSelectedValue={selectedValue}
          mobile
        />
      ) : (
        <ProductHeader
          title="Taxes"
          searchPlaceholder="Search tax..."
          summary={summary}
          filterList={filterList}
          action={handleCategoryCreate}
          actionText="Create Tax"
          onSearchChange={handleSearch}
          navInfo={navInfo}
          defaultActive={isFirstNav}
        />
      )}
      {!allTotal && !isLoading ? (
        isError ? (
          <LoadingError />
        ) : (
          <EmptyContent
            emptyText="Users taxes requests will appear here when they create one"
            buttonText="Create Tax"
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
      )}
    </Container>
  );
};
export default StaffTax;
