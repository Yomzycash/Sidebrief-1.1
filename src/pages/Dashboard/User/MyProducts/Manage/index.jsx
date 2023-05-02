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

const Manage = () => {
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
      path: "/dashboard/my-products/manage/all-manage",
      isAvailable: submittedTotal + draftTotal > 0,
    },
    {
      text: "Submitted",
      total: submittedTotal || 0,
      path: "/dashboard/my-products/manage/submitted-manage",
      isAvailable: submittedTotal > 0,
    },
    {
      text: "Draft",
      total: draftTotal || 0,
      path: "/dashboard/my-products/manage/draft-manage",
      isAvailable: draftTotal > 0,
    },
    {
      text: "Paid Drafts",
      total: paidDraftTotal || 0,
      path: "/dashboard/my-products/manage/paid-draft-manage",
      isAvailable: paidDrafts?.length > 0,
    },
  ];

  let isFirstNav =
    pathname === "/dashboard/my-products/manage" && "/dashboard/my-products/manage/all-manage";
    const matches = useMediaQuery("(max-width:700px)");
    let pathNavigation = {
      All: "all",
      Submitted: "submitted",
      Drafts: "draft",
      "Paid Drafts": "paid-draft",
    };
    const options = ["All", "Submitted", "Drafts", "Paid Drafts"];
  
    const navigate = useNavigate();
    const selectedValue = (option) => {
      navigate(`/dashboard/my-products/manage/${pathNavigation[option]}-manage`);
  };
  const handleManage = () => {
    navigate("/services/manage");
  };

  return (
    <Container>
      
      
      {matches ? (
        <MobileBusiness options={options} title={"Manage"} selectedValue={selectedValue} />
      ) : (
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
      /> )}
      {!allTotal && !isLoading ? (
        isError ? (
          <LoadingError />
        ) : (
          <EmptyContent
            emptyText="Your manage requests will appear here. Manage a business now."
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
      )}
      {matches && (
        <LastWrapper>
          <ButtonContainer>
            <button onClick={handleManage}>
              <NoteIcon />
             Manage a Business
            </button>
          </ButtonContainer>
        </LastWrapper>
      )}
      
    </Container>
  );
};
export default Manage;
