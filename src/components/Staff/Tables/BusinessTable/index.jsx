import React, { useState } from "react";
import { Container, Table, Head, HeadData, Row, RowData } from "./styles";
import {
	useReactTable,
	flexRender,
	getCoreRowModel,
} from "@tanstack/react-table";
import { columns } from "./constants";

export const StaffBusinessTable = ({ data }) => {
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
	// console.log(rowSelection);

	// returns SelectedRows
	const getSelectedRows = () => {
		return table.getSelectedRowModel().flatRows;
	};

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
			{/* The pagination controller */}
		</Container>
	);
};