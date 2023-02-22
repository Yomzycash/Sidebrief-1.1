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

const ChatCard = ({ notification }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const location = useLocation();
  let params = new URLSearchParams(location.search);
  let serviceId = params.get("serviceId");
  let notificationId = params.get("notificationId");

  const { messageBody, messageSubject } = notification;

  let isActive = notificationId === notification?.notificationId;

  const openChat = () => {
    let newParams = {
      serviceId: serviceId,
      notificationId: notification?.notificationId,
    };
    setSearchParams(newParams);
  };

  // const isSelected = currentSelected === serviceId;

  // const lastMessage = (messages) => {
  //   return messages?.serviceNotifications[
  //     messages.serviceNotifications?.length - 1
  //   ];
  // };

  const serializeToText = (nodes) => {
    return nodes.map((n) => Node.string(n)).join("\n");
  };
  // console.log(messageBody);

  const message = serializeToText(JSON.parse(messageBody));

  return (
    <Container onClick={openChat} selected={isActive}>
      <TopContainer>
        <InnerContainer>
          <ImageContainer>
            <Image src={profile} alt="" />
          </ImageContainer>
          <NameContainer>
            <UpperText>{notification?.serviceId}</UpperText>
            <LowerText>{messageSubject}</LowerText>
          </NameContainer>
        </InnerContainer>
        {/* <LowerText>{new Date(lastMessage(messages)?.updatedAt)}</LowerText> */}
      </TopContainer>

      <LowerWrapper>{message}</LowerWrapper>
    </Container>
  );
};

export default ChatCard;

const ActiveStyle = {
  background: "#00a2d419",
  color: "#00a2d4",
};
