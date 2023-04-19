import React, { useEffect, useState } from "react";
import { Container } from "./styled";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { removeComplyFromLocalStorage, removeLaunchFromLocalStorage } from "utils/globalFunctions";
import ProductHeader from "components/Header/ProductHeader";
import { useViewAllComplyByMetaQuery, useViewAllComplyQuery } from "services/complyService";
import { useGetServicesByCategoryQuery } from "services/staffService";

//

const StaffOnboarded = () => {
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const Onboard = useGetServicesByCategoryQuery("Onboard");
  const allUserComply = useViewAllComplyQuery();

  const findOnboardId = (id) => Onboard.data?.find((el) => el?.serviceId === id)?.serviceId;

  const OnboardedComplies = allUserComply.data?.filter(
    (el) => el?.serviceId === findOnboardId(el?.serviceId)
  );

  console.log(allUserComply);
  const submitted = OnboardedComplies?.filter((el) => el?.status?.toLowerCase() === "submitted");
  const drafts = OnboardedComplies?.filter((el) => el?.status?.toLowerCase() === "pending");
  const isLoading = Onboard.isLoading || allUserComply.isLoading;
  const isError = Onboard.isError || allUserComply.isError;
  const isSuccess = Onboard.isSuccess && allUserComply.isSuccess;

  let submittedTotal = submitted?.length;
  let draftTotal = drafts?.length;

  const handleOnboardCreate = () => {
    removeLaunchFromLocalStorage();
    navigate("/services/onboarded");
  };

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
      path: "/staff-dashboard/businesses/onboarded/all-onboarded",
    },
    {
      text: "Submitted",
      total: submittedTotal || 0,
      path: "/staff-dashboard/businesses/onboarded/submitted-onboarded",
    },
    {
      text: "Draft",
      total: draftTotal || 0,
      path: "/staff-dashboard/businesses/onboarded/draft-onboarded",
    },
  ];

  let isFirstNav =
    pathname === "/staff-dashboard/businesses/onboarded" &&
    "/staff-dashboard/businesses/onboarded/all-onboarded";

  return (
    <Container>
      <ProductHeader
        title="Onboarded"
        searchPlaceholder="Search onboarded..."
        summary={summary}
        filterList={filterList}
        action={handleOnboardCreate}
        actionText="Onboard a Business"
        onSearchChange={handleSearch}
        navInfo={navInfo}
        defaultActive={isFirstNav}
      />
      <Outlet context={{ submitted, drafts, searchValue, isLoading, isError, isSuccess }} />
    </Container>
  );
};
export default StaffOnboarded;
