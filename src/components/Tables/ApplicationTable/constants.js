import React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { ReactComponent as ThreeDot } from "asset/svg/threeDot.svg";
import { ThreeDotContainer } from "./styles";
import { StatusIndicator } from "components/Indicators";

const ColumnHelper = createColumnHelper();

// what the data should look like
export const MockData = [
	{
		id: 1,
		name: "Oluwatimilehin Lawal",
		type: "LLC",
		country: "Nigeria",
		status: "awaiting",
		date: "28/08/2022",
	},
];

export const columns = [
	ColumnHelper.accessor((row) => row.id, {
		header: "S/N",
	}),
	ColumnHelper.accessor("name", {
		header: "Registered By",
	}),
	ColumnHelper.accessor("type", {
		header: "Type",
	}),
	ColumnHelper.accessor("country", {
		header: "Country",
	}),
	ColumnHelper.accessor("status", {
		header: "Status",
		cell: (props) => {
			return <StatusIndicator status={props.getValue()} />;
		},
	}),
	ColumnHelper.accessor("date", {
		header: "Date",
	}),
	// ColumnHelper.display({
	// 	id: "actions",
	// 	cell: ({ row }) => {
	// 		console.log(row);

	// 		return (
	// 			<ThreeDotContainer onClick={() => console.log(row)}>
	// 				<ThreeDot />
	// 			</ThreeDotContainer>
	// 		);
	// 	},
	// }),
];
