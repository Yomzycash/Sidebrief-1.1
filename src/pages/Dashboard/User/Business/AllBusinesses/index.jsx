import { BusinessTable } from "components/Tables";
import React, { useEffect, useState } from "react";
import { Body, Container, Loading } from "./styled";
import { format, compareDesc } from "date-fns";
import {
  useGetAllCountriesQuery,
  useGetUserSubmittedQuery,
  useGetUserDraftQuery,
  useViewPayLaunchMutation,
} from "services/launchService";
import { Puff } from "react-loading-icons";
import styled from "styled-components";
import { useMediaQuery } from "@mui/material";
import BusinessesCard from "components/cards/BusinessAddressCard";

const AllBusinesses = () => {
  const submitted = useGetUserSubmittedQuery({
    refetchOnMountOrArgChange: true,
  });

  const draft = useGetUserDraftQuery({
    refetchOnMountOrArgChange: true,
  });

  const countries = useGetAllCountriesQuery();
  const [viewPayLaunch] = useViewPayLaunchMutation();

  const [dataArr, setDataArr] = useState([]);
  useEffect(() => {
    if (submitted.isSuccess && draft.isSuccess && countries.isSuccess) {
      const response = [...submitted.data, ...draft.data];
      response.sort((launch1, launch2) => {
        return compareDesc(
          new Date(launch1.createdAt),
          new Date(launch2.createdAt)
        );
      });
      setDataArr(response);
    }
  }, [submitted, draft, countries.isSuccess]);

  const matches = useMediaQuery("(max-width:700px)");

  const loadingData = submitted.isLoading && draft.isSuccess;

  return (
    <Container>
      <Body>
        {loadingData && (
          <Loading>
            <Puff stroke="#00A2D4" />
          </Loading>
        )}
        {!matches && dataArr.length > 0 ? (
          <BusinessTable
            data={dataArr.map((element) => {
              return {
                name: element.businessNames
                  ? element.businessNames.businessName1
                  : "No name ",
                type: element?.registrationType,
                country: countries.data.find(
                  (country) =>
                    country.countryISO === element.registrationCountry
                )?.countryName,
                date: format(new Date(element.createdAt), "dd/MM/yyyy"),
                code: element.launchCode,
                countryISO: element.registrationCountry,
                viewPayLaunch: viewPayLaunch,
              };
            })}
          />
        ) : (
          <MobileContainer>
            {dataArr.map((element) => {
              return (
                <BusinessesCard
                  name={
                    element.businessNames
                      ? element.businessNames.businessName1
                      : "No name "
                  }
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

export default AllBusinesses;

const MobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: inherit;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
