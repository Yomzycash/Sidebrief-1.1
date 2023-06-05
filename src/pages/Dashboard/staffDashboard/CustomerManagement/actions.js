import {
  compareAsc,
  format,
  getYear,
  isFirstDayOfMonth,
  isSameDay,
  isSameMonth,
  isSameYear,
} from "date-fns";
import { useNavigate } from "react-router-dom";
import { useViewAllComplyByMetaQuery, useViewAllComplyQuery } from "services/complyService";
import { useGetServicesByCategoryQuery } from "services/staffService";
import { removeComplyFromLocalStorage } from "utils/globalFunctions";

export const useUserManagementActions = ({ category, usersData, setUsersData, calendarValue }) => {
  const navigate = useNavigate();

  const CategoryServices = useGetServicesByCategoryQuery(category, { skip: !category });
  const allUserComply = useViewAllComplyQuery();

  const getServiceInfo = (id) => CategoryServices.data?.find((el) => el?.serviceId === id);

  const CategoryComplies = allUserComply.data?.filter(
    (el) => el?.serviceId === getServiceInfo(el?.serviceId)?.serviceId
  );

  const complyFullInfo = CategoryComplies?.map((el) => {
    const serviceInfo = getServiceInfo(el?.serviceId);

    return {
      ...el,
      ...serviceInfo,
    };
  });

  const submitted = complyFullInfo?.filter((el) => el?.status?.toLowerCase() === "submitted");
  const drafts = complyFullInfo?.filter((el) => el?.status?.toLowerCase() === "pending");
  const paidDrafts = complyFullInfo?.filter(
    (el) => el?.status?.toLowerCase() === "pending" && el?.paid === true
  );
  const isLoading = CategoryServices.isLoading || allUserComply.isLoading;
  const isError = CategoryServices.isError || allUserComply.isError;
  const isSuccess = CategoryServices.isSuccess && allUserComply.isSuccess;

  // Sort data
  const handleSort = (option) => {
    let dataCopy = usersData;
    if (option?.toLowerCase() === "new users") {
      dataCopy = usersData?.sort((a, b) =>
        compareAsc(new Date(b?.createdAt), new Date(a?.createdAt))
      );
    } else if (option?.toLowerCase() === "old users") {
      dataCopy = usersData?.sort((a, b) =>
        compareAsc(new Date(a?.createdAt), new Date(b?.createdAt))
      );
    }
    setUsersData([...dataCopy]);
  };

  // Runs when the table row is clicked
  const handleTableClick = (data, row, col) => {
    navigate(`/staff-dashboard/customer-management/users/${data?._id}`);
    console.log(data, row, col);
  };

  // Formats the selected date
  const formatDate = () => {
    const sameDay = isFirstDayOfMonth(new Date(calendarValue));
    const prefix = !sameDay ? "1st - " : "";
    const day = format(calendarValue, "do");
    const month = format(calendarValue, "LLLL");
    const year = getYear(new Date(calendarValue));

    if (isSameYear(new Date(), new Date(calendarValue))) {
      if (isSameMonth(new Date(), new Date(calendarValue))) {
        return `this month (${prefix}${day})`;
      } else {
        return `in ${month} (${prefix} ${day})`;
      }
    } else {
      return `in 1st - ${day} ${month}, ${year}`;
    }
  };

  return {
    submitted,
    drafts,
    paidDrafts,
    isLoading,
    isError,
    isSuccess,
    complyFullInfo,
    handleSort,
    handleTableClick,
    formatDate,
  };
};
