import { MockData } from "components/Staff/Tables/ApplicationTable/constants";
import { BusinessTable } from "components/Tables";
import React, { useEffect, useState } from "react";
import { useGetApprovedLaunchQuery } from "services/staffService";
import { Body, Container, Loading } from "./styled";
import { format, compareDesc } from "date-fns";
import { useGetAllCountriesQuery } from "services/launchService";
import { Puff } from "react-loading-icons";
const InProgress = () => {
  const [tableArr, setTableArr] = useState([]);
  const approvedLaunch = useGetApprovedLaunchQuery({
    refetchOnMountOrArgChange: true,
  });

  const countries = useGetAllCountriesQuery();

  useEffect(() => {
    if (approvedLaunch.isSuccess && countries.isSuccess) {
      setTableArr(approvedLaunch.data);
    }
  }, [approvedLaunch, countries.isSuccess]);

  console.log(tableArr);
  console.log(countries.data);

  const loadingData = approvedLaunch.isLoading;

  return (
    <Container>
      <Body>
        {loadingData && (
          <Loading>
            <Puff stroke="#00A2D4" />
          </Loading>
        )}

        {tableArr.length > 0 && (
          <BusinessTable
            data={tableArr.map((element) => {
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

export default InProgress;
