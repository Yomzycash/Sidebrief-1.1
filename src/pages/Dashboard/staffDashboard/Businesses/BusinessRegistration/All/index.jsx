import { GeneralTable } from "components/Tables";
import React, { useEffect, useState, useMemo } from "react";
import { useGetAllLaunchQuery } from "services/staffService";
import { Body, Container, Loading, MobileContainer } from "./styled";
import { format } from "date-fns";
import { useGetAllCountriesQuery } from "services/launchService";
import { Puff } from "react-loading-icons";
import { sortTableData } from "utils/staffHelper";
import { columns } from "../tableColumn";
import Paginator from "components/Paginator";
import { useMediaQuery } from "@mui/material";
import BusinessesCard from "components/cards/BusinessAddressCard";
import { staffNavigateToDetailPage } from "utils/globalFunctions";
import { useNavigate, useOutletContext } from "react-router-dom";
import Accordion from "components/Accordion";
import { useBusinessActions } from "../actions";

const All = () => {
  const [tableArr, setTableArr] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const allLaunch = useGetAllLaunchQuery();

  const countries = useGetAllCountriesQuery();

  const navigate = useNavigate();

  const matches = useMediaQuery("(max-width:700px)");

  const { searchValue } = useOutletContext();
  const hasFetched = !!allLaunch.data;

  const { filterWhenSearched } = useBusinessActions({
    searchValue,
    hasFetched,
    setDataArr: setTableArr,
  });

  useEffect(() => {
    if (allLaunch.isSuccess && countries.isSuccess) {
      setTableArr(allLaunch.data);
    }
  }, [allLaunch, countries.isSuccess]);

  const sortedArr = useMemo(() => {
    const sortArr = [...tableArr];
    return sortArr.sort(sortTableData);
  }, [tableArr]);

  // Filters data array by searched value
  useEffect(() => {
    if (searchValue) {
      filterWhenSearched(allLaunch.data);
    }
  }, [searchValue, allLaunch.data]);

  const loadingData = allLaunch.isLoading;

  const itemsPerPage = 15;

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % sortedArr?.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(sortedArr?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(sortedArr?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, sortedArr]);

  const MemoisedGeneralTable = useMemo(() => GeneralTable, []);
  return (
    <Container>
      <Body>
        {loadingData && (
          <Loading>
            <Puff stroke="#00A2D4" />
          </Loading>
        )}

        {!matches && sortedArr.length > 0 ? (
          <MemoisedGeneralTable
            data={currentItems.map((element) => {
              return {
                name: element.businessNames ? element.businessNames.businessName1 : "No name ",
                type: element?.registrationType,
                country: element.registrationCountry,
                date: format(new Date(element.createdAt), "dd/MM/yyyy"),
                code: element.launchCode,
                countryISO: element.registrationCountry,
              };
            })}
            columns={columns}
          />
        ) : (
          <MobileContainer>
            {currentItems.map((element) => {
              return (
                // <BusinessesCard
                //   key={element.launchCode}
                //   name={element.businessNames ? element.businessNames.businessName1 : "No name "}
                //   type={element?.registrationType}
                //   code={element?.launchCode}
                //   countryISO={element?.registrationCountry}
                //   navigate={(launchInfo) => staffNavigateToDetailPage(navigate, launchInfo)}
                // />
                <Accordion
                  key={element.launchCode}
                  name={element.businessNames ? element.businessNames.businessName1 : "No name "}
                  type={element?.registrationType}
                  country={element?.registrationCountry}
                  date={format(new Date(element.createdAt), "dd/MM/yyyy")}
                  code={element?.launchCode}
                  countryISO={element?.registrationCountry}
                  navigate={(launchInfo) => staffNavigateToDetailPage(navigate, launchInfo)}
                />
              );
            })}
          </MobileContainer>
        )}
        {sortedArr?.length > itemsPerPage && (
          <Paginator handlePageClick={handlePageClick} pageCount={pageCount} />
        )}
      </Body>
    </Container>
  );
};

export default All;
