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
import { useState } from "react";
import { useRef } from "react";

export const ChatBody = ({ data }) => {
  const [value, setValue] = useState();

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

  return (
    <Container>
      <Messages>
        <MessageBubble {...message} />
      </Messages>
      <TextInputForm onSubmit={handleSubmit(sendMessage)}>
        <SubjectInput placeholder="Subject" />
        <TextBody>
          <TextInput
            placeholder="Send a message"
            {...register("message")}
            value={value}
          />
          <CommonButton text={"Send"} RightIcon={Send} />
        </TextBody>
      </TextInputForm>
    </Container>
  );
};
