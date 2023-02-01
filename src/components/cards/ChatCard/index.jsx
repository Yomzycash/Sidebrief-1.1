import React from 'react'
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
} from './styled.js'

const ChatCard = ({ image, name, serviceName, time, message, actions =() =>{}}) => {
  return (
    <Container>
      <TopContainer>
        <InnerContainer onClick={actions}>
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
  )
}

export default ChatCard
