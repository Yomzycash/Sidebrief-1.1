import { GeneralTable } from "components/Tables";
import React, { useEffect, useState, useMemo } from "react";
import { Body, TableContainer, Loading } from "../style";
import { Puff } from "react-loading-icons";
import { sortTableData } from "utils/staffHelper";
import { columns } from "../tableColumn";
import Paginator from "components/Paginator";
import { useViewAllComplyQuery } from "services/complyService";
import { compareAsc } from "date-fns";

const All = () => {
  const [tableArr, setTableArr] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);

  const { data, isLoading, isSuccess } = useViewAllComplyQuery();

  useEffect(() => {
    if (isSuccess) {
      const submitted = data?.filter((el) => el.status === "submitted") || [];
      setTableArr(submitted);
    }
  }, [isSuccess, data]);

  const sortedArr = useMemo(() => {
    const sortArr = [...tableArr];
    return sortArr.sort(sortTableData);
  }, [tableArr]);

  const loadingData = isLoading;

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
    <TableContainer>
      <Body>
        {loadingData ? (
          <Loading>
            <Puff stroke="#00A2D4" />
          </Loading>
        ) : (
          <MemoisedGeneralTable
            data={[...currentItems]
              ?.sort((a, b) => compareAsc(new Date(b?.createdAt), new Date(a?.createdAt)))
              .map((comply) => ({
                complyCode: comply.complyCode,
                serviceId: comply.serviceId,
                meta: comply.meta,
                date: comply.updatedAt,
              }))}
            columns={columns}
            normalLastRow
          />
        )}

        {sortedArr?.length > itemsPerPage && (
          <Paginator handlePageClick={handlePageClick} pageCount={pageCount} />
        )}
      </Body>
    </TableContainer>
  );
};

export default All;
