import FeatureTable from "components/Tables/FeatureTable";
import { format } from "date-fns";
import React from "react";
import { useOutletContext } from "react-router-dom";
import { useUserManagementActions } from "../actions";

const CMLaunches = () => {
  const { dataArr, setDataArr } = useOutletContext();

  const { handleTableClick } = useUserManagementActions({ dataArr, setDataArr });

  // Tabele header
  const header = ["Name", "Phone", "Date", "Action"];

  // Table body
  const dataBody = dataArr?.map((el) => [
    el?.first_name + " " + el.last_name,
    el?.phone,
    format(new Date(el?.createdAt), "dd-MMM-yyyy"),
    "Email",
  ]);

  return (
    <FeatureTable
      header={header}
      body={dataBody}
      onClick={handleTableClick}
      bodyFullData={dataArr}
    />
  );
};

export default CMLaunches;
