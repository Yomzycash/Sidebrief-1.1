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
import { compareAsc } from "date-fns";
import { checkStaffEmail } from "utils/globalFunctions";

const Notification = ({ closeNotifications, data, refetch }) => {
  const [notifications, setNotifications] = useState(data);
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

  let userInfo = localStorage.getItem("userInfo");
  let userEmail = localStorage.getItem("userEmail");
  let staffEmail = checkStaffEmail(userEmail);

  // Set notifications conditionally
  const handleNotifications = () => {
    if (!data) return;

    let sortedData = [...data]?.sort((a, b) =>
      compareAsc(new Date(b?.createdAt), new Date(a?.createdAt))
    );

    let receivedMessages = sortedData?.filter((el) =>
      staffEmail
        ? el?.senderId !== "Sidebrief"
        : el?.senderId !== userInfo?.username
    );

    if (active.all) setNotifications(receivedMessages);
    else if (active.read)
      setNotifications(
        receivedMessages?.filter((el) => el?.messageIsRead === true)
      );
    else if (active.unread) {
      let newNotifications = receivedMessages?.filter(
        (el) => el?.messageIsRead === false
      );
      setNotifications(newNotifications);
    }
  };

  // This runs onClick outside the notifications container
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
              refetch={refetch}
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
