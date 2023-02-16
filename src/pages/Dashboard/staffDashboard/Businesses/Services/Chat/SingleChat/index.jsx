import { Container } from "./style";
import { ChatHead, ChatBody } from "containers/ServiceChat";

const SingleChat = ({ isUser }) => {
	return (
		<Container>
			<ChatHead isUser={isUser} />
			<ChatBody isUser={isUser} />
		</Container>
	);
};

export default SingleChat;
