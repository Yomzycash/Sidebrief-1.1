import React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { ReactComponent as ThreeDot } from "asset/svg/threeDot.svg";
import { ThreeDotContainer, HeadText, BodyText } from "./styles";
import { StatusIndicator } from "components/Indicators";
import numeral from "numeral";

const ColumnHelper = createColumnHelper();

export const columns = [
	ColumnHelper.accessor((row) => row.id, {
		id: "S/N",
		header: ({ header }) => {
			return <HeadText>{header.id}</HeadText>;
		},
		cell: (info) => (
			<BodyText>{numeral(info.getValue()).format("00")}</BodyText>
		),
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
	// ColumnHelper.display({
	//   id: "actions",
	//   cell: ({ row }) => {
	//     return (
	//       <ThreeDotContainer onClick={() => console.log(row.index)}>
	//         <ThreeDot />
	//       </ThreeDotContainer>
	//     );
	//   },
	// }),
];
