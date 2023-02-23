import { Container, Messages } from './style'
import { MessageBubble } from 'components/cards'
import { useLocation } from 'react-router-dom'
import { ChatInput } from './chatInput'
import { getSelectedThread } from '../Chats/actions'

export const ChatBody = ({ data, threadsRefetch }) => {
  const location = useLocation()
  let params = new URLSearchParams(location.search)
  let subject = params.get('subject')

  const selectedThread = getSelectedThread(data, subject)
  // console.log(data);

  return (
    <Container>
      <Messages>
        {subject &&
          selectedThread?.messages?.map((msg) => (
            <MessageBubble {...msg} threadsRefetch ={threadsRefetch} />
          ))}
      </Messages>
      <ChatInput
        message={selectedThread?.messages[0]}
        threadsRefetch={threadsRefetch}
      />
    </Container>
  )
}
