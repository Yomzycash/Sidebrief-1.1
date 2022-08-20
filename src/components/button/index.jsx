import React from 'react'
import styled from 'styled-components'

const ButtonWrapper = styled.button`
width: 100%;
height: 59px;
background-color: #00A2D4;
border-radius: 8px;
color: #ffffff;
text-align : center;
font-size: 18px;
border: none;
cursor: pointer;

`

const Button = ({title ="Test"}) => {
  return (
   <ButtonWrapper>{title}</ButtonWrapper>
  )
}

export default Button