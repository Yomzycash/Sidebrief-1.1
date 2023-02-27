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

const Notification = ({ handleNotificationToggle }) => {
  const { data } = useGetAllNotificationsQuery();
  let notificationRef = useRef();
  const [notificationMessages, setNotificationMessages] = useState([]);

  const DropdownItems = ["All", "New", "Read"];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    setNotificationMessages(data);
  }, [data]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const clickedOption = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const onClickOutside = (e) => {
      if (!notificationRef.current.contains(e.target)) {
        e.preventDefault();
        e.stopPropagation();
        handleNotificationToggle();
      }
    };
    document.addEventListener("mousedown", onClickOutside);

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  });

  return (
    <>
      <NotificationWrapper ref={notificationRef}>
        <NotificationHeader>
          <h3>Notifications</h3>
          <p>Mark all as read</p>
        </NotificationHeader>

        {/* <Dropdown>
                <select>
                  <option value="Sort">Sort</option>
                  <option value="All">All</option>
                </select>
              </Dropdown> */}

        <DropdownMenu>
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
        </DropdownMenu>

        {notificationMessages?.length > 0 ? (
          <>
            <NotificationMessages>
              {notificationMessages &&
                notificationMessages.map((item, index) => (
                  <Message key={index}>
                    <MessageSubject>
                      {item.messageSubject}

                      <span>
                        {formatDistanceToNow(
                          parseJSON(
                            notificationMessages.slice(-1)[0].createdAt
                          ),
                          { addSuffix: true }
                        )}
                      </span>
                    </MessageSubject>

                    <MessageBody>{item.messageBody}</MessageBody>

                    <ButtonContainer>
                      <Button>Mark as Read</Button>
                      <ReplyButton>Reply</ReplyButton>
                    </ButtonContainer>
                  </Message>
                ))}
            </NotificationMessages>
            <ViewAllMessages>
              <p>View All</p>
            </ViewAllMessages>
          </>
        ) : (
          <NoMessage>
            <p>No unread messages</p>
          </NoMessage>
        )}
      </NotificationWrapper>
    </>
  );
};

export default Notification;
