import React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { HeadText, BodyText } from "./styles";
import { ObjectiveIndicator } from "components/Indicators";

const ColumnHelper = createColumnHelper();

export const columns = [
	ColumnHelper.accessor("name", {
		header: () => <HeadText>Business Name</HeadText>,
		cell: (info) => <BodyText>{info.getValue()}</BodyText>,
	}),
	ColumnHelper.accessor("type", {
		header: () => <HeadText>Type</HeadText>,
		cell: (info) => <BodyText>{info.getValue()}</BodyText>,
	}),
	ColumnHelper.accessor("objective", {
		header: () => <HeadText>Objective</HeadText>,
		cell: (info) => <ObjectiveIndicator objective={info.getValue()} />,
	}),
	ColumnHelper.accessor("country", {
		header: () => <HeadText>Country</HeadText>,
		cell: (info) => <BodyText>{info.getValue()}</BodyText>,
	}),
	ColumnHelper.accessor("date", {
		header: () => <HeadText>Date</HeadText>,
		cell: (info) => <BodyText>{info.getValue()}</BodyText>,
	}),
];
