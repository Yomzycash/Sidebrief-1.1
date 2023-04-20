import React, { useEffect } from "react";
import { useState } from "react";
import { Body, Container, Loading, MobileContainer } from "./styled";
import { format } from "date-fns";
import { Puff } from "react-loading-icons";
import { useMediaQuery } from "@mui/material";
import BusinessesCard from "components/cards/BusinessAddressCard";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useTaxActions } from "../actions";
import FeatureTable from "components/Tables/FeatureTable";
import { handleError } from "utils/globalFunctions";

const StaffPendingIntellectuals = () => {
  const [dataArr, setDataArr] = useState([]);

  const { submitted, searchValue, isLoading, isError, isSuccess } = useOutletContext();

  const hasFetched = submitted ? true : false;
  const allSubmitted = hasFetched ? submitted : [];

  const { filterWhenSearched, sortData } = useTaxActions({
    searchValue,
    hasFetched,
    setDataArr,
  });

  const navigate = useNavigate();

  // Sort data
  useEffect(() => {
    sortData(allSubmitted);
  }, [submitted, isSuccess]);

  // Filters data array by searched value
  useEffect(() => {
    if (searchValue) filterWhenSearched(allSubmitted);
  }, [searchValue]);

  useEffect(() => {
    if (isError) handleError("Connection error");
  }, [isError]);

  // Tabele header
  const header = ["Comply Code", "Service Id", "Paid", "Date"];

  // Table body
  const dataBody = dataArr?.map((el) => [
    el?.complyCode,
    el?.serviceId,
    el?.paid?.toString(),
    format(new Date(el?.createdAt), "dd-MM-yyyy"),
  ]);

  const matches = useMediaQuery("(max-width:700px)");

  const handleRowClick = (el) => {
    let serviceId = el[0];
    navigate(`/staff-dashboard/businesses/intellectual-property/${serviceId}/info`);
  };

  return (
    <Container>
      <Body>
        {isLoading && (
          <Loading>
            <Puff stroke="#00A2D4" />
          </Loading>
        )}

        {!matches && dataArr.length > 0 ? (
          <FeatureTable header={header} body={dataBody} onRowClick={handleRowClick} />
        ) : (
          <MobileContainer>
            {dataArr.map((element) => {
              return (
                <BusinessesCard
                  name={element.businessNames ? element.businessNames.businessName1 : "No name "}
                  type={element?.registrationType}
                  code={element?.launchCode}
                  countryISO={element?.registrationCountry}
                />
              );
            })}
          </MobileContainer>
        )}
      </Body>
    </Container>
  );
};

export default StaffPendingIntellectuals;
