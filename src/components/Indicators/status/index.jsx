import React from "react";
import { Status } from "./styles";
import { getStatus } from "./actions";

// 4 possible status, "completed" | "awaiting" | "progress" | "declined"
export const StatusIndicator = ({ status }) => {
	return <Status status={status}>{getStatus(status)}</Status>;
};
