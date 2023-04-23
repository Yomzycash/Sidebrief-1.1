import React, { useEffect, useState } from "react";
import { Container } from "./styled";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { removeComplyFromLocalStorage, removeLaunchFromLocalStorage } from "utils/globalFunctions";
import ProductHeader from "components/Header/ProductHeader";
import { useViewAllComplyQuery } from "services/complyService";
import { useGetServicesByCategoryQuery } from "services/staffService";
import EmptyContent from "components/Fallbacks/EmptyContent";

//

const StaffTax = () => {
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const taxServices = useGetServicesByCategoryQuery("TAX");
  const allUserComply = useViewAllComplyQuery();

  const findTaxId = (id) => taxServices.data?.find((el) => el?.serviceId === id)?.serviceId;

  const taxComplies = allUserComply.data?.filter(
    (el) => el?.serviceId === findTaxId(el?.serviceId)
  );

  const submitted = taxComplies?.filter((el) => el?.status?.toLowerCase() === "submitted");
  const drafts = taxComplies?.filter((el) => el?.status?.toLowerCase() === "pending");
  const paidDrafts = taxComplies?.filter(
    (el) => el?.status?.toLowerCase() === "pending" && el?.paid === true
  );
  const isLoading = taxServices.isLoading || allUserComply.isLoading;
  const isError = taxServices.isError || allUserComply.isError;
  const isSuccess = taxServices.isSuccess && allUserComply.isSuccess;

  let submittedTotal = submitted?.length;
  let draftTotal = drafts?.length;
  let paidDraftTotal = paidDrafts?.length;
  let allTotal = taxComplies?.length;

  const handleTaxCreate = () => {
    removeLaunchFromLocalStorage();
    navigate("/services/tax");
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

  let isFirstNav =
    pathname === "/staff-dashboard/businesses/tax" && "/staff-dashboard/businesses/tax/all-taxes";

  return (
    <Container>
      <ProductHeader
        title="Taxes"
        searchPlaceholder="Search tax..."
        summary={summary}
        filterList={filterList}
        action={handleTaxCreate}
        actionText="Create Tax"
        onSearchChange={handleSearch}
        navInfo={navInfo}
        defaultActive={isFirstNav}
      />
      {!allTotal && !isLoading ? (
        isError ? (
          <>There is an error loading this page</>
        ) : (
          <EmptyContent
            emptyText="Users taxes requests will appear here when they create one"
            buttonText="Create Tax"
            action={handleTaxCreate}
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
