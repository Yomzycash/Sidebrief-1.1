export const getStatus = (status) => {
	switch (status) {
		case "completed":
			return "Completed";
		case "awaiting":
		case "submitted":
			return "Awaiting Approval";
		case "progress":
			return "In Progress";
		case "declined":
			return "Declined";
		case "draft":
		case "pending":
			return "Draft";
		default:
			return "";
	}
};

export const checkIsString = (string) => {
	if (typeof string === "string" || string instanceof String) return true;
	else return false;
};
