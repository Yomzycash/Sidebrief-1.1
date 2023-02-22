import { Container, Messages } from "./style";
import { MessageBubble } from "components/cards";
import { useLocation } from "react-router-dom";
import { ChatInput } from "./chatInput";

export const ChatBody = ({ data }) => {
	const location = useLocation();
	let params = new URLSearchParams(location.search);
	let notificationId = params.get("notificationId");

	const message = data?.filter(
		(el) => el?.notificationId === notificationId
	)[0];
	console.log(message);

	return (
		<Container>
			<Messages>
				{message?.messageSubject && <MessageBubble {...message} />}
			</Messages>
			<ChatInput message={message} />
		</Container>
	);
};
