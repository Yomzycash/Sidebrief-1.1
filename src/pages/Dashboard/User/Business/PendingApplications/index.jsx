import { GeneralTable } from "components/Tables";
import React, { useEffect, useState } from "react";
import { Body, Container, Loading } from "./styled";
import { format, compareDesc } from "date-fns";
import {
  useGetAllCountriesQuery,
  useGetUserSubmittedQuery,
  useViewPayLaunchMutation,
} from "services/launchService";
import { Puff } from "react-loading-icons";
import styled from "styled-components";
import { useMediaQuery } from "@mui/material";
import BusinessesCard from "components/cards/BusinessAddressCard";
import { columns } from "../tablecolumn";
import { useBusinessActions } from "../actions";
import { useOutletContext } from "react-router-dom";

const PendingApplications = () => {
  const [dataArr, setDataArr] = useState([]);

  const { submitted, searchValue } = useOutletContext();

  const countries = useGetAllCountriesQuery();
  const [viewPayLaunch] = useViewPayLaunchMutation();

  const hasFetched = submitted.data;
  const allSubmitted = hasFetched ? submitted.data : [];

  const { filterWhenSearched, sortData } = useBusinessActions({
    searchValue,
    hasFetched,
    setDataArr,
  });

  const data = submitted.data;
  const error = submitted.error;
  const isLoading = submitted.isLoading;
  const isSuccess = submitted.isSuccess;

  // Sort data
  useEffect(() => {
    sortData(allSubmitted);
  }, [data, isSuccess]);

  // Filters data array by searched value
  useEffect(() => {
    filterWhenSearched(allSubmitted);
  }, [searchValue]);

  const matches = useMediaQuery("(max-width:700px)");

  return (
    <Container>
      <Body>
        {isLoading && (
          <Loading>
            <Puff stroke="#00A2D4" />
          </Loading>
        )}
        {!matches && dataArr.length > 0 ? (
          <GeneralTable
            data={dataArr.map((element) => {
              return {
                name: element.businessNames ? element.businessNames.businessName1 : "No name ",
                type: element?.registrationType,
                country: countries.data.find(
                  (country) => country.countryISO === element.registrationCountry
                )?.countryName,
                date: format(new Date(element.createdAt), "dd/MM/yyyy"),
                code: element.launchCode,
                countryISO: element.registrationCountry,
                viewPayLaunch: viewPayLaunch,
              };
            })}
            columns={columns}
          />
        ) : (
          <MobileContainer>
            {dataArr.map((element) => {
              return (
                <BusinessesCard
                  name={element.businessNames ? element.businessNames.businessName1 : "No name "}
                  type={element?.registrationType}
                  code={element?.launchCode}
                  countryISO={element?.registrationCountry}
                  viewPayLaunch={viewPayLaunch}
                />
              );
            })}
          </MobileContainer>
        )}
      </Body>
    </Container>
  );
};

export default PendingApplications;

const MobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: inherit;
  width: 100%;
  align-items: center;
  justify-content: center;

  gap: 8px;
`;
