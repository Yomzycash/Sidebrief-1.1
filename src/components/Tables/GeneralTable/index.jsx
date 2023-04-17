import { useMemo, useState } from "react";
import { Container, Table, Head, HeadData, Row, RowData } from "./style";
import { useReactTable, flexRender, getCoreRowModel } from "@tanstack/react-table";
import { useEffect } from "react";

export const GeneralTable = ({ columns, data, getSelectedRows, selectionRow, normalLastRow }) => {
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
  });

  const selectedRows = table.getSelectedRowModel().flatRows;
  const memoizedSelectedRows = useMemo (()=> selectedRows, [selectedRows])


  useEffect(() => {
    if (selectionRow && getSelectedRows && memoizedSelectedRows.length) getSelectedRows(selectedRows);
  }, [getSelectedRows, memoizedSelectedRows.length, selectedRows, selectionRow, table]);

  return (
    <Container>
      {/* The Header is here */}
      <Table>
        <Head>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <HeadData key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </HeadData>
              ))}
            </tr>
          ))}
        </Head>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <Row key={row.id} selectionRow={selectionRow} normalLastRow={normalLastRow}>
              {row.getVisibleCells().map((cell) => (
                <RowData key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </RowData>
              ))}
            </Row>
          ))}
        </tbody>
      </Table>
      {/* The pagination controller */}
    </Container>
  );
};
