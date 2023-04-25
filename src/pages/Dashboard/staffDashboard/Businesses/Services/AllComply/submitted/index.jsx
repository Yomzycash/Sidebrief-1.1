import React, { useMemo } from "react";
import { GeneralTable } from "components/Tables";
import { Body, TableContainer, Loading, EmptyContainer } from "../style";
import { Puff } from "react-loading-icons";
import { columns } from "../tableColumn";
import { useViewAllComplyQuery } from "services/complyService";
import { compareAsc } from "date-fns";

const AllSubmittedComply = () => {
  const { data, isLoading } = useViewAllComplyQuery();

  const draft = data?.filter((el) => el.status === "pending") || [];
  console.log("draft", draft);

  const submitted = data?.filter((el) => el.status === "submitted") || [];
  console.log("submitted", submitted);

  const loadingData = isLoading;

  const MemoisedGeneralTable = useMemo(() => GeneralTable, []);

  return (
    <TableContainer>
      <Body>
        {loadingData ? (
          <Loading>
            <Puff stroke="#00A2D4" />
          </Loading>
        ) : submitted.length > 0 ? (
          <MemoisedGeneralTable
            data={[...submitted]
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
        ) : (
          <EmptyContainer>No Data Available</EmptyContainer>
        )}

        {/* {sortedArr?.length > itemsPerPage && (
          <Paginator handlePageClick={handlePageClick} pageCount={pageCount} />
        )} */}
      </Body>
    </TableContainer>
  );
};

export default AllSubmittedComply;
