import React, { useEffect, useState } from "react";
import { Container } from "./styled";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { removeComplyFromLocalStorage, removeLaunchFromLocalStorage } from "utils/globalFunctions";
import ProductHeader from "components/Header/ProductHeader";
import { useViewAllComplyByMetaQuery } from "services/complyService";
import { useGetServicesByCategoryQuery } from "services/staffService";
import EmptyContent from "components/EmptyContent";

//

const Compliance = () => {
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const Compliance = useGetServicesByCategoryQuery("Compliance");
  const allUserComply = useViewAllComplyByMetaQuery(
    { meta: userInfo?.id },
    { refetchOnMountOrArgChange: true }
  );

  const findComplianceId = (id) => Compliance.data?.find((el) => el?.serviceId === id)?.serviceId;

  const ComplianceComplies = allUserComply.data?.filter(
    (el) => el?.serviceId === findComplianceId(el?.serviceId)
  );

  const submitted = ComplianceComplies?.filter((el) => el?.status?.toLowerCase() === "submitted");
  const drafts = ComplianceComplies?.filter((el) => el?.status?.toLowerCase() === "pending");
  const paidDrafts = ComplianceComplies?.filter(
    (el) => el?.status?.toLowerCase() === "pending" && el?.paid === true
  );
  const isLoading = Compliance.isLoading || allUserComply.isLoading;
  const isError = Compliance.isError || allUserComply.isError;
  const isSuccess = Compliance.isSuccess && allUserComply.isSuccess;

  let submittedTotal = submitted?.length;
  let draftTotal = drafts?.length;
  let paidDraftTotal = paidDrafts?.length;
  let allTotal = ComplianceComplies?.length;

  const handleComplianceCreate = () => {
    removeLaunchFromLocalStorage();
    navigate("/services/compliance");
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
        action={handleComplianceCreate}
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
            action={handleComplianceCreate}
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
