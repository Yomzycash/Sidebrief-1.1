// import React from "react";
// import { createColumnHelper } from "@tanstack/react-table";
// import { ReactComponent as ThreeDot } from "asset/svg/threeDot.svg";
// import {
//   ThreeDotContainer,
//   HeadText,
//   BodyText,
// } from "../ApplicationTable/styles";
// import numeral from "numeral";

// const ColumnHelper = createColumnHelper();

// export const columns = [
//   ColumnHelper.accessor((row) => row.id, {
//     id: "S/N",
//     header: ({ header }) => {
//       return <HeadText>{header.id}</HeadText>;
//     },
//     cell: (info) => (
//       <BodyText>{numeral(info.row.index + 1).format("00")}</BodyText>
//     ),
//   }),
//   ColumnHelper.accessor("name", {
//     header: () => <HeadText>Business Name</HeadText>,
//     cell: (info) => <BodyText>{info.getValue()}</BodyText>,
//   }),
//   ColumnHelper.accessor("country", {
//     header: () => <HeadText>Country</HeadText>,
//     cell: (info) => <BodyText>{info.getValue()}</BodyText>,
//   }),
//   ColumnHelper.accessor("date", {
//     header: () => <HeadText>Date</HeadText>,
//     cell: (info) => <BodyText>{info.getValue()}</BodyText>,
//   }),
//   // ColumnHelper.display({
//   //   id: "actions",
//   //   cell: ({ row }) => {
//   //     return (
//   //       <ThreeDotContainer onClick={() => console.log(row.index)}>
//   //         <ThreeDot />
//   //       </ThreeDotContainer>
//   //     );
//   //   },
//   // }),
// ];

export const businessesHeader = [
  {
    id: "all",
    text: "All Registrations",
    path: "/staff-dashboard/businesses/all",
  },
  {
    id: "awaiting",
    text: "Awaiting Approval",
    path: "/staff-dashboard/businesses/awaiting-approval",
  },
  {
    id: "progress",
    text: "In progress",
    path: "/staff-dashboard/businesses/in-progress",
  },
  {
    id: "completed",
    text: "Completed",
    path: "/staff-dashboard/businesses/completed",
  },
];
