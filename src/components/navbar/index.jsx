import React, { useEffect, useState } from "react";
import {
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
} from "./styled";
import LogoNav from "./LogoNav";

import logo from "../../asset/images/SidebriefLogo.png";
import bell from "../../asset/images/bell.png";
import user from "../../asset/images/user.png";
import down from "../../asset/images/down.png";
import { Messages } from "utils/config";
import Search from "./Search";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { store } from "redux/Store";
import { setMessageObj } from "redux/Slices";
import { useRef } from "react";
import Profile from "components/Profile";

import { formatDistance } from "date-fns";

import { sortTableData } from "utils/staffHelper";
import { useGetAllNotificationsQuery } from "services/chatService";

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
  //const notificationTime = moment(notificationMessages.createdAt).fromNow(true);
  //console.log(notificationTime)

  // let sortDate = [...data];

  // let sortedDate = sortDate?.sort(sortTableData);
  // console.log("sorted date", sortedDate)

  // const notificationTime = formatDistance(notificationMessages.createdAt, new Date() )
  // console.log("new time", notificationTime)

  // function timeSince(date) {

  //   var seconds = Math.floor((new Date() - date) / 1000);

  //   var interval = seconds / 31536000;

  //   if (interval > 1) {
  //     return Math.floor(interval) + " years";
  //   }
  //   interval = seconds / 2592000;
  //   if (interval > 1) {
  //     return Math.floor(interval) + " months";
  //   }
  //   interval = seconds / 86400;
  //   if (interval > 1) {
  //     return Math.floor(interval) + " days";
  //   }
  //   interval = seconds / 3600;
  //   if (interval > 1) {
  //     return Math.floor(interval) + " hours";
  //   }
  //   interval = seconds / 60;
  //   if (interval > 1) {
  //     return Math.floor(interval) + " minutes";
  //   }
  //   return Math.floor(seconds) + " seconds";
  // }
  // var aDay = 24*60*60*1000;
  // console.log(timeSince(new Date(Date.now()-aDay)));
  // console.log(timeSince(new Date(Date.now()-aDay*2)));

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

  const [boxshadow, setBoxShadow] = useState("false");
  const [showNotification, setShowNotification] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [msgObj, setMsgObj] = useState([]);

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
    console.log("my length", data?.length);
  }, [data]);

  // useMemo(() => {
  //   let status = newUserObject?.verified;
  //   if (status === false) {
  //     setMsgObj((prev) => [
  //       ...prev,
  //       {
  //         messageText: "Kindly check your email for the verification link",

  //         read: false,
  //       },
  //     ]);
  //   }
  // }, []);

  // console.log(msgObj);
  const handleProfile = () => {
    setShowProfile(!showProfile);
  };
  const handleCheck = (e, item) => {
    const indexToUpdate = msgObj.findIndex((msg) => msg.messageText === item);
    const updatedMsg = [...msgObj]; // creates a copy of the array
    updatedMsg[indexToUpdate].read = !item.read;
    setMsgObj(updatedMsg);
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
          {!hideSearch && <Search style={{ height: "32px" }} />}
          <RightIcons>
            <BellContainer
              onClick={() => setShowNotification(!showNotification)}
            >
              <NotificationBadge>
                <p>{msgObj.length}</p>
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

          {notificationMessages?.length > 0 ? (
            <NotificationMessages>
              {notificationMessages &&
                notificationMessages.slice(0, 4).map((item, index) => (
                  <Message key={index}>
                    <MessageSubject>
                      {item.messageSubject}
                      <span>{convertDate(item.createdAt)}</span>

                      {/* <span>
                      {notificationTime}
                    </span> */}
                    </MessageSubject>
                    {/* <br/> */}

                    <MessageBody>{item.messageBody}</MessageBody>
                  </Message>
                ))}
            </NotificationMessages>
          ) : (
            <NoMessage>
              <p>{"The length is" + "" + notificationMessages?.length}</p>
            </NoMessage>
          )}
        </NotificationWrapper>
      )}

      {showProfile && <Profile setShowProfile={setShowProfile} />}
    </>
  );
};

export default Navbar;
export { LogoNav };
