import React from "react";
import { Status } from "./styles";
import { getStatus, checkIsString } from "./actions";

// 4 possible status, "completed" | "awaiting" | "progress" | "declined"
export const StatusIndicator = ({ status }) => {
  return (
    <>
      {checkIsString(status) ? (
        <Status status={status}>{getStatus(status)}</Status>
      ) : (
        <Status color={status.color}>{status.text}</Status>
      )}
    </>
  );
};
