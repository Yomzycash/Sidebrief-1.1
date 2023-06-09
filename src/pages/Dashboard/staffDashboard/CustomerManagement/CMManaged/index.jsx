import FeatureTable from "components/Tables/FeatureTable";
import { format } from "date-fns";
import React from "react";
import { useOutletContext } from "react-router-dom";
import { useUserManagementActions } from "../actions";

const CMManaged = () => {
  const { manageUsers } = useOutletContext();

  const { handleTableClick } = useUserManagementActions({ manageUsers });

  // Tabele header
  const header = ["Name", "Phone", "Date"];

  // Table body
  const dataBody = manageUsers?.map((el) => [
    el?.first_name + " " + el.last_name,
    el?.phone,
    format(new Date(el?.createdAt), "dd-MMM-yyyy"),
  ]);

  return (
    <FeatureTable
      header={header}
      body={dataBody}
      onClick={handleTableClick}
      bodyFullData={manageUsers}
      rowCursor="pointer"
    />
  );
};

export default CMManaged;
