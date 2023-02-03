import { Container, TextInput, TextInputForm, Messages } from "./style";
import { CommonButton } from "components/button";
import { Send } from "asset/svg";
import { messageSchema, mockMessages } from "./constants";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MessageBubble } from "components/cards";
import { compareDesc, differenceInDays, isToday, isYesterday } from "date-fns";
import {
  useGetAllNotificationsByIdQuery,
  useGetAllNotificationsQuery,
} from "services/chatService";
import { getMessages } from "../Chats/actions";
import { useParams } from "react-router-dom";

export const ChatBody = () => {
  const { data, isError, isLoading } = useGetAllNotificationsQuery();

  const { handleSubmit, register, reset } = useForm({
    resolver: yupResolver(messageSchema),
  });

  const sendMessage = (data) => {
    console.log(data.message);
    reset();
  };

  let ID = useParams().SenderID;

  let messages = getMessages(data);

  let clickedMessage = messages?.filter((message) => message?.senderID === ID);

  let messageContent =
    clickedMessage?.length > 0 ? clickedMessage[0]?.notification : [];
  console.log(messageContent);

  const formatDate = (updatedAt) => {
    let date = updatedAt.split("T").join("-");
    let accDate = date.slice(0, 19).replace(/-0/g, "-");
    if (isToday(new Date(accDate))) {
      return "Today";
    } else if (isYesterday(new Date(accDate))) {
      return "Yesterday";
    } else {
      let date = new Date(accDate);
      return date.toLocaleString("default", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }
  };
  // console.log(new Date("2023-1-23-20:52:28"));

  let modifiedMessage = messageContent?.map((msg) => ({
    ...msg,
    formatedDate: formatDate(msg?.updatedAt),
  }));
  // console.log(modifiedMessage);
  return (
    <Container>
      <Messages>
        {modifiedMessage
          ?.sort((a, b) =>
            compareDesc(new Date(a.formatedDate), new Date(b.formatedDate))
          )
          ?.map((el, index) => (
            <>
              <MessageBubble key={index} {...el} />
              {/* {console.log(el.formatedDate)} */}
            </>
          ))}
      </Messages>
      <TextInputForm onSubmit={handleSubmit(sendMessage)}>
        <TextInput placeholder="Send a message" {...register("message")} />
        <CommonButton text={"Send"} RightIcon={Send} />
      </TextInputForm>
    </Container>
  );
};
