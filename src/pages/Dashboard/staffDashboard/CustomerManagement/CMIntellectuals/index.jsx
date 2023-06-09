import FeatureTable from "components/Tables/FeatureTable";
import { format } from "date-fns";
import React from "react";
import { useOutletContext } from "react-router-dom";
import { useUserManagementActions } from "../actions";

const CMIntellectuals = () => {
  const { intellectualUsers } = useOutletContext();

  const { handleTableClick } = useUserManagementActions({ intellectualUsers });

  // Tabele header
  const header = ["Name", "Phone", "Date"];

  // Table body
  const dataBody = intellectualUsers?.map((el) => [
    el?.first_name + " " + el.last_name,
    el?.phone,
    format(new Date(el?.createdAt), "dd-MMM-yyyy"),
  ]);

  return (
    <FeatureTable
      header={header}
      body={dataBody}
      onClick={handleTableClick}
      bodyFullData={intellectualUsers}
      rowCursor="pointer"
    />
  );
};

export default CMIntellectuals;
