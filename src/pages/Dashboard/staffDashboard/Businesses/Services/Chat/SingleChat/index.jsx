import { Container } from "./style";
import { ChatHead, ChatBody } from "containers/ServiceChat";

const SingleChat = () => {
	return (
		<Container>
			<ChatHead />
			<ChatBody />
		</Container>
	);
};

export default SingleChat;
