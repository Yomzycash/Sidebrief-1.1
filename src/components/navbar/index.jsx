import React, { useEffect, useState } from 'react'
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
} from './styled'
import LogoNav from './LogoNav'

import logo from '../../asset/images/SidebriefLogo.png'
import bell from '../../asset/images/bell.png'
import user from '../../asset/images/user.png'
import down from '../../asset/images/down.png'
import { Messages } from 'utils/config'
import Search from './Search'
import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { store } from 'redux/Store'
import { setMessageObj } from 'redux/Slices'
import { useRef } from 'react'

const Navbar = ({ dashboard, rewards }) => {
  const [boxshadow, setBoxShadow] = useState('false')
  const [showNotification, setShowNotification] = useState(false)
  const [msgObj, setMsgObj] = useState([])

  useEffect(() => {
    if (!dashboard && !rewards) {
      window.addEventListener('scroll', () => {
        setBoxShadow(window.pageYOffset > 0 ? 'true' : 'false')
      })
    }
  }, [])

  let imgStyle = { width: '13%', textDecoration: 'none' }
  let localUserInfo = localStorage.getItem('userInfo')
  let newUserObject = JSON.parse(localUserInfo)

  useMemo(() => {
    let status = newUserObject?.verified
    if (status === false) {
      setMsgObj((prev) => [
        ...prev,
        {
          messageText: 'Kindly check your email for the verification link',

          read: false,
        },
      ])
    }
  }, [])

  console.log(msgObj)

  const handleCheck = (e, item) => {
    const indexToUpdate = msgObj.findIndex((msg) => msg.messageText === item)
    const updatedMsg = [...msgObj] // creates a copy of the array
    updatedMsg[indexToUpdate].read = !item.read
    setMsgObj(updatedMsg)
  }
  let menuRef = useRef()
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!menuRef.current.contains(event.target)) {
        setShowNotification(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })

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
              <NotificationBadge>
                <p>{msgObj.length}</p>
              </NotificationBadge>
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
          <NotificationHeader ref={menuRef}>
            <h3>Notifications</h3>
            <p>Mark all as read</p>
          </NotificationHeader>

          {msgObj.length > 0 ? (
            <NotificationMessages>
              {msgObj.map((item, index) => (
                <Message
                  key={index}
                  onClick={(e) => handleCheck(e, item.messageText)}
                >
                  <h6>
                    {item.messageText}
                    {/* <span>{item.messageText}</span> */}
                  </h6>
                  <p>12:03pm</p>
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
  )
}

export default Navbar
export { LogoNav }
