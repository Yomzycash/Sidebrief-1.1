import HeaderCheckout from 'components/Header/HeaderCheckout'
import { CheckoutSection } from 'containers'
import React from 'react'
import { useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { setCheckoutProgress } from 'redux/Slices'
import { store } from 'redux/Store'
import { Body, Container } from './style'
import { ReviewTab } from './constant'
import { Nav, ReviweTabWrapper } from './style'

const Review = () => {
  const ActiveStyles = {
    color: '#151717',
    borderBottom: '4px solid #00A2D4',
    borderRadius: 0,
  }
  // Set the progress of the application
  useEffect(() => {
    store.dispatch(setCheckoutProgress({ total: 13, current: 13 })) // total- total pages and current - current page
  }, [])

  return (
    <Container>
      <HeaderCheckout />
      <Body>
        <CheckoutSection
          title={'Review Information'}
          HeaderParagraph="Please ensure all information provided for this business are correct"
        />
        <Nav>
          {ReviewTab.map((item, index) => (
            <ReviweTabWrapper to={item.path} key={index}>
              <NavLink
                to={item.path}
                style={({ isActive }) => (isActive ? ActiveStyles : {})}
              >
                {item.title}
              </NavLink>
            </ReviweTabWrapper>
          ))}
        </Nav>
        <Outlet />
      </Body>
    </Container>
  )
}

export default Review
