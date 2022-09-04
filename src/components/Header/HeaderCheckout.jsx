import React from 'react'
import styled from 'styled-components';
import { ProgressBar } from "components/Indicators";
import {FiArrowLeft}from 'react-icons/fi'
const HeaderCheckout = () => {
  return (
    <Wrapper>
        <BackContainer>
        <FiArrowLeft  color ='#151717' size={24} />
        <Text> Back to home</Text>

        </BackContainer>

        <ProgressWrapper>
            <ProgressBar/>
        </ProgressWrapper>
    </Wrapper>
  )
}

export default HeaderCheckout

const Wrapper = styled.div`
width: 100%
background: #FFFFFF;
border-bottom: 1px solid #EDF1F7;
display: flex;
align-items: center;
padding: 70px 0px 70px 80px;
// border: 1px solid black;
gap:300px;
`

const BackContainer= styled.div`
display: flex;
justify-content: center;
align-items: center;
gap : 8px;
`
const Text=styled.h3`
font-family: 'BR Firma';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 21px;
color: #151717;

`

const ProgressWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;

`