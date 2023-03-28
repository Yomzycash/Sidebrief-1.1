import React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import {
  HeadText,
  BodyText,
  Clickable,
} from "../../staffDashboard/Businesses/BusinessRegistration/styles";
import { TypeIndicator } from "components/Indicators";
import { useNavigate } from "react-router-dom";
import { useGetAllServicesQuery } from "services/staffService";
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
// const TableColumn = () => {
//     const { data } = useGetAllServicesQuery();
//     console.log("myservice", data);

//     const serviceBody = data?.map((service) => [
// 		service?.serviceName,
// 		service?.serviceCategory,
// 		service?.serviceCountry,
// 		service?.createdAt?.split("T")[0]
// 	])

//     console.log("serviceBody", serviceBody)
//     return (
//         <div>tableColumn</div>
//     )
// }

// export default TableColumn;
