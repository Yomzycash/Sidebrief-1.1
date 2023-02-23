import { Container } from "./style";
import { ChatHead, ChatBody } from "containers/ServiceChat";

const SingleChat = ({ isUser, data, threadsRefetch }) => {
  return (
    <Container>
      <ChatHead data={data} />
      <ChatBody data={data} threadsRefetch={threadsRefetch} />
    </Container>
  );
};

export default SingleChat;
