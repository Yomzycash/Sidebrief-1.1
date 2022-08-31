import React, { useMemo } from "react";
import {
	Container,
	Heading,
	Title,
	ViewAllButton,
	Table,
	Head,
	HeadData,
} from "./styles";
import { TextWithArrow } from "components/texts";
import {
	useReactTable,
	flexRender,
	getCoreRowModel,
} from "@tanstack/react-table";
import { columns, MockData } from "./constants";

export const ApplicationTable = ({ onClickViewAll }) => {
	const table = useReactTable({
		columns,
		data: MockData,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<Container>
			<Heading>
				<Title>All Applications</Title>
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
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id}>
									{flexRender(
										cell.column.columnDef.cell,
										cell.getContext()
									)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</Table>
		</Container>
	);
};
