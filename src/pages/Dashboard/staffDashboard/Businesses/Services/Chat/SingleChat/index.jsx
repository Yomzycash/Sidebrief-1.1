import { Container } from './style'
import { ChatHead, ChatBody } from 'containers/ServiceChat'

const SingleChat = ({ isUser, paramsId }) => {
  return (
    <Container>
      <ChatHead isUser={isUser} />
      <ChatBody isUser={isUser} paramsId={paramsId} />
    </Container>
  )
}

export default SingleChat
