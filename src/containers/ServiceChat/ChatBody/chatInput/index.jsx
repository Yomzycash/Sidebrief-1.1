import { SubjectInput, TextBody, TextInput, TextInputForm } from "./style";
import { CommonButton } from "components/button";
import { Send } from "asset/svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { messageSchema } from "../constants";
import { SlateEditor } from "components/input";

export const ChatInput = ({ noEditor }) => {
  const { handleSubmit, register, reset } = useForm({
    resolver: yupResolver(messageSchema),
  });

  const sendMessage = (data) => {
    console.log(data);
    reset();
  };

  return (
    <TextInputForm onSubmit={handleSubmit(sendMessage)}>
      {/* <SubjectInput placeholder="Subject" {...register("subject")} /> */}
      <TextBody>
        {/* <TextInput
					placeholder="Send a message"
					{...register("message")}
				/> */}
        {!noEditor && (
          <>
            <SlateEditor placeholder="Send a message..." />
          </>
        )}
        <CommonButton text={"Send"} RightIcon={Send} />
      </TextBody>
    </TextInputForm>
  );
};
