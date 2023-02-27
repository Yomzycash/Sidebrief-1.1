import { checkStaffEmail } from "utils/globalFunctions";

// data is an array of notifications
export const getReceivedNotifications = (data) => {
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let userEmail = localStorage.getItem("userEmail");
  let staffEmail = checkStaffEmail(userEmail);

  let receivedMessages = data?.filter((el) =>
    staffEmail
      ? el?.senderId !== "Sidebrief"
      : el?.senderId !== userInfo?.username
  );

  return receivedMessages;
};

export const getReadNotifications = (data) => {
  return getReceivedNotifications(data)?.filter(
    (el) => el?.messageIsRead === true
  );
};

export const getUnReadNotifications = (data) => {
  return getReceivedNotifications(data)?.filter(
    (el) => el?.messageIsRead === false
  );
};
