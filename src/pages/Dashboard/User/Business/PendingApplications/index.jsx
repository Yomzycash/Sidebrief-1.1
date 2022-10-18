import { BusinessTable } from "components/Tables";
import React, { useEffect, useState } from "react";
import { Body, Container } from "./styled";
import { format } from 'date-fns'
import { useGetAllCountriesQuery, useGetUserSubmittedQuery } from "services/launchService";

const PendingApplications = () => {
  const { data, error, isLoading, isSuccess } = useGetUserSubmittedQuery()

  const countries = useGetAllCountriesQuery()
  console.log(countries)

  console.log('femi', data)
  const [dataArr, setDataArr] = useState([])
  useEffect(() => {
    if (isSuccess && countries.isSuccess) {
      setDataArr(data)
    }
  }, [data, isSuccess, countries.isSuccess])
  return (
    <Container>
      <Body>
        <BusinessTable
          data={dataArr.map((element) => {
            return {
              name: element.businessNames
                ? element.businessNames.businessName1
                : 'No name ',
              type: element?.registrationType,
              country: countries.data.find(
                (country) => country.countryISO === element.registrationCountry,
              ).countryName,
              date: format(new Date(element.updatedAt), 'dd/MM/yyyy'),
            }
          })}
        />
      </Body>
    </Container>
  );
};

export default PendingApplications;
