import React, { useEffect, useState } from "react";
import { useGetAllCountriesQuery, useViewPayLaunchMutation } from "services/launchService";
import { Body, Container, Loading } from "./styled";
import { Puff } from "react-loading-icons";
import styled from "styled-components";
import { useMediaQuery } from "@mui/material";
import BusinessesCard from "components/cards/BusinessAddressCard";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useBusinessActions } from "../actions";
import FeatureTable from "components/Tables/FeatureTable";

const DraftApplications = () => {
  const [dataArr, setDataArr] = useState([]);

  const navigate = useNavigate();

  const { drafts, searchValue, isLoading, isError, isSuccess, setListShown } = useOutletContext();

  const countries = useGetAllCountriesQuery();
  const [viewPayLaunch] = useViewPayLaunchMutation();

  const hasFetched = drafts.data;
  const allDrafts = hasFetched ? drafts.data : [];

  const { filterWhenSearched, sortData, header, dataBody, handleRowClick } = useBusinessActions({
    searchValue,
    hasFetched,
    dataArr,
    setDataArr,
    countries,
  });

  // Sort data
  useEffect(() => {
    sortData(allDrafts);
    setListShown(allDrafts?.length);
  }, [drafts, isSuccess]);

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
          <FeatureTable
            header={header}
            body={dataBody}
            onRowClick={handleRowClick}
            bodyFullData={dataArr}
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
