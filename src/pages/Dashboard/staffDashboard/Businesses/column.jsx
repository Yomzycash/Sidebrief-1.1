import React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { HeadText, BodyText } from "components/Tables/GeneralTable/style";
import numeral from "numeral";

const ColumnHelper = createColumnHelper();

export const columns = [
  ColumnHelper.accessor((row) => row.id, {
    id: "S/N",
    header: ({ header }) => {
      return <HeadText>{header.id}</HeadText>;
    },
    cell: (info) => <BodyText>{numeral(info.row.index + 1).format("00")}</BodyText>,
  }),
  ColumnHelper.accessor("name", {
    header: () => <HeadText>Business Name</HeadText>,
    cell: (info) => <BodyText>{info.getValue()}</BodyText>,
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
