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
import { checkStaffEmail } from "utils/globalFunctions.js";
import { useEffect } from "react";

//

const ChatCard = ({ messages, threadsRefetch }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();
  let params = new URLSearchParams(location.search);
  let subject = params.get("subject");

  const { senderId, messageBody, messageSubject, serviceId, messageIsRead } =
    messages[0];

  let isActive = messageSubject === subject;

  const openChat = () => {
    let newParams = {
      serviceId: serviceId,
      subject: messageSubject,
    };
    setSearchParams(newParams);
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

  let userInfo = localStorage.getItem("userInfo");
  let userEmail = localStorage.getItem("userEmail");
  let staffEmail = checkStaffEmail(userEmail);

  let isRead = messageIsRead
    ? messageIsRead
    : staffEmail
    ? senderId === "Sidebrief"
    : senderId === userInfo?.username;
  // console.log(JSON.parse(messageBody));
  // console.log(message)
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
