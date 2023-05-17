import { useNavigate } from "react-router-dom";
import { useViewAllComplyQuery } from "services/complyService";
import { useGetServicesByCategoryQuery } from "services/staffService";
import { removeComplyFromLocalStorage } from "utils/globalFunctions";
import { compareDesc } from "date-fns";

export const useCategoriesActions = ({
  category,
  createPath,
  searchValue,
  hasFetched,
  setDataArr,
}) => {
  const navigate = useNavigate();

  const CategoryServices = useGetServicesByCategoryQuery(category, { skip: !category });
  const allUsersComply = useViewAllComplyQuery();

  const getServiceInfo = (id) => CategoryServices.data?.find((el) => el?.serviceId === id);

  const CategoryComplies = allUsersComply.data?.filter(
    (el) => el?.serviceId === getServiceInfo(el?.serviceId)?.serviceId
  );

  const complyFullInfo = CategoryComplies?.map((el) => {
    let serviceInfo = getServiceInfo(el?.serviceId);
    return {
      ...serviceInfo,
      ...el,
    };
  });

  const submitted = complyFullInfo?.filter((el) => el?.status?.toLowerCase() === "submitted");
  const drafts = complyFullInfo?.filter((el) => el?.status?.toLowerCase() === "pending");
  const paidDrafts = complyFullInfo?.filter(
    (el) => el?.status?.toLowerCase() === "pending" && el?.paid === true
  );
  const isLoading = CategoryServices.isLoading || allUsersComply.isLoading;
  const isError = CategoryServices.isError || allUsersComply.isError;
  const isSuccess = CategoryServices.isSuccess && allUsersComply.isSuccess;

  const handleCategoryCreate = () => {
    removeComplyFromLocalStorage();
    navigate(createPath);
  };

  //

  //  Sorts data by date
  const sortData = (data) => {
    if (hasFetched) {
      const sortedData = [...data].sort((el1, el2) => {
        return compareDesc(new Date(el1.createdAt), new Date(el2.createdAt));
      });
      setDataArr(sortedData);
      return sortedData;
    }
    return data;
  };

  //Filters data by search valuoe
  const filterWhenSearched = (data) => {
    if (searchValue && hasFetched) {
      const filteredDataArr = data?.filter((el) => {
        const {
          serviceCategory,
          serviceCountry,
          serviceCurrency,
          serviceDescription,
          serviceName,
        } = el;
        return (
          includesSearched(serviceCategory, searchValue) ||
          includesSearched(serviceCountry, searchValue) ||
          includesSearched(serviceCurrency, searchValue) ||
          includesSearched(serviceName, searchValue) ||
          includesSearched(serviceDescription, searchValue)
        );
      });
      setDataArr(sortData(filteredDataArr));
    } else if (hasFetched && searchValue === "") setDataArr(sortData(data));
  };

  //
  const includesSearched = (text, searchValue) => {
    return text?.toLowerCase()?.includes(searchValue?.toLowerCase());
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
    sortData,
    filterWhenSearched,
    includesSearched,
    allUsersComply,
    CategoryServices,
  };
};
