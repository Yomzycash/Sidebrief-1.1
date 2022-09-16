import React from 'react'
import styled from 'styled-components'
import { ReactComponent as Lendha } from "asset/images/lendha.svg";
import { ReactComponent as Close } from "asset/images/close.svg";
import { ReactComponent as Copy } from "asset/images/copy.svg";
import Button from "components/button/mainButton/index.jsx";
const RewardModal = () => {
  return (
    <Wrapper>
      <LogoCancelWrapper>
      <LogoWrapper>

     <Lendha/>
      <LogoName>Lendha Africa</LogoName>
      
      </LogoWrapper>
      <Close/>
      </LogoCancelWrapper>

      <MiddleContainer>
        <Content>Your reward has been redeemed successfully!</Content>
      </MiddleContainer>
      <LowerContainer>
        <TextContainer>
          <UpperText>$200 off 1st-month subscription for payroll compliance. </UpperText>
          <lowerText>Please redeem this reward by inputting the code below on the checkout page.</lowerText>
        </TextContainer>
        <CopyContainer>
          <CopyDetails>SIDEBRIEFPROMO</CopyDetails>
          <Copy/>

        </CopyContainer>
        <div style={{width: "171px", height:"44px"}}>
        <Button
        title= "Claim Reward"/>
        </div>

      </LowerContainer>

    </Wrapper>
  )
}

export default RewardModal

const Wrapper= styled.div`
width: 448px;
height: 570px;
background: #FFFFFF;
border-radius: 16px;
padding: 40px 40px 80px 40px;
border: 1px solid red;
`
const LogoCancelWrapper = styled.div`
display: flex;
justify-content: space-between;

`


const ModalClose = styled.div`
width: 24px;
height: 24px;
`
const LogoName = styled.p`
font-family: 'BR Firma';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 24px;
letter-spacing: -0.02em;
text-transform: capitalize;
color: #151717;

`
const LogoWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
gap: 8px;
margin-bottom: 40px;

`
const MiddleContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
padding: 8px 24px;
gap: 8px;
background: rgba(0, 212, 72, 0.1);
border-radius: 8px;
margin-bottom: 40px;



`
const Content= styled.h4`
font-family: 'BR Firma';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 21px;
color: #00D448;
`
const LowerContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 40px;

`
const TextContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 40px;
width:inherit;

` 
const UpperText= styled.h3`
font-family: 'BR Firma';
font-style: normal;
font-weight: 600;
font-size: 24px;
line-height: 36px;
letter-spacing: -0.5px;
color: #151717;

`
const lowerText= styled.p`
font-family: 'BR Firma';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 24px;
letter-spacing: -0.5px;
color: #4E5152;

`
const CopyContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
padding: 16px 24px;
gap: 8px;
border: 1px dashed #727474;
border-radius: 8px;
`
const CopyDetails= styled.h4`
font-family: 'BR Firma';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 24px;
letter-spacing: -0.02em;
text-transform: capitalize;
color: #151717;


`