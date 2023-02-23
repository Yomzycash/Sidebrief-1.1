import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import { ServiceChatLayout, Chats } from "containers/ServiceChat";
import SingleChat from "./SingleChat";
import { useGetNotificationsByServiceIdQuery } from "services/chatService";
import { useState } from "react";
import { useEffect } from "react";

const ChatLayout = () => {
  const [notifications, setNotifications] = useState([]);

  const location = useLocation();
  let params = new URLSearchParams(location.search);
  let serviceId = params.get("serviceId");

  const { data, refetch } = useGetNotificationsByServiceIdQuery(serviceId);

  useEffect(() => {
    setNotifications(data ? data : []);
  }, [data]);

  return (
    <ServiceChatLayout>
      <Chats data={notifications} />
      <SingleChat data={notifications} threadsRefetch={refetch} />
    </ServiceChatLayout>
  );
};

export default ChatLayout;
