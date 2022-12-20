import React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { ReactComponent as ThreeDot } from "asset/svg/threeDot.svg";
import { ThreeDotContainer, HeadText, BodyText } from "./styles";
import { StatusIndicator } from "components/Indicators";
import numeral from "numeral";

const ColumnHelper = createColumnHelper();

// what the data should look like
// export const MockData = [
// 	{
// 		id: 1,
// 		name: "Oluwatimilehin Lawal",
// 		type: "C-Corporation",
// 		country: "Nigeria",
// 		status: "awaiting",
// 		date: "28/08/2022",
// 	},
// 	{
// 		id: 2,
// 		name: "Daniel John",
// 		type: "Limited Liability Company",
// 		country: "South Africa",
// 		status: "progress",
// 		date: "28/08/2022",
// 	},
// 	{
// 		id: 3,
// 		name: "Abdulsalam Akinlusi",
// 		type: "Public Limited Company",
// 		country: "Togo",
// 		status: "completed",
// 		date: "28/08/2022",
// 	},
// 	{
// 		id: 4,
// 		name: "Ismael Hassan",
// 		type: "Limited Liability Company",
// 		country: "Nigeria",
// 		status: "declined",
// 		date: "28/08/2022",
// 	},
// 	{
// 		id: 5,
// 		name: "Ismael Hassan",
// 		type: "C-Corporation",
// 		country: "Nigeria",
// 		status: "declined",
// 		date: "28/08/2022",
// 	},{
// 		id: 6,
// 		name: "Ismael Hassan",
// 		type: "Public Limited Company",
// 		country: "Nigeria",
// 		status: "declined",
// 		date: "28/08/2022",
// 	},{
// 		id: 7,
// 		name: "Ismael Hassan",
// 		type: "Limited Liability Company",
// 		country: "Nigeria",
// 		status: "declined",
// 		date: "28/08/2022",
// 	},{
// 		id: 8,
// 		name: "Ismael Hassan",
// 		type: "Public Limited Company",
// 		country: "Nigeria",
// 		status: "declined",
// 		date: "28/08/2022",
// 	},
// 	{
// 		id: 9,
// 		name: "Ismael Hassan",
// 		type: "Limited Liability Company",
// 		country: "Nigeria",
// 		status: "declined",
// 		date: "28/08/2022",
// 	},
// 	{
// 		id: 10,
// 		name: "Ismael Hassan",
// 		type: "C-Corporation",
// 		country: "Nigeria",
// 		status: "declined",
// 		date: "28/08/2022",
// 	},
// ];

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
