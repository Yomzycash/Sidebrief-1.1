import { GeneralTable } from "components/Tables";
import React, { useEffect, useState } from "react";
import { Body, Container, Loading } from "./styled";
import { format } from "date-fns";
import {
  useGetAllCountriesQuery,
  useViewPayLaunchMutation,
} from "services/launchService";
import { Puff } from "react-loading-icons";
import styled from "styled-components";
import { useMediaQuery } from "@mui/material";
import BusinessesCard from "components/cards/BusinessAddressCard";
import { columns } from "../tablecolumn";
import { navigateToDetailPage } from "utils/globalFunctions";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useBusinessActions } from "../actions";

const AllBusinesses = () => {
  const [dataArr, setDataArr] = useState([]);

  const { submitted, drafts, searchValue } = useOutletContext();

  const countries = useGetAllCountriesQuery();
  const [viewPayLaunch] = useViewPayLaunchMutation();

  const hasFetched = submitted.data && drafts.data;
  const all = hasFetched ? submitted.data.concat(drafts.data) : [];

  const { filterWhenSearched, sortData } = useBusinessActions({
    searchValue,
    hasFetched,
    setDataArr,
  });

  const navigate = useNavigate();

  // Sort data
  useEffect(() => {
    sortData(all);
  }, [submitted, drafts]);

  // Filters data array by searched value
  useEffect(() => {
    filterWhenSearched(all);
  }, [searchValue]);

  const matches = useMediaQuery("(max-width:700px)");

  const loadingData = submitted.isLoading && drafts.isSuccess;

  return (
    <Container>
      <Body>
        {loadingData && (
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
                country:
                  countries.data?.find(
                    (country) => country?.countryISO === element?.registrationCountry
                  )?.countryName || "--",
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
                  key={element.launchCode}
                  name={element.businessNames ? element.businessNames.businessName1 : "No name "}
                  type={element?.registrationType}
                  code={element?.launchCode}
                  countryISO={element?.registrationCountry}
                  navigate={(launchInfo) =>
                    navigateToDetailPage(navigate, launchInfo, viewPayLaunch)
                  }
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
