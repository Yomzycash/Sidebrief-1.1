import React, { useEffect, useState } from "react";
import { Container, ButtonContainer, LastWrapper } from "./styled";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { removeComplyFromLocalStorage } from "utils/globalFunctions";
import ProductHeader from "components/Header/ProductHeader";
import EmptyContent from "components/Fallbacks/EmptyContent";
import { useCategoriesActions } from "../../actions";
import LoadingError from "components/Fallbacks/LoadingError";
import { useMediaQuery } from "@mui/material";
import MobileBusiness from "layout/MobileBusiness";
import { ReactComponent as NoteIcon } from "asset/images/note.svg";



//

const Tax = () => {
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
      path: "/dashboard/my-products/tax/all-taxes",
      isAvailable: submittedTotal + draftTotal > 0,
    },
    {
      text: "Submitted",
      total: submittedTotal || 0,
      path: "/dashboard/my-products/tax/submitted-taxes",
      isAvailable: submittedTotal > 0,
    },
    {
      text: "Draft",
      total: draftTotal || 0,
      path: "/dashboard/my-products/tax/draft-taxes",
      isAvailable: draftTotal > 0,
    },
    {
      text: "Paid Drafts",
      total: paidDraftTotal || 0,
      path: "/dashboard/my-products/tax/paid-draft-taxes",
      isAvailable: paidDrafts?.length > 0,
    },
  ];

  let isFirstNav =
    pathname === "/dashboard/my-products/tax" && "/dashboard/my-products/tax/all-taxes";
    const matches = useMediaQuery("(max-width:700px)");
    let pathNavigation = {
      All: "all",
      Submitted: "submitted",
      Drafts: "draft",
      "Paid Drafts": "paid-draft",
    };
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
    options = options.filter((el) => el?.title !== "");
  
    const navigate = useNavigate();
    const selectedValue = (option) => {
      navigate(`/dashboard/my-products/tax/${pathNavigation[option?.title]}-taxes`);
  };
  const handleTax = () => {
    navigate("/services/manage");
  };


  return (
    <Container>
       {matches ? (
        <MobileBusiness
        realSelectedValue={selectedValue}
        originalOptions={options}
        initialTitle={"All"}
        initialLength={submittedTotal + draftTotal}
        mobile
        title={"Taxes"}/>
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
      />)}
      {!allTotal && !isLoading ? (
        isError ? (
          <LoadingError />
        ) : (
          <EmptyContent
            emptyText="Your taxes will appear here."
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
      {matches && (
        <LastWrapper>
          <ButtonContainer>
            <button onClick={handleTax}>
              <NoteIcon />
             Create Tax
            </button>
          </ButtonContainer>
        </LastWrapper>
      )}
      
    </Container>
  );
};
export default Tax;
