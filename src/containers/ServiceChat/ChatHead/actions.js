const statuses = [
	{
		id: "new",
		text: "New Request",
		color: "#D400CC",
	},
	{
		id: "progress",
		text: "In Progress",
		color: "#FFBF29",
	},
	{
		id: "completed",
		text: "Completed",
		color: "green",
	},
];

export const useActions = () => {
	const getStatus = (id) => {
		return { ...statuses.find((el) => el.id === id) };
	};

	return { getStatus };
};
