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
  NotificationBadge,
} from "./styled";
import LogoNav from "./LogoNav";
import logo from "../../asset/images/SidebriefLogo.png";
import bell from "../../asset/images/bell.png";
import user from "../../asset/images/user.png";
import down from "../../asset/images/down.png";
import Search from "./Search";
import { Link } from "react-router-dom";
import Profile from "components/Profile";
import { checkStaffEmail } from "utils/globalFunctions";
import { useGetAllNotificationsQuery } from "services/chatService";
import Notification from "components/notification";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { useRef } from "react";

const Navbar = ({
  dashboard,
  rewards,
  displayMobile,
  imgStyles,
  style,
  hideSearch,
}) => {
  const { data } = useGetAllNotificationsQuery();

  let userEmail = localStorage.getItem("userEmail");
  let staffEmail = checkStaffEmail(userEmail);

  // const [boxshadow, setBoxShadow] = useState("false");
  const [showNotification, setShowNotification] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // useEffect(() => {
  //   if (!dashboard && !rewards) {
  //     window.addEventListener("scroll", () => {
  //       setBoxShadow(window.pageYOffset > 0 ? "true" : "false");
  //     });
  //   }
  // }, []);

  const closeProfile = () => {
    setShowProfile(false);
  };

  const closeNotifications = () => {
    setShowNotification(false);
  };
  // console.log(showNotification);
  const handleShowNotification = () => {
    if (showNotification) return;
    setShowNotification(true);
  };

  let newNotifications = data?.filter((el) => el?.messageIsRead === false);
  console.log(newNotifications);

  return (
    <>
      {dashboard || rewards ? (
        <NavWrapper
          // boxshadow={boxshadow}
          border="1px solid #EDF1F7"
          key="Navbar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          $displayMobile={displayMobile}
          style={{ ...style }}
        >
          <Link to="/" style={imgStyle}>
            <Image src={logo} alt="logo" style={{ ...imgStyles }} />
          </Link>
          {hideSearch && <Search style={{ height: "32px" }} />}
          <RightIcons>
            {/* {staffEmail && ( */}
            <BellContainer onClick={handleShowNotification}>
              {newNotifications?.length > 0 && (
                <NotificationBadge>{newNotifications}</NotificationBadge>
              )}
              <BellIcon src={bell} alt="logo" />
            </BellContainer>
            {/* )} */}

            <UserContainer onClick={() => setShowProfile(!showProfile)}>
              <UserIcon src={user} alt="logo" />
            </UserContainer>

            {showProfile ? (
              <HiChevronUp size={24} color="#242627" />
            ) : (
              <HiChevronDown size={24} color="#242627" />
            )}
          </RightIcons>
        </NavWrapper>
      ) : (
        <NavWrapper
          // boxshadow={boxshadow}
          key="NavbarImg"
          $displayMobile={displayMobile}
          style={{ ...style }}
        >
          <Image src={logo} alt="logo" style={{ ...imgStyles }} />
        </NavWrapper>
      )}
      {showNotification && (
        <Notification closeNotifications={closeNotifications} data={data} />
      )}

      {showProfile && (
        <Profile closeProfile={closeProfile} showProfile={showProfile} />
      )}
    </>
  );
};

export default Navbar;
export { LogoNav };

let imgStyle = { width: "13%", textDecoration: "none" };
