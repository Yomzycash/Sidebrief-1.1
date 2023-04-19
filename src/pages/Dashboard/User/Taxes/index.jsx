import React, { useEffect, useState } from "react";
import { Container } from "./styled";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { removeComplyFromLocalStorage, removeLaunchFromLocalStorage } from "utils/globalFunctions";
import ProductHeader from "components/Header/ProductHeader";
import { useViewAllComplyByMetaQuery } from "services/complyService";
import { useGetServicesByCategoryQuery } from "services/staffService";
import EmptyContent from "components/EmptyContent";

//

const Tax = () => {
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const taxServices = useGetServicesByCategoryQuery("TAX");
  const allUserComply = useViewAllComplyByMetaQuery(
    { meta: userInfo.id },
    { refetchOnMountOrArgChange: true }
  );

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
      path: "/dashboard/tax/all-taxes",
      isAvailable: submittedTotal + draftTotal > 0,
    },
    {
      text: "Submitted",
      total: submittedTotal || 0,
      path: "/dashboard/tax/submitted-taxes",
      isAvailable: submittedTotal > 0,
    },
    {
      text: "Draft",
      total: draftTotal || 0,
      path: "/dashboard/tax/draft-taxes",
      isAvailable: draftTotal > 0,
    },
    {
      text: "Paid Drafts",
      total: paidDraftTotal || 0,
      path: "/dashboard/tax/paid-draft-taxes",
      isAvailable: paidDrafts?.length > 0,
    },
  ];

  let isFirstNav = pathname === "/dashboard/tax" && "/dashboard/tax/all-taxes";

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
          <EmptyContent emptyText="Your taxes will appear here." buttonText="Create Tax" />
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
export default Tax;
