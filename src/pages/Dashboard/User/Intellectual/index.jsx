import React, { useEffect, useState } from "react";
import { Container } from "./styled";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { removeComplyFromLocalStorage, removeLaunchFromLocalStorage } from "utils/globalFunctions";
import ProductHeader from "components/Header/ProductHeader";
import { useViewAllComplyByMetaQuery } from "services/complyService";
import { useGetServicesByCategoryQuery } from "services/staffService";
import EmptyContent from "components/EmptyContent";

//

const Intellectual = () => {
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const Intellectuals = useGetServicesByCategoryQuery("Intellectual Property");
  const allUserComply = useViewAllComplyByMetaQuery(
    { meta: userInfo?.id },
    { refetchOnMountOrArgChange: true }
  );

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
  const isSuccess = Intellectuals.isSuccess && allUserComply.isSuccess;
  const isError = Intellectuals.isError || allUserComply.isError;

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
      total: allTotal || 0,
      path: "/dashboard/my-products/intellectual-property/all-intellectual-properties",
      isAvailable: submittedTotal + draftTotal > 0,
    },
    {
      text: "Submitted",
      total: submittedTotal || 0,
      path: "/dashboard/my-products/intellectual-property/submitted-intellectual-properties",
      isAvailable: submittedTotal > 0,
    },
    {
      text: "Drafts",
      total: draftTotal || 0,
      path: "/dashboard/my-products/intellectual-property/draft-intellectual-properties",
      isAvailable: draftTotal > 0,
    },
    {
      text: "Paid Drafts",
      total: paidDraftTotal || 0,
      path: "/dashboard/my-products/intellectual-property/paid-draft-intellectual-properties",
      isAvailable: paidDrafts?.length > 0,
    },
  ];

  let isFirstNav =
    pathname === "/dashboard/my-products/intellectual-property" &&
    "/dashboard/my-products/intellectual-property/all-intellectual-properties";

  return (
    <Container>
      <ProductHeader
        title="Intellectual Property"
        searchPlaceholder="Search intellectual property..."
        summary={summary}
        filterList={filterList}
        action={handleIntellectualCreate}
        actionText="Create Intellectual Property"
        emptyText="Your businesses will appear here when you launch one"
        onSearchChange={handleSearch}
        navInfo={navInfo}
        defaultActive={isFirstNav}
      />
      {!allTotal && !isLoading ? (
        isError ? (
          <>There is an error loading this page</>
        ) : (
          <EmptyContent
            emptyText="Your intellectual properties will appear here when you create one"
            buttonText="Create Intellectual Property"
            action={handleIntellectualCreate}
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
export default Intellectual;
