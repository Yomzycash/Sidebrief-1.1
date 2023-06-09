import FeatureTable from "components/Tables/FeatureTable";
import { format } from "date-fns";
import React from "react";
import { useOutletContext } from "react-router-dom";
import { useUserManagementActions } from "../actions";

const CMUsers = () => {
  const { usersData } = useOutletContext();

  const { handleTableClick } = useUserManagementActions({ usersData });

  // Tabele header
  const header = ["Name", "Phone", "Date"];

  // Table body
  const dataBody = usersData?.map((el) => [
    el?.first_name + " " + el.last_name,
    el?.phone,
    format(new Date(el?.createdAt), "dd-MMM-yyyy"),
  ]);

  return (
    <FeatureTable
      header={header}
      body={dataBody}
      onClick={handleTableClick}
      bodyFullData={usersData}
      rowCursor="pointer"
    />
  );
};

export default CMUsers;
