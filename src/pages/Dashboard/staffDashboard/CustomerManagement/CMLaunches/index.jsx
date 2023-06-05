import FeatureTable from "components/Tables/FeatureTable";
import { format } from "date-fns";
import React from "react";
import { useOutletContext } from "react-router-dom";
import { useUserManagementActions } from "../actions";

const CMLaunches = () => {
  const { launchUsers } = useOutletContext();

  const { handleTableClick } = useUserManagementActions({ launchUsers });

  // Tabele header
  const header = ["Name", "Phone", "Date", "Action"];

  // Table body
  const dataBody = launchUsers?.map((el) => [
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
      bodyFullData={launchUsers}
    />
  );
};

export default CMLaunches;
