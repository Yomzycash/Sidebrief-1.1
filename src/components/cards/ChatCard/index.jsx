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
  Wrapper,
  ListWrapper,
} from './styled.js'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import profile from 'asset/images/profile.svg'
import { useSendResetPasswordCodeMutation } from 'services/authService.js'

const ChatCard = ({
  chats,
  image,
  name,
  serviceName,
  time,
  message,
  serviceId,
  currentSelected,
  setParamsId,
}) => {
  const [iconHovered, setIconHovered] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const ActiveStyle = {
    background: '#00a2d419',
    color: '#00a2d4',
  }
  const navigate = useNavigate()

  const openChat = (serviceId, senderId) => {
    let id = {
      serviceId: serviceId,
      senderId: senderId,
    }
    setParamsId(id)
  }

  const isSelected = currentSelected === serviceId

  const lastMessage = (messages) => {
    return messages?.serviceNotifications[
      messages.serviceNotifications?.length - 1
    ]
  }

  return (
    <Wrapper>
      <ListWrapper>
        <div onClick={() => setCollapsed(!collapsed)}>{chats?.senderId}</div>
      </ListWrapper>
      {chats?.servicesMessages?.map((messages, index) => (
        <Container
          key={index}
          onClick={() => openChat(messages?.serviceId, chats?.senderId)}
          selected={isSelected}
        >
          <TopContainer>
            <InnerContainer>
              <ImageContainer>
                <Image src={profile} alt="" />
              </ImageContainer>
              <NameContainer>
                <UpperText>{lastMessage(messages)?.serviceId}</UpperText>
                <LowerText>{lastMessage(messages)?.messageSubject}</LowerText>
              </NameContainer>
            </InnerContainer>
            {/* <LowerText>{new Date(lastMessage(messages)?.updatedAt)}</LowerText> */}
          </TopContainer>

          <LowerWrapper>{lastMessage(messages)?.messageBody}</LowerWrapper>
        </Container>
      ))}
    </Wrapper>
  )
}

export default ChatCard
