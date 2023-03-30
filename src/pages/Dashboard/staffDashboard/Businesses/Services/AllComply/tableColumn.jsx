import { createColumnHelper } from "@tanstack/react-table";
import { HeadText, BodyText, Clickable } from "../Service/styled";
// import { TypeIndicator } from "components/Indicators";
import { parseJSON, format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { staffNavigateToServiceDetailPage } from "utils/globalFunctions";

const ColumnHelper = createColumnHelper();

const TableActions = () => {
  const navigate = useNavigate();

  const clickService = (complyCode) => {
    staffNavigateToServiceDetailPage(navigate, complyCode);
  };

  return { clickService };
};

export const columns = [
  ColumnHelper.accessor("complyCode", {
    header: () => <HeadText>Comply code</HeadText>,
    cell: (info) => {
      const { clickService } = TableActions();
      return (
        <Clickable onClick={() => clickService(info.row.original.complyCode)}>
          <BodyText>{info.getValue()}</BodyText>
        </Clickable>
      );
    },
  }),
  ColumnHelper.accessor("serviceId", {
    header: () => <HeadText>Service ID</HeadText>,
    cell: (info) => {
      const { clickService } = TableActions();
      return (
        <Clickable onClick={() => clickService(info.row.original.complyCode)}>
          <BodyText>{info.getValue()}</BodyText>
        </Clickable>
      );
    },
  }),
  ColumnHelper.accessor("meta", {
    header: () => <HeadText>User code</HeadText>,
    cell: (info) => {
      const { clickService } = TableActions();
      return (
        <Clickable onClick={() => clickService(info.row.original.complyCode)}>
          <BodyText>{info.getValue()}</BodyText>
        </Clickable>
      );
    },
  }),
  ColumnHelper.accessor("date", {
    header: () => <HeadText>Date</HeadText>,
    cell: (info) => {
      const { clickService } = TableActions();
      return (
        <Clickable onClick={() => clickService(info.row.original.complyCode)}>
          <BodyText>{format(parseJSON(info.getValue()), "dd-MM-yyyy")}</BodyText>
        </Clickable>
      );
    },
  }),
];
