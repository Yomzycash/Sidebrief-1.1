import React, { useEffect } from "react";
import { useState } from "react";
import { Body, Container, Loading, MobileContainer } from "./styled";
import { format } from "date-fns";
import { Puff } from "react-loading-icons";
import { useMediaQuery } from "@mui/material";
import BusinessesCard from "components/cards/BusinessAddressCard";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useActions } from "../../actions";
import FeatureTable from "components/Tables/FeatureTable";
import Accordion from "components/Accordion";
import { useGetAllCountriesQuery } from "services/launchService";

const DraftManage = () => {
  const [dataArr, setDataArr] = useState([]);
  const countries = useGetAllCountriesQuery();


  const { drafts, searchValue, isLoading, isError, isSuccess } = useOutletContext();

  const hasFetched = drafts ? true : false;
  const allDrafts = hasFetched ? drafts : [];

  const { filterWhenSearched, sortData } = useActions({
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
    navigate(`/dashboard/my-products/manage/draft-manage/${complyCode}/info`);
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
                product
                key={element?.complyCode}
                name={element?.serviceName ? element?.serviceName : "No name "}
                type={element?.status}
                code={element?.complyCode}
                countryISO={element?.serviceCountry}
                country={
                  countries?.data?.find(
                    (country) => country.countryISO === element?.serviceCountry
                  )?.countryName
                }
                date={dataArr.length<1 ? '--': format(new Date(element?.updatedAt), "dd/MM/yyyy")}
                action={()=>{ navigate(`/dashboard/my-products/manage/draft-manage/${element?.complyCode}/info`)}}
              />
              );
            })}
          </MobileContainer>
        )}
      </Body>
    </Container>
  );
};

export default DraftManage;
