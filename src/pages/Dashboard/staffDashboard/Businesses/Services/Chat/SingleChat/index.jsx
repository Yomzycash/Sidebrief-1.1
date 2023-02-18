import { Container } from "./style";
import { ChatHead, ChatBody } from "containers/ServiceChat";

const SingleChat = ({ isUser, data }) => {
  return (
    <Container>
      <ChatHead isUser={isUser} />
      <ChatBody isUser={isUser} data={data} />
    </Container>
  );
};

export default SingleChat;
