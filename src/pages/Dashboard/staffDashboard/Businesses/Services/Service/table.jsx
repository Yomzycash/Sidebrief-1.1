import { createColumnHelper } from "@tanstack/react-table";
import { HeadText, BodyText } from "./styled";
import { TypeIndicator } from "components/Indicators";
import { parseJSON, format } from "date-fns";

const ColumnHelper = createColumnHelper();

export const columns = [
  ColumnHelper.accessor("complyCode", {
    header: () => <HeadText>Comply code</HeadText>,
    cell: (info) => {
      return <BodyText>{info.getValue()}</BodyText>;
    },
  }),
  ColumnHelper.accessor("serviceId", {
    header: () => <HeadText>Service ID</HeadText>,
    cell: (info) => {
      return <BodyText>{info.getValue()}</BodyText>;
    },
  }),
  ColumnHelper.accessor("meta", {
    header: () => <HeadText>User code</HeadText>,
    cell: (info) => {
      return <div>{info.getValue()}</div>;
    },
  }),
  ColumnHelper.accessor("date", {
    header: () => <HeadText>Date</HeadText>,
    cell: (info) => {
      return <BodyText>{format(parseJSON(info.getValue()), "dd-mm-yyyy")}</BodyText>;
    },
  }),
];
