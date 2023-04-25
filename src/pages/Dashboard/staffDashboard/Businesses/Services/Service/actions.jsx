import { getUsersMessages } from "containers/ServiceChat/Chats/actions";
import { ReactComponent as ChatIcon } from "asset/Icons/ChatIcon.svg";
import { Status } from "./styled";

export const useActions = ({ notifications, navigate }) => {
  // All users messages
  const usersMessages = getUsersMessages(notifications.data);

  // Table body information
  const dataBody = usersMessages?.map((notifications) => [
    notifications?.senderId,
    notifications?.servicesMessages[0]?.serviceNotifications[0]?.notificationId,
    <Status $read={notifications?.servicesMessages[0]?.serviceNotifications[0]?.messageIsRead}>
      {notifications?.servicesMessages[0]?.serviceNotifications[0]?.messageIsRead === true
        ? "Read"
        : "New"}
    </Status>,
    <div>
      {notifications?.servicesMessages[0]?.serviceNotifications[0]?.updatedAt?.split("T")[0]}
    </div>,
    <div>
      {notifications?.servicesMessages[0]?.serviceNotifications[0]?.updatedAt
        ?.split("T")[1]
        ?.slice(0, 8)}
    </div>,
    <div
      onClick={(e) =>
        handleChat(notifications?.servicesMessages[0]?.serviceNotifications[0]?.serviceId)
      }
      style={{ cursor: "pointer" }}
    >
      <ChatIcon size={20} />
      <span style={{ color: "#00A2D4" }}>Resolve</span>
    </div>,
  ]);

  const handleChat = (serviceId) => {
    // console.log(serviceId);
    navigate(`/staff-dashboard/businesses/services/chats?serviceId=${serviceId}`);
  };

  return {
    dataBody,
  };
};
