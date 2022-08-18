import React from 'react'
import Navbar from '../../../../../components/navbar'
import { SuccessWrapper, Image } from './styled'
import success from '../../../../../asset/images/Success.png'
import { PrimaryText, SecondaryText } from '../../../../../components/text/text'

const Success = () => {
  return (
    <>
        <Navbar />

        <SuccessWrapper>
          <Image src ={success} alt="success" />
            <PrimaryText>Account Creation Success</PrimaryText>
            <SecondaryText>Your Sidebrief account has been successfully created. We are redirecting you to your dashboard.</SecondaryText>
        </SuccessWrapper>
    </>
  )
}

export default Success