import { compareDesc } from "date-fns";

export const useBusinessActions = ({ searchValue, hasFetched, setDataArr }) => {
  //
  const sortData = (data) => {
    if (hasFetched) {
      const sortedData = [...data].sort((launch1, launch2) => {
        return compareDesc(new Date(launch1.createdAt), new Date(launch2.createdAt));
      });
      setDataArr(sortedData);
      return sortedData;
    }
  };

  //
  const filterWhenSearched = (data) => {
    if (searchValue && hasFetched) {
      const filteredDataArr = data?.filter((el) => {
        const { businessName1, businessName2, businessName3, businessName4 } = el.businessNames;
        return (
          includesSearched(businessName1, searchValue) ||
          includesSearched(businessName2, searchValue) ||
          includesSearched(businessName3, searchValue) ||
          includesSearched(businessName4, searchValue)
        );
      });
      setDataArr(sortData(filteredDataArr));
    } else if (hasFetched && searchValue === "") setDataArr(sortData(data));
  };

  //
  const includesSearched = (text, searchValue) => {
    return text?.toLowerCase()?.includes(searchValue?.toLowerCase());
  };

  return { sortData, filterWhenSearched, includesSearched };
};
