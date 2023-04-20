import React from "react";
import {
  Container,
  TopContainer,
  ImageContainer,
  Image,
  NameContainer,
  UpperText,
  LowerText,
  LowerWrapper,
  InnerContainer,
} from "./styled.js";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import profile from 'asset/images/profile.svg'
import { Node } from "slate";
import { checkStaffEmail } from "utils/globalFunctions.js";
import { useEffect } from "react";
import { useUpdateNotificationMutation } from "services/chatService.js";
import { getUnReadNotifications } from "components/navbar/actions.js";
import { store } from "redux/Store.js";
import { setRefreshNotifications } from "redux/Slices.js";
import { useSelector } from "react-redux";

//

const ChatCard = ({ messages, threadsRefetch }) => {
  const [updateNotification, updateState] = useUpdateNotificationMutation();

  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();
  let params = new URLSearchParams(location.search);
  let subject = params.get("subject");

  const { refreshNotifications } = useSelector((store) => store.UserDataReducer);

  const { senderId, messageBody, messageSubject, serviceId, messageIsRead } = messages[0];

  let isActive = messageSubject === subject;

  const handleRead = () => {
    let unread = getUnReadNotifications(messages);
    unread?.forEach((el) => updateReadField(el));
  };

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
    if (response?.data) threadsRefetch();

    store.dispatch(setRefreshNotifications(!refreshNotifications));

  };

  const openChat = () => {
    let newParams = {
      serviceId: serviceId,
      subject: messageSubject,
    };
    setSearchParams(newParams);
    handleRead();
  };

  const serializeToText = (nodes) => {
    return nodes.map((n) => Node.string(n)).join("\n");
  };

  const parse = (messageBody) => {
    try {
      return serializeToText(JSON.parse(messageBody));
    } catch (err) {
      return messageBody;
    }
  };

  const message = parse(messageBody);

  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let userEmail = localStorage.getItem("userEmail");
  let staffEmail = checkStaffEmail(userEmail);

  let isMyMessage = staffEmail ? senderId === "Sidebrief" : senderId === userInfo?.username;

  return (
    <Container onClick={openChat} selected={isActive} $read={messageIsRead || isMyMessage}>
      <TopContainer>
        <InnerContainer>
          <ImageContainer isMyMessage={isMyMessage}>
            <span>{senderId?.slice(0, 2)}</span>
          </ImageContainer>
          <NameContainer>
            {/* <UpperText>{serviceId}</UpperText> */}
            <UpperText>{messageSubject}</UpperText>
            {/* <LowerText>{messageSubject}</LowerText> */}
          </NameContainer>
        </InnerContainer>
        {/* <LowerText>{new Date(lastMessage(message)?.updatedAt)}</LowerText> */}
      </TopContainer>

      <LowerWrapper>{message}</LowerWrapper>
    </Container>
  );
};

export default ChatCard;
