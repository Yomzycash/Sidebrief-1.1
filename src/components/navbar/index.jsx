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
} from "./styled";
import LogoNav from "./LogoNav";

import logo from "../../asset/images/SidebriefLogo.png";
import bell from "../../asset/images/bell.png";
import user from "../../asset/images/user.png";
import down from "../../asset/images/down.png";
import { Messages } from "utils/config";
import Search from "./Search";
import { Link } from "react-router-dom";

const Navbar = ({ dashboard, rewards }) => {
  const [boxshadow, setBoxShadow] = useState("false");
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState(true);

  useEffect(() => {
    if (!dashboard && !rewards) {
      window.addEventListener("scroll", () => {
        setBoxShadow(window.pageYOffset > 0 ? "true" : "false");
      });
    }
  }, []);

  let imgStyle = { width: "13%", textDecoration: "none" };

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
        >
          <Link to="/" style={imgStyle}>
            <Image src={logo} alt="logo" />
          </Link>
          {dashboard && <Search />}
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
        <NavWrapper boxshadow={boxshadow} key="NavbarImg">
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
