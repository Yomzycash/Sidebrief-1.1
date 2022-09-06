import React from 'react'
import styled from 'styled-components';

const Checkbox = ({
  text1 ='Click here to use ',
  styledSpan ='Sidebrief',
  text2 ='shareholders until you sustain your own',
  styledSpan2}
) => {
  
  return (
    <Wrapper>
       <CheckboxInput
       type ='checkbox'/> 
    <Text>{text1}<Span>{styledSpan}</Span> {text2} <Span>{styledSpan2}</Span> .</Text>

    </Wrapper>
  )
}

export default Checkbox;

const Wrapper = styled.div`
display: inline-flex;
align-items: center;
gap: 16px;
width: 100%;


`
const CheckboxInput = styled.input`
height: 20px;
width: 20px;
background: #FFFFFF;
border: 1px solid #EDF1F7;
border-radius: 4px;
`
const Text= styled.p`
font-family: 'BR Firma';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 21px;
color: #4E5152;

`
const Span = styled.span`
color: #0082AA;

`