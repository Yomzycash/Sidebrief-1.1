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
import {
  useAddNotificationMutation,
  useGetNotificationsByServiceIdQuery,
} from "services/chatService";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

export const ChatBody = ({ data }) => {
  const [addNotification] = useAddNotificationMutation();

  const [value, setValue] = useState();

  const location = useLocation();
  let params = new URLSearchParams(location.search);
  let notificationId = params.get("notificationId");
  let serviceId = params.get("serviceId");
  const username = JSON.parse(localStorage.getItem("userInfo"));

  const { handleSubmit, register, reset } = useForm({
    resolver: yupResolver(messageSchema),
  });

  const sendMessage = (data) => {
    reset();
  };

  const handleGetRequiredChat = (formData) => {
    return {
      serviceId: serviceId,
      senderId: username?.username,
      messageSubject: formData.subject,
      messageBody: formData.body,
      messageIsRead: false,
      messageFiles: [
        {
          fileUrl: "www.link.com",
          fileName: "passportlocal",
          fileType: "pdf",
        },
      ],
    };
  };
  const SubmitForm = async (formData) => {
    const response = await addNotification(handleGetRequiredChat(formData));
    console.log(response);
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
      <TextInputForm onSubmit={handleSubmit(SubmitForm)}>
        <SubjectInput
          placeholder="Subject"
          name={"subject"}
          {...register("subject")}
          //onChange={handleSubjectChange}
          //value={subjectText}
        />
        <TextBody>
          <TextInput
            placeholder="Send a message"
            name={"body"}
            {...register("body")}
            //onChange={handleBodyChange}
            //value={bodyText}
          />
          <CommonButton text={"Send"} RightIcon={Send} type={"submit"} />
        </TextBody>
      </TextInputForm>
    </Container>
  );
};
