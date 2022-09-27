import React from "react";
import {
	Container,
	Heading,
	Title,
	ViewAllButton,
	Table,
	Head,
	HeadData,
	Row,
	RowData,
} from "./styles";
import { TextWithArrow } from "components/texts";
import {
	useReactTable,
	flexRender,
	getCoreRowModel,
} from "@tanstack/react-table";
import { columns } from "./constants";

export const ApplicationTable = ({ onClickViewAll, data }) => {
	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<Container>
			<Heading>
				<Title>Applications</Title>
				<ViewAllButton onClick={onClickViewAll}>
					<TextWithArrow blue>View All</TextWithArrow>
				</ViewAllButton>
			</Heading>
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
