import React, { useEffect, useState } from "react";
import { Container } from "./styled";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { removeComplyFromLocalStorage, removeLaunchFromLocalStorage } from "utils/globalFunctions";
import ProductHeader from "components/Header/ProductHeader";
import { useViewAllComplyByMetaQuery } from "services/complyService";
import { useGetServicesByCategoryQuery } from "services/staffService";
import EmptyContent from "components/EmptyContent";

//

const Manage = () => {
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const Manage = useGetServicesByCategoryQuery("MANAGE");
  const allUserComply = useViewAllComplyByMetaQuery(
    { meta: userInfo.id },
    { refetchOnMountOrArgChange: true }
  );

  const findManageId = (id) => Manage.data?.find((el) => el?.serviceId === id)?.serviceId;

  const ManageComplies = allUserComply.data?.filter(
    (el) => el?.serviceId === findManageId(el?.serviceId)
  );

  const submitted = ManageComplies?.filter((el) => el?.status?.toLowerCase() === "submitted");
  const drafts = ManageComplies?.filter((el) => el?.status?.toLowerCase() === "pending");
  const paidDrafts = ManageComplies?.filter(
    (el) => el?.status?.toLowerCase() === "pending" && el?.paid === true
  );
  const isLoading = Manage.isLoading || allUserComply.isLoading;
  const isError = Manage.isError || allUserComply.isError;
  const isSuccess = Manage.isSuccess && allUserComply.isSuccess;

  let submittedTotal = submitted?.length;
  let draftTotal = drafts?.length;
  let paidDraftTotal = paidDrafts?.length;
  let allTotal = ManageComplies?.length;

  const handleManageCreate = () => {
    removeLaunchFromLocalStorage();
    navigate("/services/manage");
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
      path: "/dashboard/manage/all-manage",
      isAvailable: submittedTotal + draftTotal > 0,
    },
    {
      text: "Submitted",
      total: submittedTotal || 0,
      path: "/dashboard/manage/submitted-manage",
      isAvailable: submittedTotal > 0,
    },
    {
      text: "Draft",
      total: draftTotal || 0,
      path: "/dashboard/manage/draft-manage",
      isAvailable: draftTotal > 0,
    },
    {
      text: "Paid Drafts",
      total: paidDraftTotal || 0,
      path: "/dashboard/manage/paid-draft-manage",
      isAvailable: paidDrafts?.length > 0,
    },
  ];

  let isFirstNav = pathname === "/dashboard/manage" && "/dashboard/manage/all-manage";

  return (
    <Container>
      <ProductHeader
        title="Manage"
        searchPlaceholder="Search manage..."
        summary={summary}
        filterList={filterList}
        action={handleManageCreate}
        actionText="Manage a Business"
        onSearchChange={handleSearch}
        navInfo={navInfo}
        defaultActive={isFirstNav}
      />
      {!allTotal && !isLoading ? (
        isError ? (
          <>There is an error loading this page</>
        ) : (
          <EmptyContent
            emptyText="Your manage requests will appear here. Manage your business now."
            buttonText="Manage a Business"
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
export default Manage;
