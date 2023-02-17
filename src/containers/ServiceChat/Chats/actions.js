import { parseJSON, compareAsc } from "date-fns";

export const getMessages = (data) => {
	const uniqueSenders = [...new Set(data?.map((el) => el.serviceId))];

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

export const getUsersMessages = (data) => {
  const uniqueSenders = [
    ...new Set(data?.map((el) => el.senderId || el.senderID)),
  ].filter((el) => el !== undefined);
  // console.log(data);

  const uniqueData = uniqueSenders.map((el) => {
    const relatedData = data?.filter(
      (notification) =>
        notification.senderID === el || notification.senderId === el
    );
    let notifications = relatedData.sort((a, b) =>
      compareAsc(parseJSON(a.createdAt), parseJSON(b.createdAt))
    );

    let servicesMessages = getServicesMessages(notifications);

    return { senderId: el, servicesMessages: servicesMessages };

    
  });
  
 


  return uniqueData;
};

const getServicesMessages = (notifications) => {
  let uniqueServicesId = [
    ...new Set(notifications?.map((el) => el?.serviceID || el?.serviceId)),
  ];

  let servicesNotifications = uniqueServicesId?.map((id) => ({
    serviceId: id,
    serviceNotifications: notifications?.filter((el) => el?.serviceId === id || el?.serviceID===id),
  }));

  return servicesNotifications;
};

// export const getServiceIDMessages = (data) => {
// 	const senderMessages = getMessages(data)
// 	const uniqueServiceID = [...new Set(senderMessages?.map((el) => el.serviceID))];

// 	const uniqueData =uniqueServiceID
// 		.map((el) => {
// 			const relatedData = data?.filter(
// 				(notification) => notification.serviceId === el
// 			);

// 			return {
// 				serviceId: el,
// 				notification: relatedData.sort((a, b) =>
// 					compareAsc(parseJSON(a.createdAt), parseJSON(b.createdAt))
// 				),
// 			};
// 		})

// 		// .filter((el) => {
// 		// 	return el.notification.length > 0;
// 		// });

// 	return uniqueData;
// };