import { MockData } from "components/Staff/Tables/ApplicationTable/constants";
import { StaffBusinessTable } from "components/Staff/Tables";
import React, { useEffect, useState } from "react";
import { useGetDraftLaunchQuery } from "services/staffService";
import { Body, Container, Loading } from "./styled";
import { format, compareDesc } from "date-fns";
import { useGetAllCountriesQuery } from "services/launchService";
import { Puff } from "react-loading-icons";
import { sortTableData } from "utils/staffHelper";
const Draft = () => {
  const [tableArr, setTableArr] = useState([]);
  const pendingLaunch = useGetDraftLaunchQuery({
    refetchOnMountOrArgChange: true,
  });

  const countries = useGetAllCountriesQuery();

  useEffect(() => {
    if (pendingLaunch.isSuccess && countries.isSuccess) {
      setTableArr(pendingLaunch.data);
    }
  }, [pendingLaunch, countries.isSuccess]);

  console.log(tableArr);
  console.log(countries.data);

  let sortArr = [...tableArr];
  let sortedArr = sortArr.sort(sortTableData);

  const loadingData = pendingLaunch.isLoading;

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

export default Draft;
