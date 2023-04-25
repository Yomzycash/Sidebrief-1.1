import { compareDesc } from "date-fns";

export const useActions = ({ searchValue, hasFetched, setDataArr }) => {
  //
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

  //
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

  return { sortData, filterWhenSearched, includesSearched };
};
