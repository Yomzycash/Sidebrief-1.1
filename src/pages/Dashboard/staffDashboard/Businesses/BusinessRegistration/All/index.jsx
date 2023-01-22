import { MockData } from "components/Staff/Tables/ApplicationTable/constants";
import { StaffBusinessTable } from "components/Staff/Tables";
import React, { useEffect, useState } from "react";
import { useGetAllLaunchQuery } from "services/staffService";
import { Body, Container, Loading } from "./styled";
import { format, compareDesc } from "date-fns";
import { useGetAllCountriesQuery } from "services/launchService";
import { Puff } from "react-loading-icons";
import { sortTableData } from "utils/staffHelper";

const All = () => {
  const [tableArr, setTableArr] = useState([]);
  const allLaunch = useGetAllLaunchQuery({
    refetchOnMountOrArgChange: true,
  });

  const countries = useGetAllCountriesQuery();

  useEffect(() => {
    if (allLaunch.isSuccess && countries.isSuccess) {
      setTableArr(allLaunch.data);
    }
  }, [allLaunch, countries.isSuccess]);

  // console.log(tableArr);
  console.log(countries.data);

  let sortArr = [...tableArr];
  let sortedArr = sortArr.sort(sortTableData);

  const loadingData = allLaunch.isLoading;

  return (
    <Container>
      <Body>
        {loadingData && (
          <Loading>
            <Puff stroke="#00A2D4" />
          </Loading>
        )}

        {sortedArr.length > 0 && (
          <StaffBusinessTable
            data={sortedArr.map((element) => {
              return {
                name: element.businessNames
                  ? element.businessNames.businessName1
                  : "No name ",
                type: element?.registrationType,
                country: element.registrationCountry,
                date: format(new Date(element.createdAt), "dd/MM/yyyy"),
                code: element.launchCode,
                countryISO: element.registrationCountry,
              };
            })}
          />
        )}
      </Body>
    </Container>
  );
};

export default All;
