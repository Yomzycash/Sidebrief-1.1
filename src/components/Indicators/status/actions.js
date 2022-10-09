export const getStatus = (status) => {
	switch (status) {
		case "completed":
			return "Completed";
		case "awaiting":
			return "Awaiting Approval";
		case "progress":
			return "In Progress";
		case "declined":
			return "Declined";
		case "draft":
			return "Draft";
		default:
			return "";
	}
};
