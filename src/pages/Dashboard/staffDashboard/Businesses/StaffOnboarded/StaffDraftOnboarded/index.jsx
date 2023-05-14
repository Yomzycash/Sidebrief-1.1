import React, { useEffect } from "react";
import { useState } from "react";
import { Body, Container, Loading, MobileContainer } from "./styled";
import { format } from "date-fns";
import { Puff } from "react-loading-icons";
import { useMediaQuery } from "@mui/material";
import BusinessesCard from "components/cards/BusinessAddressCard";
import { useNavigate, useOutletContext } from "react-router-dom";
import FeatureTable from "components/Tables/FeatureTable";
import { handleError } from "utils/globalFunctions";
import { useCategoriesActions } from "../../actions";
import { useGetAllCountriesQuery } from "services/launchService";
import Accordion from "components/Accordion";

const StaffDraftOnboarded = () => {
  const [dataArr, setDataArr] = useState([]);

  const { drafts, searchValue, isLoading, isError, isSuccess } = useOutletContext();
   
  const countries = useGetAllCountriesQuery();

  const hasFetched = drafts ? true : false;
  const allDrafts = hasFetched ? drafts : [];

  const { filterWhenSearched, sortData } = useCategoriesActions({
    searchValue,
    hasFetched,
    setDataArr,
  });

  const navigate = useNavigate();

  // Sort data
  useEffect(() => {
    sortData(allDrafts);
  }, [drafts, isSuccess]);

  // Filters data array by searched value
  useEffect(() => {
    if (searchValue) filterWhenSearched(allDrafts);
  }, [searchValue]);

  // Tabele header
  const header = ["Service Name", "Country", "Paid", "Date"];

  // Table body
  const dataBody = dataArr?.map((el) => [
    el?.serviceName,
    el?.serviceCountry,
    el?.paid?.toString(),
    format(new Date(el?.createdAt), "dd-MM-yyyy"),
  ]);

  const matches = useMediaQuery("(max-width:700px)");

  const handleRowClick = (el) => {
    let complyCode = el?.complyCode;
    navigate(`/staff-dashboard/businesses/onboard/draft-onboard/${complyCode}/info`);
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
                  key={element?.complyCode}
                  name={element?.serviceName ? element?.serviceName : "No service "}
                  type={element?.status}
                  code={element?.complyCode}
                  countryISO={element?.serviceCountry}
                  country={
                    countries?.data?.find(
                      (country) => country.countryISO === element?.serviceCountry
                    )?.countryName
                  }
                  date={dataArr.length < 1 ? '--': format(new Date(element?.updatedAt), "dd/MM/yyyy")}
                  // navigate={(launchInfo) => staffNavigateToDetailPage(navigate, launchInfo)}
                  // action={() => { navigate(`/staff-dashboard/businesses/manage/all-manage/${element?.complyCode}/info`)
                  // action={()=> { navigate(url)}}  
              />
              );
            })}
          </MobileContainer>
        )}
      </Body>
    </Container>
  );
};

export default StaffDraftOnboarded;
