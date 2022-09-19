import React, { useState } from "react";
import { Container, Table, Head, HeadData, Row, RowData } from "./styles";
import {
	useReactTable,
	flexRender,
	getCoreRowModel,
} from "@tanstack/react-table";
import { columns } from "./constants";

export const BusinessTable = ({ data }) => {
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

	// returns SelectedRows
	const getSelectedRows = () => {
		return table.getSelectedRowModel().flatRows;
	};

	return (
		<Container>
			<Table>
				<Head>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<HeadData key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
										  )}
								</HeadData>
							))}
						</tr>
					))}
				</Head>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<Row key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<RowData key={cell.id}>
									{flexRender(
										cell.column.columnDef.cell,
										cell.getContext()
									)}
								</RowData>
							))}
						</Row>
					))}
				</tbody>
			</Table>
		</Container>
	);
};
