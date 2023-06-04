import { compareAsc } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useViewAllComplyByMetaQuery, useViewAllComplyQuery } from "services/complyService";
import { useGetServicesByCategoryQuery } from "services/staffService";
import { removeComplyFromLocalStorage } from "utils/globalFunctions";

export const useUserManagementActions = ({ category, dataArr, setDataArr }) => {
  const CategoryServices = useGetServicesByCategoryQuery(category, { skip: !category });
  const allUserComply = useViewAllComplyQuery();

  const getServiceInfo = (id) => CategoryServices.data?.find((el) => el?.serviceId === id);

  const CategoryComplies = allUserComply.data?.filter(
    (el) => el?.serviceId === getServiceInfo(el?.serviceId)?.serviceId
  );

  const complyFullInfo = CategoryComplies?.map((el) => {
    let serviceInfo = getServiceInfo(el?.serviceId);
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
    let dataCopy = dataArr;
    if (option?.toLowerCase() === "new users") {
      dataCopy = dataArr?.sort((a, b) =>
        compareAsc(new Date(b?.createdAt), new Date(a?.createdAt))
      );
    } else if (option?.toLowerCase() === "old users") {
      dataCopy = dataArr?.sort((a, b) =>
        compareAsc(new Date(a?.createdAt), new Date(b?.createdAt))
      );
    }
    setDataArr([...dataCopy]);
  };

  // Runs when the table row is clicked
  const handleTableClick = (data, row, col) => {
    console.log(data, row, col);
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
  };
};
