import React, { useState } from "react";
import { Container } from "./styled";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { setGeneratedLaunchCode, setLaunchResponse } from "redux/Slices";
import { store } from "redux/Store";
import { useGetUserDraftQuery, useGetUserSubmittedQuery } from "services/launchService";
import { removeLaunchFromLocalStorage } from "utils/globalFunctions";
import ProductHeader from "components/Header/ProductHeader";
import LoadingError from "components/Fallbacks/LoadingError";
import EmptyContent from "components/Fallbacks/EmptyContent";

//

const MyProductsIndex = () => {
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

  return (
    <Container>
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
    </Container>
  );
};
export default MyProductsIndex;
