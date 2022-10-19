import { BusinessTable } from "components/Tables";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  useGetAllCountriesQuery,
  useGetUserDraftQuery,
} from "services/launchService";
import { Body, Container } from "./styled";
import { format } from "date-fns";
const DraftApplications = () => {
  const { data, error, isLoading, isSuccess } = useGetUserDraftQuery();

  const countries = useGetAllCountriesQuery();

  const [dataArr, setDataArr] = useState([]);
  useEffect(() => {
    if (isSuccess && countries.isSuccess) {
      setDataArr(data);
    }
  }, [data, isSuccess, countries.isSuccess]);

  return (
    <Container>
      <Body>
        <BusinessTable
          data={dataArr.map((element) => {
            return {
              name: element.businessNames
                ? element.businessNames.businessName1
                : "No name ",
              type: element?.registrationType,
              country: countries.data.find(
                (country) => country.countryISO === element.registrationCountry
              ).countryName,
              date: format(new Date(element.updatedAt), "dd/MM/yyyy"),
            };
          })}
        />
      </Body>
    </Container>
  );
};

export default DraftApplications;
