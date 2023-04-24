import { getUnReadNotifications } from "components/navbar/actions";
import { formatDistanceToNow, parseJSON } from "date-fns";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateNotificationMutation } from "services/chatService";
import { Node } from "slate";
import { checkStaffEmail } from "utils/globalFunctions";
import {
  ImageContainer,
  Message,
  MessageBody,
  MessageSubject,
  MessageTIme,
  NotificationContainer,
} from "./style";

const SingleNotification = ({ item, handleBlur, refetch }) => {
  const [updateNotification] = useUpdateNotificationMutation();

  const serializeToText = (nodes) => {
    return nodes.map((n) => Node.string(n)).join("\n");
  };

  const navigate = useNavigate();

  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let userEmail = localStorage.getItem("userEmail");
  let staffEmail = checkStaffEmail(userEmail);

  const handleClick = () => {
    updateReadField(item);
    navigate(
      staffEmail
        ? `/staff-dashboard/businesses/services/chats?serviceId=${item?.serviceId}&subject=${item?.messageSubject}`
        : `/dashboard/my-products/chats/?serviceId=${item?.serviceId}&subject=${item?.messageSubject}`
    );
    handleBlur();
  };

  const parse = (messageBody) => {
    try {
      return serializeToText(JSON.parse(messageBody));
    } catch (err) {
      return messageBody;
    }
  };

  const message = parse(item?.messageBody);
  // const handleRead = () => {
  //   let unread = getUnReadNotifications(data);
  //   unread?.forEach((el) => updateReadField(el));
  // };

  const updateReadField = async (notification) => {
    let requiredData = {
      notificationId: notification?.notificationId,
      senderId: notification?.senderId,
      serviceId: notification?.serviceId,
      messageSubject: notification?.messageSubject,
      messageBody: notification?.messageBody,
      messageIsRead: true,
      messageFiles: notification?.messageFiles,
    };
    const response = await updateNotification(requiredData);
    if (response?.data) refetch();
  };

  let isMyMessage = staffEmail
    ? item?.senderId === "Sidebrief"
    : item?.senderId === userInfo?.username;

  return (
    <NotificationContainer $read={item?.messageIsRead}>
      <ImageContainer isMyMessage={isMyMessage}>
        <span>{item?.senderId?.slice(0, 2)}</span>
      </ImageContainer>
      <Message onClick={handleClick}>
        <MessageSubject>{item.messageSubject}</MessageSubject>

        <MessageBody>{message}</MessageBody>
        <MessageTIme>
          {formatDistanceToNow(parseJSON(item.createdAt), {
            addSuffix: true,
          })}
        </MessageTIme>
      </Message>
    </NotificationContainer>
  );
};

export default SingleNotification;
