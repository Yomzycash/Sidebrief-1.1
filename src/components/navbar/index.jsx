import React, { useEffect, useState } from "react";
import {
  Image,
  BellIcon,
  UserIcon,
  DownIcon,
  SearchIcon,
  NavWrapper,
  SearchBar,
  RightIcons,
  BellContainer,
  UserContainer,
  SearchBarWrapper,
  SearchIconWrapper,
  NotificationWrapper,
  NotificationHeader,
  NotificationMessages,
  Message,
  NoMessage,
} from "./styled";
import LogoNav from "./LogoNav";

import logo from "../../asset/images/SidebriefLogo.png";
import bell from "../../asset/images/bell.png";
import user from "../../asset/images/user.png";
import down from "../../asset/images/down.png";
import search from "../../asset/images/search.png";
import { Messages } from "utils/config";

const Navbar = ({ dashboard }) => {
  const [boxshadow, setBoxShadow] = useState("false");
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState(true);

  useEffect(() => {
    if (!dashboard) {
      window.addEventListener("scroll", () => {
        setBoxShadow(window.pageYOffset > 0 ? "true" : "false");
      });
    }
  }, []);

  return (
    <>
      {dashboard ? (
        <NavWrapper
          boxshadow={boxshadow}
          border="1px solid #EDF1F7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image src={logo} alt="logo" />
          <SearchBarWrapper>
            <SearchIconWrapper>
              <SearchIcon src={search} alt="logo" />
            </SearchIconWrapper>
            <SearchBar placeholder="Search something..." />
          </SearchBarWrapper>
          <RightIcons>
            <BellContainer
              onClick={() => setShowNotification(!showNotification)}
            >
              <BellIcon src={bell} alt="logo" />
            </BellContainer>
            <UserContainer>
              <UserIcon src={user} alt="logo" />
            </UserContainer>

            <DownIcon src={down} alt="logo" />
          </RightIcons>
        </NavWrapper>
      ) : (
        <NavWrapper boxshadow={boxshadow}>
          <Image src={logo} alt="logo" />
        </NavWrapper>
      )}

      {showNotification && (
        <NotificationWrapper>
          <NotificationHeader>
            <h3>Notifications</h3>
            <p>Mark all as read</p>
          </NotificationHeader>

          {message ? (
            <NotificationMessages>
              {Messages.map((item, index) => (
                <Message>
                  <h6>
                    {item.message}
                    <span>{item.span}</span>
                  </h6>
                  <p>{item.time}</p>
                </Message>
              ))}
            </NotificationMessages>
          ) : (
            <NoMessage>
              <p>
                You do not have any notifications at the moment. Kindly check
                back later
              </p>
            </NoMessage>
          )}
        </NotificationWrapper>
      )}
    </>
  );
};

export default Navbar;
export { LogoNav };
