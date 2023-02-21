import {
  Container,
  TextInput,
  TextInputForm,
  Messages,
  SubjectInput,
  TextBody,
} from './style'
import { CommonButton } from 'components/button'
import { Send } from 'asset/svg'
import { messageSchema } from './constants'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { MessageBubble } from 'components/cards'
import { compareDesc, differenceInDays, isToday, isYesterday } from 'date-fns'
import {
  useAddNotificationMutation,
  useGetNotificationsByServiceIdQuery,
} from 'services/chatService'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { ChatInput } from './chatInput'

export const ChatBody = ({ data }) => {
  const location = useLocation()
  let params = new URLSearchParams(location.search)
  let notificationId = params.get('notificationId')

  const message = data?.filter((el) => el?.notificationId === notificationId)[0]
  console.log(message)

  return (
    <Container>
      <Messages>
        <MessageBubble {...message} />
      </Messages>
      <ChatInput />
    </Container>
  )
}
