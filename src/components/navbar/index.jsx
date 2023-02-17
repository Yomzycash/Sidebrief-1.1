import React, { useEffect, useState } from "react";
import {
  ButtonContainer,
  Button,
  ReplyButton,
  Dropdown,
  DropdownContent,
  DropdownMenu,
  Image,
  BellIcon,
  UserIcon,
  DownIcon,
  NavWrapper,
  RightIcons,
  BellContainer,
  UserContainer,
  NotificationWrapper,
  NotificationHeader,
  NotificationMessages,
  Message,
  NoMessage,
  NotificationBadge,
  MessageSubject,
  MessageBody,
  ViewAllMessages,
} from "./styled";
import LogoNav from "./LogoNav";
import styled from "styled-components";
import logo from "../../asset/images/SidebriefLogo.png";
import bell from "../../asset/images/bell.png";
import user from "../../asset/images/user.png";
import down from "../../asset/images/down.png";
import { ReactComponent as ArrowDownIcon } from "../../asset/Icons/ArrowDownIcon.svg";
import { Messages } from "utils/config";
import Search from "./Search";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { store } from "redux/Store";
import { setMessageObj } from "redux/Slices";
import { useRef } from "react";
import Profile from "components/Profile";

import { formatDistanceToNow, parseJSON } from "date-fns";

import { useGetAllNotificationsQuery } from "services/chatService";
import { DropDown } from "components/input";

const Navbar = ({
  dashboard,
  rewards,
  $displayMobile,
  imgStyles,
  style,
  hideSearch,
}) => {
  const { data } = useGetAllNotificationsQuery();

  const [notificationMessages, setNotificationMessages] = useState([]);

  function convertDate() {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const merg = new Date().toLocaleDateString("en-US", options);
    const times = new Date()
      .toLocaleTimeString("en-gb", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .toUpperCase();

    return merg + " " + times;
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const [boxshadow, setBoxShadow] = useState("false");
  const [showNotification, setShowNotification] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    if (!dashboard && !rewards) {
      window.addEventListener("scroll", () => {
        setBoxShadow(window.pageYOffset > 0 ? "true" : "false");
      });
    }
  }, []);

  let imgStyle = { width: "13%", textDecoration: "none" };
  let localUserInfo = localStorage.getItem("userInfo");
  let newUserObject = JSON.parse(localUserInfo);

  useEffect(() => {
    setNotificationMessages(data);
  }, [data]);
  
  const handleProfile = () => {
    setShowProfile(!showProfile);
  };

  let menuRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setShowNotification(false);
        // setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <>
      {dashboard || rewards ? (
        <NavWrapper
          boxshadow={boxshadow}
          border="1px solid #EDF1F7"
          key="Navbar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          $displayMobile={$displayMobile}
          style={{ ...style }}
        >
          <Link to="/" style={imgStyle}>
            <Image src={logo} alt="logo" style={{ ...imgStyles }} />
          </Link>
          {hideSearch && <Search style={{ height: "32px" }} />}
          <RightIcons>
            <BellContainer
              onClick={() => setShowNotification(!showNotification)}
            >
              <NotificationBadge>
                <p>{notificationMessages?.length}</p>
              </NotificationBadge>
              <BellIcon src={bell} alt="logo" />
            </BellContainer>
            <UserContainer onClick={handleProfile}>
              <UserIcon src={user} alt="logo" />
            </UserContainer>

            <DownIcon src={down} alt="logo" />
          </RightIcons>
        </NavWrapper>
      ) : (
        <NavWrapper
          boxshadow={boxshadow}
          key="NavbarImg"
          $displayMobile={$displayMobile}
          style={{ ...style }}
        >
          <Image src={logo} alt="logo" style={{ ...imgStyles }} />
        </NavWrapper>
      )}

      {showNotification && (
        <NotificationWrapper>
          <NotificationHeader ref={menuRef}>
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
            All Notifications <CaretDownIcon/>
          </button>
          {isOpen && (
            <Dropdown>
              <DropdownContent>Unread</DropdownContent>
              <DropdownContent>Read</DropdownContent>
              <DropdownContent>New</DropdownContent>
            </Dropdown>
          )}
        </DropdownMenu>

          {notificationMessages?.length > 0 ? (
            <NotificationMessages>
              {notificationMessages &&
                notificationMessages.map((item, index) => (
                  <Message key={index}>
                    <MessageSubject>
                      
                      {item.messageSubject}

                      <span>
                        {formatDistanceToNow(
                  parseJSON(notificationMessages.slice(-1)[0].createdAt),
                  { addSuffix: true }
                )}
                      </span>

                      {/* <span>
                      {notificationTime}
                    </span> */}
                    </MessageSubject>
                    {/* <br/> */}

                    <MessageBody>{item.messageBody}</MessageBody>

                    <ButtonContainer>
                      <Button>
                        Mark as Read
                      </Button>
                      <ReplyButton>
                        Reply
                      </ReplyButton>
                    </ButtonContainer>
                   
                  </Message>
                ))}
            </NotificationMessages>
          ) : (
            <NoMessage>
              <p>{"The length is" + "" + notificationMessages?.length}</p>
            </NoMessage>
          )}
          <ViewAllMessages>
            <p>View All</p>
          </ViewAllMessages>
        </NotificationWrapper>
      )}

      {showProfile && <Profile setShowProfile={setShowProfile} />}
    </>
  );
};

export default Navbar;
export { LogoNav };

const CaretDownIcon = styled(ArrowDownIcon)`
  width: 1em;
  height: 1em;
  margin-left: 0.5em;
  float:right;
`;
