import React, { useEffect, useState } from "react";
import { Container } from "./styled";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { removeComplyFromLocalStorage, removeLaunchFromLocalStorage } from "utils/globalFunctions";
import ProductHeader from "components/Header/ProductHeader";
import { useViewAllComplyByMetaQuery, useViewAllComplyQuery } from "services/complyService";
import { useGetServicesByCategoryQuery } from "services/staffService";

//

const StaffManage = () => {
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const Manage = useGetServicesByCategoryQuery("MANAGE");
  const allUserComply = useViewAllComplyQuery();

  const findManageId = (id) => Manage.data?.find((el) => el?.serviceId === id)?.serviceId;

  const ManageComplies = allUserComply.data?.filter(
    (el) => el?.serviceId === findManageId(el?.serviceId)
  );

  const submitted = ManageComplies?.filter((el) => el?.status?.toLowerCase() === "submitted");
  const drafts = ManageComplies?.filter((el) => el?.status?.toLowerCase() === "pending");
  const isLoading = Manage.isLoading || allUserComply.isLoading;
  const isError = Manage.isError || allUserComply.isError;
  const isSuccess = Manage.isSuccess && allUserComply.isSuccess;

  let submittedTotal = submitted?.length;
  let draftTotal = drafts?.length;

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
      path: "/staff-dashboard/businesses/manage/all-manage",
    },
    {
      text: "Submitted",
      total: submittedTotal || 0,
      path: "/staff-dashboard/businesses/manage/submitted-manage",
    },
    {
      text: "Draft",
      total: draftTotal || 0,
      path: "/staff-dashboard/businesses/manage/draft-manage",
    },
  ];

  let isFirstNav =
    pathname === "/staff-dashboard/businesses/manage" &&
    "/staff-dashboard/businesses/manage/all-manage";

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
      <Outlet context={{ submitted, drafts, searchValue, isLoading, isError, isSuccess }} />
    </Container>
  );
};
export default StaffManage;
