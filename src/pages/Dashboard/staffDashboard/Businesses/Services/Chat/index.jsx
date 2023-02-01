import { Outlet } from "react-router-dom";
import { ServiceChatLayout, Chats } from "containers/ServiceChat";
import SingleChat from "./SingleChat";

const ChatLayout = () => {
	return (
		<ServiceChatLayout>
			<Chats />
			<SingleChat/>
			<Outlet />
		</ServiceChatLayout>
	);
};

export default ChatLayout;
