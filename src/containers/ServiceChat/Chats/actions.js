import { parseJSON, compareAsc } from "date-fns";

export const getThreadedMessages = (data) => {
  const uniqueSubjects = [...new Set(data?.map((el) => el?.messageSubject))];

  let threads = uniqueSubjects?.map((subject) => {
    let messageThread = data?.filter((msg) => msg?.messageSubject === subject);

    messageThread = messageThread?.sort((a, b) =>
      compareAsc(new Date(b.updatedAt), new Date(a.updatedAt))
    );

    return {
      subject: subject,
      messages: messageThread,
    };
  });
  return threads;
};

export const getSelectedThread = (data, subject) => {
  let threadedMessages = getThreadedMessages(data);
  return threadedMessages?.find((thread) => thread?.subject === subject);
};

//

//

export const getUsersMessages = (data) => {
  const uniqueServicesId = [...new Set(data?.map((el) => el.serviceId))].filter(
    (el) => el !== undefined
  );

  const uniqueData = uniqueServicesId.map((el) => {
    const relatedData = data?.filter(
      (notification) => notification.serviceId === el
    );
    let notifications = relatedData.sort((a, b) =>
      compareAsc(parseJSON(b.updatedAt), parseJSON(a.updatedAt))
    );

    let servicesMessages = getServicesMessages(notifications);

    return {
      senderId: el,
      servicesMessages: servicesMessages,
    };
  });

  return uniqueData;
};

// Get a user's services messages
const getServicesMessages = (notifications) => {
  let uniqueServicesId = [
    ...new Set(notifications?.map((el) => el?.serviceID || el?.serviceId)),
  ];

  let servicesNotifications = uniqueServicesId?.map((id) => ({
    serviceId: id,
    serviceNotifications: notifications?.filter(
      (el) => el?.serviceId === id || el?.serviceID === id
    ),
  }));

  return servicesNotifications;
};

//

//

// DON NOT DELETE - MIGHT BE NEEDED IN THE FUTURE
// DON NOT DELETE - MIGHT BE NEEDED IN THE FUTURE
// DON NOT DELETE - MIGHT BE NEEDED IN THE FUTURE
// DON NOT DELETE - MIGHT BE NEEDED IN THE FUTURE
// DON NOT DELETE - MIGHT BE NEEDED IN THE FUTURE
// Get all users messages
// export const getUsersMessages = (data) => {
//   const uniqueSenders = [
//     ...new Set(data?.map((el) => el.senderId || el.senderID)),
//   ].filter((el) => el !== undefined);

//   const uniqueData = uniqueSenders.map((el) => {
//     const relatedData = data?.filter(
//       (notification) =>
//         notification.senderID === el || notification.senderId === el
//     );
//     let notifications = relatedData.sort((a, b) =>
//       compareAsc(parseJSON(a.createdAt), parseJSON(b.createdAt))
//     );

//     let servicesMessages = getServicesMessages(notifications);

//     return {
//       senderId: el,
//       servicesMessages: servicesMessages,
//     };
//   });

//   return uniqueData;
// };

// // Get a user's services messages
// const getServicesMessages = (notifications) => {
//   let uniqueServicesId = [
//     ...new Set(notifications?.map((el) => el?.serviceID || el?.serviceId)),
//   ];

//   let servicesNotifications = uniqueServicesId?.map((id) => ({
//     serviceId: id,
//     serviceNotifications: notifications?.filter(
//       (el) => el?.serviceId === id || el?.serviceID === id
//     ),
//   }));

//   return servicesNotifications;
// };
