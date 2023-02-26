import { Container, Messages } from "./style";
import { MessageBubble } from "components/cards";
import { useLocation } from "react-router-dom";
import { ChatInput } from "./chatInput";
import { getSelectedThread } from "../Chats/actions";
import EmptyChatRight from "components/texts/EmptyChat/EmptyChatRight";

export const ChatBody = ({ data, threadsRefetch }) => {
  const location = useLocation();
  let params = new URLSearchParams(location.search);
  let subject = params.get("subject");

  const selectedThread = getSelectedThread(data, subject);

  return (
    <Container>
      <Messages>
        {selectedThread?.messages?.length > 0 ? (
          <>
            {subject &&
              selectedThread?.messages?.map((msg) => (
                <MessageBubble {...msg} threadsRefetch={threadsRefetch} />
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
  );
};
