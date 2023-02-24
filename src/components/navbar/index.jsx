import React, { useEffect, useState } from "react";
import {
  ButtonContainer,
  Button,
  ReplyButton,
  Dropdown,
  DropdownContainer,
  DropdownList,
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
import { useRef } from "react";
import Profile from "components/Profile";
import { checkStaffEmail } from "utils/globalFunctions";
import { formatDistanceToNow, parseJSON } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useGetAllNotificationsQuery } from "services/chatService";
import { setNotification } from "redux/Slices";
import { useDispatch, useSelector } from "react-redux";
import OutsideClickHandler from 'react-outside-click-handler';

const Navbar = ({
  dashboard,
  rewards,
  $displayMobile,
  imgStyles,
  style,
  hideSearch,
  props,
}) => {
  const { data } = useGetAllNotificationsQuery();
  const dispatch = useDispatch();
  const [notificationMessages, setNotificationMessages] = useState([]);

  const DropdownItems = ["All", "New", "Read"] 

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null)
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // const { notification } = useSelector((store) => store.UserDataReducer);
  let userEmail = localStorage.getItem("userEmail");
  let staffEmail = checkStaffEmail(userEmail);

  const clickedOption = value => () => {
    setSelectedOption(value);
    setIsOpen(false);
  }
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

  let navigate = useNavigate();

  // VIEW ALL - dont 
  const handleClick = () => {
    navigate("/staff-dashboard/businesses/services/chats");
    setShowNotification(false);
  }
  const handleProfile = () => {
    setShowProfile(!showProfile);
  };

  const handleFocus = () => {
    setShowNotification(true)
    console.log("focus event triggered");
  }

  const handleBlur = () => {
    setShowNotification(false);
    console.log("Blur event triggered");
  }

  // WORKS: DONT REMOVE

  // const { onClickOutside } = props;
  let menuRef = useRef(null);
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (menuRef.current && !menuRef.current.contains(event.target)) {
  //       onClickOutside && onClickOutside();
  //     }
  //   };
  //   document.addEventListener('click', handleClickOutside, true);
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside, true);
  //   };
  // }, [ onClickOutside ]);

  // if(!props.show)
  //   return null;
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current?.contains(event.target)) {
      // if (!(menuRef.current?.contains(event.target))) {
       //setShowNotification(false);
      }
    };

    if(!showNotification){
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
   
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });


  return (
    // <> 
    //   { staffEmail ? (
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
                  // onClick={() => dispatch(setNotification())}
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
          {staffEmail ? (
            <>
              <OutsideClickHandler onOutsideClick={() => setShowNotification(false)}>
                {showNotification && (
              <NotificationWrapper 
                //show = {showNotification}
                // onBlur={handleBlur}
                // onFocus={handleFocus}
                // tabIndex={-1}
                ref={menuRef}
                
              >
                <NotificationHeader>
                {/* <NotificationHeader ref={menuRef}> */}
                  <h3>Notifications</h3>
                  <p>Mark all as read</p>
                </NotificationHeader>
      
      
              <DropdownMenu>
                <button onClick={toggleDropdown}>
                  {selectedOption || "All"} <CaretDownIcon/> 
                </button>
                {isOpen && (
                  <Dropdown>
                      <DropdownContainer>
                        { DropdownItems.map((item, id) => (
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
                                  parseJSON(notificationMessages.slice(-1)[0].updatedAt),
                                  { addSuffix: true }
                                )}
                              </span>
                            </MessageSubject>
      
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
                    <ViewAllMessages>
                      <p onClick = {handleClick}>
                        View All
                      </p>
                    </ViewAllMessages>
                  </>
                ) : (
                  <NoMessage>
                    <p>No unread messages</p>
                  </NoMessage>
                )}
                
              </NotificationWrapper>
               )}
              </OutsideClickHandler>
              
            
            </>
          ) : (
            <></>)
          }
         

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
