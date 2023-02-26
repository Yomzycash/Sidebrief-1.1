import { Container, Messages } from "./style";
import { MessageBubble } from "components/cards";
import { useLocation } from "react-router-dom";
import { ChatInput } from "./chatInput";
import { getSelectedThread } from "../Chats/actions";
import EmptyChatRight from "components/texts/EmptyChat/EmptyChatRight";
import { useUpdateNotificationMutation } from "services/chatService";
import { useEffect } from "react";
import { checkStaffEmail } from "utils/globalFunctions";

export const ChatBody = ({ data, threadsRefetch }) => {
  const [updateNotification, updateState] = useUpdateNotificationMutation();

  const location = useLocation();
  let params = new URLSearchParams(location.search);
  let subject = params.get("subject");

  const selectedThread = getSelectedThread(data, subject);

  useEffect(() => {
    handleRead();
  }, []);

  const handleRead = () => {
    let userEmail = localStorage.getItem("userEmail");
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let staffEmail = checkStaffEmail(userEmail);

    let receivedMessages = data?.filter((el) =>
      staffEmail
        ? el?.senderId !== "Sidebrief"
        : el?.senderId !== userInfo?.username
    );

    let unread = receivedMessages?.filter((el) => el?.messageIsRead === false);
    console.log(unread);
    // unread?.forEach((el) => updateReadField(el));
  };

  const updateReadField = async (notification) => {
    let requiredData = {
      notificationId: notification?.notificationId,
      senderId: notification?.senderId,
      serviceId: notification?.serviceId,
      messageSubject: notification?.messageSubject,
      messageBody: notification?.messageBody,
      messageIsRead: true,
      messageFiles: notification?.messageFiles,
    };
    const response = await updateNotification(requiredData);
    if (response?.data) threadsRefetch();

    console.log(response);
  };

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
