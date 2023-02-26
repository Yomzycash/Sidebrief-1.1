import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useGetAllNotificationsQuery } from "services/chatService";
import {
  Button,
  ButtonContainer,
  CaretDownIcon,
  Dropdown,
  DropdownContainer,
  DropdownList,
  DropdownMenu,
  Message,
  MessageBody,
  MessageSubject,
  NoMessage,
  NotificationHeader,
  NotificationMessages,
  NotificationWrapper,
  ReplyButton,
  ViewAllMessages,
} from "./style";
import { formatDistanceToNow, parseJSON } from "date-fns";
import SingleNotification from "./SingleNotification";
import { checkStaffEmail } from "utils/globalFunctions";
import { useNavigate } from "react-router-dom";
import EmptyBellNotification from "components/texts/EmptyChat/EmptyBellNotification";

const Notification = ({ closeNotifications, data }) => {
  const notificationRef = useRef();

  useEffect(() => {
    notificationRef.current.focus();
  }, [data]);

  const handleBlur = () => {
    notificationRef.current.blur();
    closeNotifications();
  };

  return (
    <NotificationWrapper ref={notificationRef} onBlur={handleBlur} tabIndex={0}>
      {/* <NotificationHeader>
          <h3>Notifications</h3>
          <p>Mark all as read</p>
        </NotificationHeader> */}

      {/* <Dropdown>
                <select>
                  <option value="Sort">Sort</option>
                  <option value="All">All</option>
                </select>
              </Dropdown> */}

      {/* <DropdownMenu>
          <button onClick={toggleDropdown}>
            {selectedOption || "All"} <CaretDownIcon />
          </button>
          {isOpen && (
            <Dropdown>
              <DropdownContainer>
                {DropdownItems.map((item, id) => (
                  <DropdownList onClick={clickedOption(item)} key={id}>
                    {item}
                  </DropdownList>
                ))}
              </DropdownContainer>
            </Dropdown>
          )}
        </DropdownMenu> */}

      <NotificationMessages>
        {data?.length > 0 ? (
          data?.map((item, index) => (
            <SingleNotification
              key={index}
              item={item}
              handleBlur={handleBlur}
            />
          ))
        ) : (
          <EmptyBellNotification />
        )}
      </NotificationMessages>
    </NotificationWrapper>
  );
};

export default Notification;

//  <ViewAllMessages>
//    <p>View All</p>
//  </ViewAllMessages>;

//  <Message key={index}>
//                     <MessageSubject>
//                       {item.messageSubject}

//                       <span>
//                         {formatDistanceToNow(
//                           parseJSON(data?.slice(-1)[0].createdAt),
//                           { addSuffix: true }
//                         )}
//                       </span>
//                     </MessageSubject>

//                     <MessageBody>{item.messageBody}</MessageBody>

//                     <ButtonContainer>
//                       {/* <Button>Mark as Read</Button> */}
//                       <ReplyButton onClick={handleBlur}>Reply</ReplyButton>
//                     </ButtonContainer>
//                   </Message>
