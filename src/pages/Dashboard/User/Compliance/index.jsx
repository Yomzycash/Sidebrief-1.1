import React, { useEffect, useState } from "react";
import { Container } from "./styled";
import { Outlet, useLocation } from "react-router-dom";
import { removeComplyFromLocalStorage } from "utils/globalFunctions";
import ProductHeader from "components/Header/ProductHeader";
import EmptyContent from "components/EmptyContent";
import { useCategoriesActions } from "../actions";

//

const Compliance = () => {
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
      path: "/dashboard/my-products/compliance/all-compliances",
      isAvailable: submittedTotal + draftTotal > 0,
    },
    {
      text: "Submitted",
      total: submittedTotal || 0,
      path: "/dashboard/my-products/compliance/submitted-compliances",
      isAvailable: submittedTotal > 0,
    },
    {
      text: "Draft",
      total: draftTotal || 0,
      path: "/dashboard/my-products/compliance/draft-compliances",
      isAvailable: draftTotal > 0,
    },
    {
      text: "Paid Drafts",
      total: paidDraftTotal || 0,
      path: "/dashboard/my-products/compliance/paid-draft-compliances",
      isAvailable: paidDrafts?.length > 0,
    },
  ];

  let isFirstNav =
    pathname === "/dashboard/my-products/compliance" &&
    "/dashboard/my-products/compliance/all-compliances";

  return (
    <Container>
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
      {!allTotal && !isLoading ? (
        isError ? (
          <>There is an error loading this page</>
        ) : (
          <EmptyContent
            emptyText="Your compliances will appear here."
            buttonText="Onboard a Business"
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
export default Compliance;
