import { Outlet } from "react-router-dom";
import { ServiceChatLayout, Chats } from "containers/ServiceChat";

const ChatLayout = () => {
	return (
		<ServiceChatLayout>
			<Chats />
			<Outlet />
		</ServiceChatLayout>
	);
};

export default ChatLayout;
