import React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { ReactComponent as ThreeDot } from "asset/svg/threeDot.svg";
import { ThreeDotContainer, HeadText, BodyText } from "./styles";
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
	{
		id: 2,
		name: "Daniel John",
		type: "LLC",
		country: "South Africa",
		status: "progress",
		date: "28/08/2022",
	},
	{
		id: 3,
		name: "Abdulsalam Akinlusi",
		type: "LLC",
		country: "Togo",
		status: "completed",
		date: "28/08/2022",
	},
	{
		id: 4,
		name: "Ismael Hassan",
		type: "LLC",
		country: "Nigeria",
		status: "declined",
		date: "28/08/2022",
	},
];

export const columns = [
	ColumnHelper.accessor((row) => row.id, {
		id: "S/N",
		header: ({ header }) => {
			return <HeadText>{header.id}</HeadText>;
		},
		cell: (info) => <BodyText>{info.getValue()}</BodyText>,
	}),
	ColumnHelper.accessor("name", {
		header: () => <HeadText>Registered By</HeadText>,
		cell: (info) => <BodyText>{info.getValue()}</BodyText>,
	}),
	ColumnHelper.accessor("type", {
		header: () => <HeadText>Type</HeadText>,
		cell: (info) => <BodyText>{info.getValue()}</BodyText>,
	}),
	ColumnHelper.accessor("country", {
		header: () => <HeadText>Country</HeadText>,
		cell: (info) => <BodyText>{info.getValue()}</BodyText>,
	}),
	ColumnHelper.accessor("status", {
		header: () => <HeadText>Status</HeadText>,
		cell: (props) => {
			return <StatusIndicator status={props.getValue()} />;
		},
	}),
	ColumnHelper.accessor("date", {
		header: () => <HeadText>Date</HeadText>,
		cell: (info) => <BodyText>{info.getValue()}</BodyText>,
	}),
	ColumnHelper.display({
		id: "actions",
		cell: ({ row }) => {
			return (
				<ThreeDotContainer onClick={() => console.log(row.index)}>
					<ThreeDot />
				</ThreeDotContainer>
			);
		},
	}),
];
