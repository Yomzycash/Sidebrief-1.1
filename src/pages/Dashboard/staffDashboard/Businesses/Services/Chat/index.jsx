import { Outlet, useSearchParams } from 'react-router-dom'
import { ServiceChatLayout, Chats } from 'containers/ServiceChat'
import SingleChat from './SingleChat'

const ChatLayout = () => {
  const [paramsId, setParamsId] = useSearchParams()
  return (
    <ServiceChatLayout>
      <Chats setParamsId={setParamsId} />
      <SingleChat paramsId={paramsId} />
    </ServiceChatLayout>
  )
}

export default ChatLayout
