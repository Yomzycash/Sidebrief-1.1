import { useRef, useState } from "react";
import { Container, Table, Head, Body, HeadData, Row, RowData, TableWrapper } from "./style";
import { useReactTable, flexRender, getCoreRowModel } from "@tanstack/react-table";
import { useEffect } from "react";

export const GeneralTable = ({ columns, data, getSelectedRows, selectionRow, normalLastRow }) => {
  const [rowSelection, setRowSelection] = useState({});

  const getSelectedRowsRef = useRef(getSelectedRows);
  getSelectedRowsRef.current = getSelectedRows;

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
  });

  useEffect(() => {
    if (selectionRow && getSelectedRowsRef.current) {
      const selectedRows = table.getSelectedRowModel().flatRows.map((row) => row.original);
      getSelectedRowsRef.current(selectedRows);
    }
  }, [rowSelection, selectionRow, table]);

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
        <Body>
          {table.getRowModel().rows.map((row) => (
            <Row key={row.id} selectionRow={selectionRow} normalLastRow={normalLastRow}>
              {row.getVisibleCells().map((cell) => (
                <RowData key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </RowData>
              ))}
            </Row>
          ))}
        </Body>
      </Table>
      {/* The pagination controller */}
    </Container>
  );
};
