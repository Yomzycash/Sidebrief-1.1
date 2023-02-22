import { Container } from "./style";
import { ChatHead, ChatBody } from "containers/ServiceChat";

const SingleChat = ({ isUser, data }) => {
  return (
    <Container>
      <ChatHead data={data} />
      <ChatBody data={data} />
    </Container>
  );
};

export default SingleChat;
