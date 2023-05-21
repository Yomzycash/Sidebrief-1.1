import React, { useEffect, useState } from "react";
import { Container } from "./styled";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MobileStaff from "layout/MobileStaff";
import { useMediaQuery } from "@mui/material";
import { removeComplyFromLocalStorage } from "utils/globalFunctions";
import ProductHeader from "components/Header/ProductHeader";
import EmptyContent from "components/Fallbacks/EmptyContent";
import { useCategoriesActions } from "../actions";
import LoadingError from "components/Fallbacks/LoadingError";

//

const StaffCompliance = () => {
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
  } = useCategoriesActions({ category: "Compliance", createPath: "/services/compliance" });

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
      path: "/staff-dashboard/businesses/compliance/all-compliance",
      isAvailable: submittedTotal + draftTotal > 0,
    },
    {
      text: "Submitted",
      total: submittedTotal || 0,
      path: "/staff-dashboard/businesses/compliance/submitted-compliance",
      isAvailable: submittedTotal > 0,
    },
    {
      text: "Draft",
      total: draftTotal || 0,
      path: "/staff-dashboard/businesses/compliance/draft-compliance",
      isAvailable: draftTotal > 0,
    },
    {
      text: "Paid Drafts",
      total: paidDraftTotal || 0,
      path: "/staff-dashboard/businesses/compliance/paid-draft-compliance",
      isAvailable: paidDrafts?.length > 0,
    },
  ];

  let isFirstNav =
    pathname === "/staff-dashboard/businesses/compliance" &&
    "/staff-dashboard/businesses/compliance/all-compliance";

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
  
    //removing empty element from the array
    options = options.filter((el) => el?.title !== "");
  
    let pathNavigation = {
      All: "all-compliance",
      Submitted: "submitted-compliance",
      Drafts: "draft-compliance",
      "Paid Drafts": "paid-draft-compliance",
    };

    const selectedValue = (option) => {
      navigate(`/staff-dashboard/businesses/compliance/${pathNavigation[option?.title]}`)
    }

  return (
    <Container>
      { matches ? (
        <MobileStaff
          title={"Compliance"}
          originalOptions={options} 
          initialTitle={"All"}
          initialLength={submittedTotal + draftTotal}
          realSelectedValue={selectedValue}
          mobile
        />
      ) : (
        <ProductHeader
          title="Compliance"
          searchPlaceholder="Search compliance..."
          summary={summary}
          filterList={filterList}
          action={handleCategoryCreate}
          actionText="Create a Compliance"
          onSearchChange={handleSearch}
          navInfo={navInfo}
          defaultActive={isFirstNav}
      />
      )

      }
      {!allTotal && !isLoading ? (
        isError ? (
          <LoadingError />
        ) : (
          <EmptyContent
            emptyText="Users compliance requests will appear here when they create one"
            buttonText="Create a Compliance"
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
export default StaffCompliance;
