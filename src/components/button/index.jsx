import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
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

const TestButton = ({title ="Test"}) => {
  return (
   <Button>{title}</Button>
  )
}

export default TestButton