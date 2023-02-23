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
import profile from "asset/images/profile.svg";
import { Node } from "slate";
import { useUpdateNotificationMutation } from "services/chatService.js";
import { handleResponse } from "pages/Launch/actions";
import { handleError } from "utils/globalFunctions";

//

const ChatCard = ({ messages }) => {
  const [updateNotification, updateState] = useUpdateNotificationMutation();

  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();
  let params = new URLSearchParams(location.search);
  let subject = params.get("subject");

  const { messageBody, messageSubject, serviceId, messageIsRead } = messages[0];

  let isActive = messageSubject === subject;

  const openChat = () => {
    let newParams = {
      serviceId: serviceId,
      subject: messageSubject,
    };
    setSearchParams(newParams);

    let unread = messages?.filter((el) => el?.messageIsRead === false);
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
    console.log(requiredData);
    const response = await updateNotification(requiredData);

    if (response?.data) handleResponse(response);
    else handleError(response?.error);
    console.log(response);
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

  // console.log(JSON.parse(messageBody));

  return (
    <Container onClick={openChat} selected={isActive}>
      <TopContainer>
        <InnerContainer>
          <ImageContainer>
            <Image src={profile} alt="" />
          </ImageContainer>
          <NameContainer>
            {/* <UpperText>{serviceId}</UpperText> */}
            <UpperText $read={messageIsRead}>{messageSubject}</UpperText>
            {/* <LowerText>{messageSubject}</LowerText> */}
          </NameContainer>
        </InnerContainer>
        {/* <LowerText>{new Date(lastMessage(message)?.updatedAt)}</LowerText> */}
      </TopContainer>

      <LowerWrapper $read={messageIsRead}>{message}</LowerWrapper>
    </Container>
  );
};

export default ChatCard;

const ActiveStyle = {
  background: "#00a2d419",
  color: "#00a2d4",
};
