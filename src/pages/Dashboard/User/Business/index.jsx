import React, { useEffect, useState } from "react";
import { Container } from "./styled";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { setBusinessesShown, setGeneratedLaunchCode, setLaunchResponse } from "redux/Slices";
import { store } from "redux/Store";
import {
  useGetUserDraftQuery,
  useGetUserSubmittedQuery,
  useViewPayLaunchMutation,
} from "services/launchService";
import { useSelector } from "react-redux";
import { navigateToDetailPage, removeLaunchFromLocalStorage } from "utils/globalFunctions";
import ProductHeader from "components/Header/ProductHeader";

//

const Business = () => {
  const [searchValue, setSearchValue] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const drafts = useGetUserDraftQuery({
    refetchOnMountOrArgChange: true,
  });
  const submitted = useGetUserSubmittedQuery({
    refetchOnMountOrArgChange: true,
  });

  const businessesShown = useSelector((store) => store.BusinessesInfo.businessesShown);

  let submittedTotal = submitted?.currentData?.length;
  let draftTotal = drafts?.currentData?.length;

  const handleLaunch = () => {
    store.dispatch(setGeneratedLaunchCode(""));
    store.dispatch(setLaunchResponse({}));
    removeLaunchFromLocalStorage();
    navigate("/launch");
  };

  // This sets the shown of all rewards
  useEffect(() => {
    if (location.pathname === "/dashboard/businesses/all-businesses")
      store.dispatch(
        setBusinessesShown({
          total: submittedTotal + draftTotal,
          shown: submittedTotal + draftTotal,
        })
      );
    if (location.pathname === "/dashboard/businesses/submitted-applications")
      store.dispatch(
        setBusinessesShown({
          total: submittedTotal,
          shown: submittedTotal,
        })
      );
    if (location.pathname === "/dashboard/businesses/draft-applications")
      store.dispatch(setBusinessesShown({ total: draftTotal, shown: draftTotal }));
  }, [location.pathname, draftTotal, submittedTotal]);

  useEffect(() => {
    // clear the localstorage when this page is entered
    store.dispatch(setGeneratedLaunchCode(""));
    store.dispatch(setLaunchResponse({}));
    removeLaunchFromLocalStorage();
  }, []);

  const handleSearch = (e) => {
    let value = e.target.value;
    setSearchValue(value);
  };

  const summary = {
    current: businessesShown.shown || 0,
    total: businessesShown.total || 0,
  };

  const filterList = ["All", "Onboarded", "Launched"];

  const navInfo = [
    {
      text: "All",
      total: submittedTotal + draftTotal || 0,
      path: "/dashboard/businesses/all-businesses",
    },
    {
      text: "Submitted",
      total: submittedTotal || 0,
      path: "/dashboard/businesses/submitted-applications",
    },
    {
      text: "Draft",
      total: draftTotal || 0,
      path: "/dashboard/businesses/draft-applications",
    },
  ];

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
      />
      <Outlet context={{ submitted, drafts, searchValue }} />
    </Container>
  );
};
export default Business;
