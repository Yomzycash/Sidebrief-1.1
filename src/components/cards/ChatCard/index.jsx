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
  Top,
} from "./styled.js";
import { useNavigate } from "react-router-dom";

const ChatCard = ({
  image,
  name,
  serviceName,
  time,
  message,
  serviceId,
  currentSelected,
}) => {
  const navigate = useNavigate();

  const openChat = (id) => {
    navigate(`${id}`);
  };

  const isSelected = currentSelected === serviceId;

  return (
    <Container onClick={() => openChat(serviceId)} selected={isSelected}>
      <TopContainer>
        <InnerContainer>
          <ImageContainer>
            <Image src={image} alt="" />
          </ImageContainer>
          <NameContainer>
            <UpperText>{name}</UpperText>
            <LowerText>{serviceName}</LowerText>
          </NameContainer>
        </InnerContainer>
        <LowerText>{time}</LowerText>
      </TopContainer>
      <LowerWrapper>{message}</LowerWrapper>
    </Container>
  );
};

export default ChatCard;
