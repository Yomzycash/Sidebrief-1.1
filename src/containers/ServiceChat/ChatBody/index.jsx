import { Container, TextInput, TextInputForm, Messages } from "./style";
import { CommonButton } from "components/button";
import { Send } from "asset/svg";
import { messageSchema, mockMessages } from "./constants";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MessageBubble } from "components/cards";
import { compareDesc } from "date-fns";

export const ChatBody = () => {
	const { handleSubmit, register, reset } = useForm({
		resolver: yupResolver(messageSchema),
	});

	const sendMessage = (data) => {
		console.log(data.message);
		reset();
	};

	return (
		<Container>
			<Messages>
				{mockMessages
					.sort((a, b) => compareDesc(a.date, b.date))
					.map((el, index) => (
						<MessageBubble key={index} {...el} />
					))}
			</Messages>
			<TextInputForm onSubmit={handleSubmit(sendMessage)}>
				<TextInput
					placeholder="Send a message"
					{...register("message")}
				/>
				<CommonButton text={"Send"} RightIcon={Send} />
			</TextInputForm>
		</Container>
	);
};
