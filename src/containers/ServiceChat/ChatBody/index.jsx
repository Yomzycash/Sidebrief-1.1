import { Container, Messages } from './style'
import { MessageBubble } from 'components/cards'
import { useLocation, useSearchParams } from 'react-router-dom'
import { ChatInput } from './chatInput'
import { getSelectedThread } from '../Chats/actions'
import EmptyChatRight from 'components/texts/EmptyChat/EmptyChatRight'
import { useUpdateNotificationMutation } from 'services/chatService'
import { useEffect } from 'react'
import { checkStaffEmail } from 'utils/globalFunctions'
import { getUnReadNotifications } from 'components/navbar/actions'
import { useSelector } from 'react-redux'

export const ChatBody = ({ data, threadsRefetch }) => {
  const [updateNotification] = useUpdateNotificationMutation()

  const location = useLocation()
  let params = new URLSearchParams(location.search)
  let subject = params.get('subject')

  const selectedThread = getSelectedThread(data, subject)
  // const [category] = useSearchParams()
  // const femi = category.get('serviceId')
  // console.log(femi)

  // const { refreshNotifications } = useSelector(
  //   (store) => store.UserDataReducer
  // );

  // useEffect(() => {
  //   handleRead();
  // }, [refreshNotifications]);

  // const handleRead = () => {
  //   let unread = getUnReadNotifications(data);
  //   unread?.forEach((el) => updateReadField(el));
  // };

  // const updateReadField = async (notification) => {
  //   let requiredData = {
  //     notificationId: notification?.notificationId,
  //     senderId: notification?.senderId,
  //     serviceId: notification?.serviceId,
  //     messageSubject: notification?.messageSubject,
  //     messageBody: notification?.messageBody,
  //     messageIsRead: true,
  //     messageFiles: notification?.messageFiles,
  //   };
  //   const response = await updateNotification(requiredData);
  //   if (response?.data) threadsRefetch();

  //   console.log(response);
  // };

  return (
    <Container>
      <Messages>
        {selectedThread?.messages?.length > 0 ? (
          <>
            {subject &&
              selectedThread?.messages?.map((msg, index) => (
                <MessageBubble
                  {...msg}
                  key={index}
                  threadsRefetch={threadsRefetch}
                />
              ))}
          </>
        ) : (
          <EmptyChatRight />
        )}
      </Messages>
      <ChatInput
        message={selectedThread?.messages[0]}
        threadsRefetch={threadsRefetch}
      />
    </Container>
  )
}
