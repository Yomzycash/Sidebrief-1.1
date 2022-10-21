import Button from 'components/button'
import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const spinTransition = {
  // loop: Infinity,
  ease: 'linear',
  duration: 1.5,
}

const Success = ({
  title = 'Payment Successful',
  image,
  imageName = 'success',
  description = 'We have confirmed your payment. Kindly continue to complete documentation.',
  buttonTitle = 'continue',
  onClick,
  lastText,
  action,
}) => {
  return (
    <>
      <Wrapper>
        <ImageWrapper
          key="Success"
          animate={{ rotate: 360 }}
          transition={spinTransition}
        >
          <Image src={image} alt={imageName} />
        </ImageWrapper>

        <TextWrapper>
          <Title>{title}</Title>
          <BottomText>{description}</BottomText>
        </TextWrapper>
        <Button title={buttonTitle} onClick={onClick} />
        {lastText && (
          <FinalText onClick={action}>Change Payment Method</FinalText>
        )}
      </Wrapper>
    </>
  )
}

export default Success
const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  max-width: 628px;
  /* border: 1px solid red; */
  @media screen and (max-width: 608px) {
    max-width: 380px;
  }
  @media screen and (max-width: 405px) {
    max-width: 250px;
  }
`
const ImageWrapper = styled(motion.div)``
const Image = styled.img`
  margin: 0 auto;
`
const TextWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
  margin-bottom: 24px;
`
const Title = styled.h3`
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  color: #151717;
  @media screen and (max-width: 600px) {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }
`
const BottomText = styled.p`
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  @media screen and (max-width: 600px) {
    max-width: 380px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }
`
const FinalText = styled.p`
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: -0.5px;
  cursor: pointer;
  margin-top: 24px;
  color: #00a2d4;
  @media screen and (max-width: 600px) {
    max-width: 380px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }
`
