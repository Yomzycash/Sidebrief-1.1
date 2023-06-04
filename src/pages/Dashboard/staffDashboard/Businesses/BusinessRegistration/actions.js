export const useBusinessActions = ({ searchValue, hasFetched, setDataArr }) => {
  //Filters data by search value
  const filterWhenSearched = (data) => {
    if (searchValue && hasFetched) {
      const filteredDataArr = data?.filter((el) => {
        return (
          includesSearched(el.businessNames?.businessName1, searchValue) ||
          includesSearched(el.businessNames?.businessName2, searchValue) ||
          includesSearched(el.businessNames?.businessName3, searchValue) ||
          includesSearched(el.businessNames?.businessName4, searchValue) ||
          includesSearched(el.registrationCountry, searchValue) ||
          includesSearched(el.registrationType, searchValue)
        );
      });
      setDataArr(filteredDataArr);
    } else if (hasFetched && searchValue === "") setDataArr(data);
  };

  //
  const includesSearched = (text, searchValue) => {
    return text?.toLowerCase()?.includes(searchValue?.toLowerCase());
  };

  return { filterWhenSearched };
};
