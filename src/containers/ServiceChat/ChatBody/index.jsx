import {
  Container,
  TextInput,
  TextInputForm,
  Messages,
  SubjectInput,
  TextBody,
} from "./style";
import { CommonButton } from "components/button";
import { Send } from "asset/svg";
import { messageSchema } from "./constants";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MessageBubble } from "components/cards";
import { compareDesc, differenceInDays, isToday, isYesterday } from "date-fns";
import { useGetNotificationsByServiceIdQuery } from "services/chatService";
import { useLocation } from "react-router-dom";

export const ChatBody = ({ data }) => {
  const location = useLocation();
  let params = new URLSearchParams(location.search);
  let notificationId = params.get("notificationId");

  const { handleSubmit, register, reset } = useForm({
    resolver: yupResolver(messageSchema),
  });

  const sendMessage = (data) => {
    reset();
  };
  const message = data?.filter(
    (el) => el?.notificationId === notificationId
  )[0];

  // console.log(messages);
  // let ID = useParams().SenderID

  // let messages = getMessages(data)

  // let clickedMessage = messages?.filter((message) => message?.senderID === ID)

  // let messageContent =
  //   clickedMessage?.length > 0 ? clickedMessage[0]?.notification : []
  // console.log(messageContent);

  // let modifiedMessage = messageContent?.map((msg) => ({
  //   ...msg,
  //   formatedDate: formatDate(msg?.updatedAt),
  // }))

  return (
    <Container>
      <Messages>
        <MessageBubble {...message} />
      </Messages>
      <TextInputForm onSubmit={handleSubmit(sendMessage)}>
        <SubjectInput placeholder="Subject" />
        <TextBody>
          <TextInput placeholder="Send a message" {...register("message")} />
          <CommonButton text={"Send"} RightIcon={Send} />
        </TextBody>
      </TextInputForm>
    </Container>
  );
};
