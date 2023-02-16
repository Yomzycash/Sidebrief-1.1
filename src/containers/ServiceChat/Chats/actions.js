import { parseJSON, compareAsc } from "date-fns";

export const getMessages = (data) => {
	const uniqueSenders = [...new Set(data?.map((el) => el.serviceId))];

	const uniqueData = uniqueSenders
		.map((el) => {
			const relatedData = data?.filter(
				(notification) => notification.serviceId === el
			);

			return {
				serviceId: el,
				notification: relatedData.sort((a, b) =>
					compareAsc(parseJSON(a.createdAt), parseJSON(b.createdAt))
				),
			};
		})
		.filter((el) => {
			return el.notification.length > 0;
		});

	return uniqueData;
};
