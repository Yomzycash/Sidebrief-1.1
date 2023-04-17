import { GeneralTable } from "components/Tables";
import React, { useEffect, useState, useMemo } from "react";
import { useGetDraftLaunchQuery } from "services/staffService";
import { Body, Container, Loading } from "./styled";
import { format } from "date-fns";
import { useGetAllCountriesQuery } from "services/launchService";
import { Puff } from "react-loading-icons";
import { sortTableData } from "utils/staffHelper";
import { columns } from "../tableColumn";
import Paginator from "components/Paginator";
import { store } from "./../../../../../../redux/Store";
import { setBatchDeleteArray } from "../../../../../../redux/Slices";

const Draft = () => {
  const [tableArr, setTableArr] = useState([]);

  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const pendingLaunch = useGetDraftLaunchQuery();

  const countries = useGetAllCountriesQuery();

  useEffect(() => {
    if (pendingLaunch.isSuccess && countries.isSuccess) {
      setTableArr(pendingLaunch.data);
    }
  }, [pendingLaunch, countries.isSuccess]);

  const sortedArr = useMemo(() => {
    const sortArr = [...tableArr];
    return sortArr.sort(sortTableData);
  }, [tableArr]);

  const loadingData = pendingLaunch.isLoading;

  const itemsPerPage = 15;

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % sortedArr?.length;
    setItemOffset(newOffset);
  };

  const handleSelected = (selectedRow) => {
    const selectedArray = selectedRow?.map((row) => {
      return row?.code;
    });
      //console.log(selectedArray)
    store.dispatch(setBatchDeleteArray(selectedArray));
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

        {sortedArr.length > 0 && (
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
            getSelectedRows={handleSelected}
            selectionRow={true}
          />
        )}
        {sortedArr?.length > itemsPerPage && (
          <Paginator handlePageClick={handlePageClick} pageCount={pageCount} />
        )}
      </Body>
    </Container>
  );
};

export default Draft;
