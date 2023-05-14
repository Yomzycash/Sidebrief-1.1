import React, { useEffect } from "react";
import { useState } from "react";
import { Body, Container, Loading, MobileContainer } from "./styled";
import { format } from "date-fns";
import { Puff } from "react-loading-icons";
import { useMediaQuery } from "@mui/material";
import BusinessesCard from "components/cards/BusinessAddressCard";
import { useNavigate, useOutletContext } from "react-router-dom";
import FeatureTable from "components/Tables/FeatureTable";
import { useGetAllCountriesQuery } from "services/launchService";
import { handleError } from "utils/globalFunctions";
import { useCategoriesActions } from "../../actions";
import Accordion from "components/Accordion";

const StaffAllManage = () => {
  const [dataArr, setDataArr] = useState([]);

  const { submitted, drafts, searchValue, isLoading, isError, isSuccess } = useOutletContext();
  const countries = useGetAllCountriesQuery();

  const hasFetched = submitted || drafts;
  const all = hasFetched ? submitted?.concat(drafts) : [];

  const { filterWhenSearched, sortData } = useCategoriesActions({
    searchValue,
    hasFetched,
    setDataArr,
  });

  const navigate = useNavigate();


  // Sort data
  useEffect(() => {
    sortData(all);
  }, [submitted, drafts, isSuccess]);

  // Filters data array by searched value
  useEffect(() => {
    if (searchValue) filterWhenSearched(all);
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
  console.log("dataBody", dataBody)

  const matches = useMediaQuery("(max-width:700px)");

  let url = "";
  const handleRowClick = (el) => {
    let complyCode = el?.complyCode;
    url = `/staff-dashboard/businesses/manage/all-manage/${complyCode}/info`
    navigate(url);
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
            {dataArr?.map((element) => {
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
                  navigate={(element?.url)}
                />
              );
            })}
          </MobileContainer>
        )}
      </Body>
    </Container>
  );
};

export default StaffAllManage;
