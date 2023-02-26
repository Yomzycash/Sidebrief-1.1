import React from "react";
import { EmptyNotification } from "./styled";

const EmptyBellNotification = ({ active }) => {
  let curr = active?.all ? "" : "";
  curr = active?.read ? "read" : "";
  curr = active?.unread ? "new" : "";

  return (
    <EmptyNotification>
      You have no
      {" " + curr + " "}
      notification at the moment
    </EmptyNotification>
  );
};

export default EmptyBellNotification;
