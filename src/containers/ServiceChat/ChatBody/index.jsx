import { Container, TextInput, TextInputForm, Messages } from "./style";
import { CommonButton } from "components/button";
import { Send } from "asset/svg";

export const ChatBody = () => {
	return (
		<Container>
			<Messages></Messages>
			<TextInputForm>
				<TextInput placeholder="Send a message" />
				<CommonButton text={"Send"} RightIcon={Send} />
			</TextInputForm>
		</Container>
	);
};
