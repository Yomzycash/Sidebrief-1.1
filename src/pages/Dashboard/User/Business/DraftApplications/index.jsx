import { GeneralTable } from "components/Tables";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  useGetAllCountriesQuery,
  useGetUserDraftQuery,
  useViewPayLaunchMutation,
} from "services/launchService";
import { Body, Container, Loading } from "./styled";
import { format, compareDesc } from "date-fns";
import { Puff } from "react-loading-icons";
import { useMediaQuery } from "@mui/material";
import BusinessesCard from "components/cards/BusinessAddressCard";
import styled from "styled-components";
import { columns } from "../tablecolumn";
import { useOutletContext } from "react-router-dom";
import { useBusinessActions } from "../actions";

const DraftApplications = () => {
  const [dataArr, setDataArr] = useState([]);

  const { drafts, searchValue } = useOutletContext();

  const countries = useGetAllCountriesQuery();
  const [viewPayLaunch] = useViewPayLaunchMutation();

  const hasFetched = drafts.data;
  const allDrafts = hasFetched ? drafts.data : [];

  const { filterWhenSearched, sortData } = useBusinessActions({
    searchValue,
    hasFetched,
    setDataArr,
  });

  const data = drafts.data;
  const error = drafts.error;
  const isLoading = drafts.isLoading;
  const isSuccess = drafts.isSuccess;

  // Sort data
  useEffect(() => {
    sortData(allDrafts);
  }, [data, isSuccess]);

  // Filters data array by searched value
  useEffect(() => {
    filterWhenSearched(allDrafts);
  }, [searchValue]);

  const matches = useMediaQuery("(max-width:700px)");

  return (
    <Container>
      <Body>
        {isLoading ||
          (countries.isLoading && (
            <Loading>
              <Puff stroke="#00A2D4" />
            </Loading>
          ))}
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
        {error?.status === "FETCH_ERROR" || countries?.isLoading === "FETCH_ERROR" ? (
          <p>Connection error</p>
        ) : (
          ""
        )}
        {/* {console.log(countries.isError)} */}
      </Body>
    </Container>
  );
};

export default DraftApplications;

const MobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: inherit;
  width: 100%;
  align-items: center;
  justify-content: center;

  gap: 8px;
`;
