import React, { useEffect, useState } from "react";
import {
  Image,
  BellIcon,
  UserIcon,
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
import Search from "./Search";
import { Link } from "react-router-dom";
import Profile from "components/Profile";
import {
  checkStaffEmail,
  // getReceivedNotifications,
} from "utils/globalFunctions";
import {
  useGetAllNotificationsQuery,
  useViewNotificationsByUserIdQuery,
} from "services/chatService";
import Notification from "components/notification";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { useSelector } from "react-redux";
import { getUnReadNotifications } from "./actions";

const Navbar = ({ dashboard, rewards, displayMobile, imgStyles, style, hideSearch }) => {
  // const [boxshadow, setBoxShadow] = useState("false");
  const [showNotification, setShowNotification] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let userEmail = localStorage.getItem("userEmail");
  let staffEmail = checkStaffEmail(userEmail);

  const { data, refetch, error } = useGetAllNotificationsQuery(staffEmail, { skip: !staffEmail });

  const userNotifications = useViewNotificationsByUserIdQuery(
    {
      userId: userInfo?.id,
    },
    { skip: staffEmail }
  );
  const { refreshNotifications } = useSelector((store) => store.UserDataReducer);

  // console.log(data, userNotifications.data);
  // console.log("User Error" + userNotifications.error);
  // console.log("Staff Error" + error);
  //  console.log(allNotification);

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

  useEffect(() => {
    refetch();
  }, [refreshNotifications]);

  // let newNotifications = useMemo(() => {
  //   return getUnReadNotifications(data);
  // }, [refreshNotifications]);
  let newNotifications = getUnReadNotifications(staffEmail ? data : userNotifications?.data);
  // console.log(getUnReadNotifications(data));

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
                <NotificationBadge>{newNotifications?.length}</NotificationBadge>
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
        <Notification
          closeNotifications={closeNotifications}
          data={staffEmail ? data : userNotifications?.data}
          refetch={staffEmail ? refetch : userNotifications?.refetch}
        />
      )}

      {showProfile && <Profile closeProfile={closeProfile} showProfile={showProfile} />}
    </>
  );
};

export default Navbar;
export { LogoNav };

let imgStyle = { width: "13%", textDecoration: "none" };
