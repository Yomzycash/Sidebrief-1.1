import React, { useEffect, useState } from "react";
import { useGetAllCountriesQuery, useViewPayLaunchMutation } from "services/launchService";
import { Body, Container, Loading } from "./styled";
import { Puff } from "react-loading-icons";
import styled from "styled-components";
import { useMediaQuery } from "@mui/material";
import BusinessesCard from "components/cards/BusinessAddressCard";
import { navigateToDetailPage } from "utils/globalFunctions";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useBusinessActions } from "../actions";
import FeatureTable from "components/Tables/FeatureTable";
import Accordion from "components/Accordion";
import { format } from "date-fns";

const PendingApplications = () => {
  const [dataArr, setDataArr] = useState([]);

  const navigate = useNavigate();

  const { submitted, searchValue, isLoading, isError, isSuccess, setListShown } =
    useOutletContext();

  const countries = useGetAllCountriesQuery();
  const [viewPayLaunch] = useViewPayLaunchMutation();

  const hasFetched = submitted.data;
  const allSubmitted = hasFetched ? submitted.data : [];

  const { filterWhenSearched, sortData, header, dataBody, handleRowClick } = useBusinessActions({
    searchValue,
    hasFetched,
    dataArr,
    setDataArr,
    countries,
  });

  // Sort data
  useEffect(() => {
    sortData(allSubmitted);
    setListShown(allSubmitted?.length);
  }, [submitted, isSuccess]);

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
                <Accordion
                  key={element.launchCode}
                  name={element.businessNames ? element.businessNames.businessName1 : "No name "}
                  type={element?.registrationType}
                  code={element?.launchCode}
                  countryISO={element?.registrationCountry}
                  country={
                    countries?.data?.find(
                      (country) => country?.countryISO === element?.registrationCountry
                    )?.countryName
                  }
                  date={format(new Date(element?.updatedAt), "dd/MM/yyyy")}
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
