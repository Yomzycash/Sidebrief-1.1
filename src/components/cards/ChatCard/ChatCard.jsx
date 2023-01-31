import React from 'react'
import styled from 'styled-components'

const ChatCard = ({ image, name, serviceName, time, message }) => {
  return (
    <Container>
      <TopContainer>
        <InnerContainer>
          <ImageContainer>
            <Image src={image} alt="" />
          </ImageContainer>
          <NameContainer>
            <UpperText>{name}</UpperText>
            <LowerText>{serviceName}</LowerText>
          </NameContainer>
        </InnerContainer>
        <LowerText>{time}</LowerText>
      </TopContainer>
      <LowerWrapper>{message}</LowerWrapper>
    </Container>
  )
}

export default ChatCard

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 24px;
  gap: 8px;
  isolation: isolate;

  width: 100%;
  height: 116px;

  background: #ffffff;
`
const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px;
  gap: 106px;

  width: 100%;
  height: 40px;
`
const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 16px;

  width: max-content;
  height: 100%;
`
const ImageContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50px;
`
const Image = styled.img`
  width: 100%;
  height: 100%;
`
const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 2px;

  width: fit-content;
  height: 100%;
`
const UpperText = styled.h3`
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;

  letter-spacing: -0.02em;

  color: #242627;
`
const LowerText = styled.h4`
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;

  letter-spacing: -0.02em;

  color: #727474;
`
const LowerWrapper = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;

  display: flex;
  align-items: center;
  letter-spacing: -0.5px;

  color: #4e5152;

  width: 100%;
  height: 36px;
`
