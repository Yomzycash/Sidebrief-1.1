import { useNavigate } from "react-router-dom";
import { useViewAllComplyByMetaQuery } from "services/complyService";
import { useGetServicesByCategoryQuery } from "services/staffService";
import { removeComplyFromLocalStorage } from "utils/globalFunctions";

export const useCategoriesActions = ({ category, createPath }) => {
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const CategoryServices = useGetServicesByCategoryQuery(category);
  const allUserComply = useViewAllComplyByMetaQuery(
    { meta: userInfo?.id },
    { refetchOnMountOrArgChange: true }
  );

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

  const handleCategoryCreate = () => {
    removeComplyFromLocalStorage();
    navigate(createPath);
  };

  return {
    submitted,
    drafts,
    paidDrafts,
    isLoading,
    isError,
    isSuccess,
    complyFullInfo,
    handleCategoryCreate,
  };
};
