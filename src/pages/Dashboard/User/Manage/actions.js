import { compareDesc } from "date-fns";

export const useTaxActions = ({ searchValue, hasFetched, setDataArr }) => {
  //
  const sortData = (data) => {
    if (hasFetched) {
      const sortedData = [...data].sort((manage1, manage2) => {
        return compareDesc(new Date(manage1.createdAt), new Date(manage2.createdAt));
      });
      setDataArr(sortedData);
      return sortedData;
    }
    return data;
  };

  //
  const filterWhenSearched = (data) => {
    // if (searchValue && hasFetched) {
    //   const filteredDataArr = data?.filter((el) => {
    //     const { businessName1, businessName2, businessName3, businessName4 } = el.businessNames;
    //     return (
    //       includesSearched(businessName1, searchValue) ||
    //       includesSearched(businessName2, searchValue) ||
    //       includesSearched(businessName3, searchValue) ||
    //       includesSearched(businessName4, searchValue)
    //     );
    //   });
    //   setDataArr(sortData(filteredDataArr));
    // } else if (hasFetched && searchValue === "") setDataArr(sortData(data));
    // setDataArr(data);
  };

  //
  const includesSearched = (text, searchValue) => {
    return text?.toLowerCase()?.includes(searchValue?.toLowerCase());
  };

  return { sortData, filterWhenSearched, includesSearched };
};
