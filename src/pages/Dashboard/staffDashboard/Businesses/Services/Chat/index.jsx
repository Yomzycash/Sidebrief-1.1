import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import { ServiceChatLayout, Chats } from "containers/ServiceChat";
import SingleChat from "./SingleChat";
import { useGetNotificationsByServiceIdQuery } from "services/chatService";
import { useState } from "react";
import { useEffect } from "react";
import { compareAsc } from "date-fns";
import { useSelector } from "react-redux";

const ChatLayout = () => {
  const location = useLocation();
  let params = new URLSearchParams(location.search);
  let serviceId = params.get("serviceId");

  const { data, refetch } = useGetNotificationsByServiceIdQuery(serviceId);

  const { refreshNotifications } = useSelector(
    (store) => store.UserDataReducer
  );

  useEffect(() => {
    refetch();
  }, [refreshNotifications]);

  let notifications = data
    ? [...data]?.sort((a, b) =>
        compareAsc(new Date(b?.createdAt), new Date(a?.createdAt))
      )
    : [];

  return (
    <ServiceChatLayout>
      <Chats data={notifications} threadsRefetch={refetch} />
      <SingleChat data={notifications} threadsRefetch={refetch} />
    </ServiceChatLayout>
  );
};

export default ChatLayout;
//  ?.sort((a, b) =>
//                 compareAsc(new Date(b?.createdAt), new Date(a?.createdAt))
//               )
