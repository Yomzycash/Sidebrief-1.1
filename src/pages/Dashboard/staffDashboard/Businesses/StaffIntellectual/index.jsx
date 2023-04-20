import React, { useEffect, useState } from "react";
import { Container } from "./styled";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { removeComplyFromLocalStorage, removeLaunchFromLocalStorage } from "utils/globalFunctions";
import ProductHeader from "components/Header/ProductHeader";
import { useViewAllComplyByMetaQuery, useViewAllComplyQuery } from "services/complyService";
import { useGetServicesByCategoryQuery } from "services/staffService";
import EmptyContent from "components/EmptyContent";

//

const StaffIntellectual = () => {
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const Intellectuals = useGetServicesByCategoryQuery("Intellectual Property");
  const allUserComply = useViewAllComplyQuery();

  const findIntellectualId = (id) =>
    Intellectuals.data?.find((el) => el?.serviceId === id)?.serviceId;

  const intellectualComplies = allUserComply.data?.filter(
    (el) => el?.serviceId === findIntellectualId(el?.serviceId)
  );

  const submitted = intellectualComplies?.filter((el) => el?.status?.toLowerCase() === "submitted");
  const drafts = intellectualComplies?.filter((el) => el?.status?.toLowerCase() === "pending");
  const paidDrafts = intellectualComplies?.filter(
    (el) => el?.status?.toLowerCase() === "pending" && el?.paid === true
  );
  const isLoading = Intellectuals.isLoading || allUserComply.isLoading;
  const isError = Intellectuals.isError || allUserComply.isError;
  const isSuccess = Intellectuals.isSuccess && allUserComply.isSuccess;

  let submittedTotal = submitted?.length;
  let draftTotal = drafts?.length;
  let paidDraftTotal = paidDrafts?.length;
  let allTotal = intellectualComplies?.length;

  const handleIntellectualCreate = () => {
    removeLaunchFromLocalStorage();
    navigate("/services/intellectual-property");
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
      path: "/staff-dashboard/businesses/intellectual-property/all-intellectual-properties",
      isAvailable: submittedTotal + draftTotal > 0,
    },
    {
      text: "Submitted",
      total: submittedTotal || 0,
      path: "/staff-dashboard/businesses/intellectual-property/submitted-intellectual-properties",
      isAvailable: submittedTotal > 0,
    },
    {
      text: "Draft",
      total: draftTotal || 0,
      path: "/staff-dashboard/businesses/intellectual-property/draft-intellectual-properties",
      isAvailable: draftTotal > 0,
    },
    {
      text: "Paid Drafts",
      total: paidDraftTotal || 0,
      path: "/staff-dashboard/businesses/intellectual-property/paid-draft-intellectual-properties",
      isAvailable: paidDrafts?.length > 0,
    },
  ];

  let isFirstNav =
    pathname === "/staff-dashboard/businesses/intellectual-property" &&
    "/staff-dashboard/businesses/intellectual-property/all-intellectual-properties";

  return (
    <Container>
      <ProductHeader
        title="Intellectual Property"
        searchPlaceholder="Search intellectual property..."
        summary={summary}
        filterList={filterList}
        action={handleIntellectualCreate}
        actionText="Create Intellectual Property"
        onSearchChange={handleSearch}
        navInfo={navInfo}
        defaultActive={isFirstNav}
      />
      {!allTotal && !isLoading ? (
        isError ? (
          <>There is an error loading this page</>
        ) : (
          <EmptyContent
            emptyText="Users intellectual properties requests will appear here when they create one"
            buttonText="Create Intellectual Property"
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
export default StaffIntellectual;