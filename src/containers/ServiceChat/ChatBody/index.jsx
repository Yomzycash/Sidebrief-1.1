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

export const ChatBody = ({ paramsId }) => {
  const serviceId = paramsId.get("serviceId");

  const { data, isLoading } = useGetNotificationsByServiceIdQuery(serviceId);

  const senderId = paramsId.get("senderId");

  const { handleSubmit, register, reset } = useForm({
    resolver: yupResolver(messageSchema),
  });

  const sendMessage = (data) => {
    reset();
  };
  const messages = data?.filter(
    (el) => el?.senderId === senderId || el?.senderID === senderId
  );
  console.log(messages);
  // let ID = useParams().SenderID

  // let messages = getMessages(data)

  // let clickedMessage = messages?.filter((message) => message?.senderID === ID)

  // let messageContent =
  //   clickedMessage?.length > 0 ? clickedMessage[0]?.notification : []
  // console.log(messageContent);

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

  // let modifiedMessage = messageContent?.map((msg) => ({
  //   ...msg,
  //   formatedDate: formatDate(msg?.updatedAt),
  // }))

  return (
    <Container>
      <Messages>
        {messages
          ?.sort((a, b) =>
            compareDesc(new Date(a.formatedDate), new Date(b.formatedDate))
          )
          ?.map((el, index) => (
            <>
              <MessageBubble key={index} {...el} />
            </>
          ))}
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
