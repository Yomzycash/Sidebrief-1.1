import HeaderCheckout from 'components/Header/HeaderCheckout'
import Success from 'containers/Confirmation/Success'
import React from 'react'
import styled from 'styled-components'
import SuccessImage from 'asset/svg/SuccessImage.svg'
import { useNavigate } from 'react-router-dom'
const ApplicationSuccessPage = () => {
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate('/')
  }

  return (
    <>
      <HeaderCheckout />

      <Body>
        <Success
          title="Application Successful"
          description="Thank you for your patience, your application would take 20-30days"
          image={SuccessImage}
          buttonTitle="View Application"
          onClick={handleNavigate}
        />
      </Body>
    </>
  )
}

export default ApplicationSuccessPage
const Body = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 81.5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
