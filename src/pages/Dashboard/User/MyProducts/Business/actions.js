import { compareDesc, format } from "date-fns";
import { useNavigate } from "react-router-dom";

export const useBusinessActions = ({ searchValue, hasFetched, dataArr, setDataArr, countries }) => {
  const navigate = useNavigate();

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
          includesSearched(businessName4, searchValue) ||
          includesSearched(el.registrationCountry, searchValue) ||
          includesSearched(el.registrationType, searchValue)
        );
      });
      setDataArr(sortData(filteredDataArr));
    } else if (hasFetched && searchValue === "") setDataArr(sortData(data));
  };

  //
  const includesSearched = (text, searchValue) => {
    return text?.toLowerCase()?.includes(searchValue?.toLowerCase());
  };

  // Tabele header
  const header = ["Business Name", "Type", "Country", "Paid", "Date"];

  // Table body
  const dataBody = dataArr?.map((el) => [
    el?.businessNames?.businessName1 || "No name ",
    el?.registrationType,
    countries?.data?.find((country) => country?.countryISO === el?.registrationCountry)
      ?.countryName || "--",
    el?.paid?.toString(),
    format(new Date(el?.createdAt), "dd-MM-yyyy"),
  ]);

  const handleRowClick = (el) => {
    navigate(
      `/dashboard/my-products/business/detail?launchCode=${el?.launchCode}&registrationCountry=${el?.registrationCountry}&registrationType=${el?.registrationType}`
    );
  };

  return { sortData, filterWhenSearched, includesSearched, header, dataBody, handleRowClick };
};
