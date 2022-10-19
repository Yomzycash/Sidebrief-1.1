import { TextWithArrow } from "components/texts";
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
	TableContainer,
	BottomText,
	Filter,
	FilterButton,
} from "./styles";
import {
	useReactTable,
	flexRender,
	getCoreRowModel,
} from "@tanstack/react-table";
import { columns, filterButtons } from "./constants";
import { useState } from "react";

export const BusinessHomeTable = ({ data }) => {
	const [activeFilter, setActiveFilter] = useState("all");
	const onClickViewAll = () => {};

	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<Container>
			<Heading>
				<div>
					<Title>Business Registrations</Title>
					<ViewAllButton onClick={onClickViewAll}>
						<TextWithArrow blue>View All</TextWithArrow>
					</ViewAllButton>
				</div>
				<BottomText>
					Keep up and track business registrations
				</BottomText>
			</Heading>
			<TableContainer>
				<Filter>
					{filterButtons.map((el) => (
						<FilterButton
							active={activeFilter === el.id}
							key={el.id}
							onClick={() => setActiveFilter(el.id)}
						>
							<p>{el.text}</p>
						</FilterButton>
					))}
				</Filter>
				<Table>
					<Head>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<HeadData key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef
														.header,
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
			</TableContainer>
		</Container>
	);
};
