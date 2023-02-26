import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  HeaderActive,
  HeaderToggle,
  NotificationHeader,
  NotificationMessages,
  NotificationWrapper,
} from "./style";
import SingleNotification from "./SingleNotification";
import EmptyBellNotification from "components/texts/EmptyChat/EmptyBellNotification";

const Notification = ({ closeNotifications, data }) => {
  const [notifications, setnotifications] = useState(data);
  const [active, setActive] = useState({
    read: false,
    unread: false,
    all: true,
  });

  const notificationRef = useRef();

  useEffect(() => {
    handleNotifications();
    notificationRef.current.focus();
  }, [data, active]);

  const handleNotifications = () => {
    if (active.all) setnotifications(data);
    else if (active.read)
      setnotifications(data?.filter((el) => el?.messageIsRead === true));
    else if (active.unread)
      setnotifications(data?.filter((el) => el?.messageIsRead === false));
  };

  const handleBlur = () => {
    notificationRef.current.blur();
    closeNotifications();
  };

  const handleActive = (curr) => {
    setActive({ read: curr.read, unread: curr.unread, all: curr.all });
  };

  return (
    <NotificationWrapper ref={notificationRef} onBlur={handleBlur} tabIndex={0}>
      <NotificationHeader>
        <p>Notifications</p>
        <HeaderToggle active={active}>
          <HeaderActive
            active={active.all}
            onClick={() =>
              handleActive({ all: true, read: false, unread: false })
            }
          >
            All
          </HeaderActive>
          <HeaderActive
            active={active.unread}
            onClick={() =>
              handleActive({ unread: true, read: false, all: false })
            }
          >
            Unread
          </HeaderActive>
          <HeaderActive
            onClick={() =>
              handleActive({ read: true, unread: false, all: false })
            }
            active={active.read}
          >
            Read
          </HeaderActive>
        </HeaderToggle>
      </NotificationHeader>
      <NotificationMessages>
        {notifications?.length > 0 ? (
          notifications?.map((item, index) => (
            <SingleNotification
              key={index}
              item={item}
              handleBlur={handleBlur}
            />
          ))
        ) : (
          <EmptyBellNotification active={active} />
        )}
      </NotificationMessages>
    </NotificationWrapper>
  );
};

export default Notification;
