import { parseJSON, compareAsc } from "date-fns";

export const getMessages = (data) => {
	const uniqueSenders = [...new Set(data?.map((el) => el.senderId))];

	const uniqueData = uniqueSenders
		.map((el) => {
			const relatedData = data?.filter(
				(notification) => notification.senderID === el
			);

			return {
				senderID: el,
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

export const getServiceIDMessages = (data) => {
	const senderMessages = getMessages(data)
	const uniqueServiceID = [...new Set(senderMessages?.map((el) => el.serviceID))];

	const uniqueData =uniqueServiceID
		.map((el) => {
			const relatedData = senderMessages?.filter(
				(notification) => notification.serviceID === el
			);

			return {
				serviceID: el,
				notification: relatedData.sort((a, b) =>
					compareAsc(parseJSON(a.createdAt), parseJSON(b.createdAt))
				),
			};
		})

		// .filter((el) => {
		// 	return el.notification.length > 0;
		// });

	return uniqueData;
};