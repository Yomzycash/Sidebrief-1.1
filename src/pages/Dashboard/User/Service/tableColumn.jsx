import React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import {
  HeadText,
  BodyText,
  Clickable,
} from "../../staffDashboard/Businesses/BusinessRegistration/styles";
import { useNavigate } from "react-router-dom";
import { userNavigateToServiceDetailPage } from "utils/globalFunctions";
import { format, parseJSON } from "date-fns";

const ColumnHelper = createColumnHelper();

const TableActions = () => {
  const navigate = useNavigate();

  const clickService = (complyCode) => {
    userNavigateToServiceDetailPage(navigate, complyCode);
  };

  return { clickService };
};

export const columns = [
  ColumnHelper.accessor("complyCode", {
    header: () => <HeadText>Comply Code</HeadText>,
    cell: (info) => {
      const { clickService } = TableActions();
      return (
        <Clickable onClick={() => clickService(info?.row?.original?.complyCode)}>
          <BodyText>{info.getValue()}</BodyText>
        </Clickable>
      );
    },
  }),
  ColumnHelper.accessor("serviceId", {
    header: () => <HeadText>Service Id</HeadText>,
    cell: (info) => {
      const { clickService } = TableActions();
      return (
        <Clickable onClick={() => clickService(info?.row?.original?.complyCode)}>
          <BodyText>{info.getValue()}</BodyText>
        </Clickable>
      );
    },
  }),
  // ColumnHelper.accessor("meta", {
  //   header: () => <HeadText></HeadText>,
  //   cell: (info) => {
  //     const { clickService } = TableActions();
  //     return (
  //       <Clickable onClick={() => clickService(info?.row?.original?.complyCode)}>
  //         <BodyText>{info.getValue()}</BodyText>
  //       </Clickable>
  //     );
  //   },
  // }),

  ColumnHelper.accessor("date", {
    header: () => <HeadText>Date</HeadText>,
    cell: (info) => {
      const { clickService } = TableActions();
      return (
        <Clickable onClick={() => clickService(info?.row?.original?.complyCode)}>
          <BodyText>{format(parseJSON(info.getValue()), "dd-MM-yyyy")}</BodyText>
        </Clickable>
      );
    },
  }),
];
