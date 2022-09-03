import React from 'react'
import styled from 'styled-components';
import {CardContainer} from "utils/config";

const StatusCard = (
  {icon}
) => {
  return (
    <Wrapper>  
      {CardContainer.map((item, index)=> (
    <Container key={index} border={item.id==1 && '16px 0px 0px 16px'}>
        <Top>{item.title}</Top>
        <Middle>{item.number}</Middle>
        <BottomWrapper>
            <IconWrapper color ={(item.id==2 || item.id==5) && '#ED4E3A'}></IconWrapper>
            <div>
            {item.description}</div>
        </BottomWrapper>

    </Container>
   )) }
   <LastContainer>
    <p>This month</p>
    <DropdownWrapper>{icon}</DropdownWrapper>
    
   </LastContainer>
   </Wrapper>

  )
}

export default StatusCard

const Wrapper= styled.div`
  display: flex;
  align-items: flex-start;
  background: #FFFFFF;
  border: 1px solid #EDF1F7;
  box-shadow: -4px 10px 16px 8px rgba(149, 150, 151, 0.08), 0px 10px 10px -5px rgba(149, 150, 151, 0.04);
  border-radius: 16px;
  max-width: fit-content;

`
 const Container =styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 34px;
gap: 8px;
width: 198px;
height: 150px;
background: #FFFFFF;
border-width: 0px 1px;
border-style: solid;
border-color: #EDF1F7;
border-radius:${(props)=>(props.border ? props.border :"0px")};

 
 `
 const Top= styled.h5`
font-family: 'BR Firma';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 21px;
letter-spacing: -0.01em;
color: #4E5152;
 `
const Middle= styled.h3`
font-family: 'BR Firma';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 24px;
color: #151717;
 
 `
 const BottomWrapper = styled.div`
display: inline-flex;
flex-direction: row;
align-items: center;
font-style: italic;
gap: 4px;
font-style: italic;
font-weight: 500;
font-size: 12px;
line-height: 21px;
color: #242627;




 
 `
 const IconWrapper = styled.div`
width: 8px;
height: 8px;
border-radius: 50%;
background-color:${(props)=>(props.color ? props.color :"#00D448")};
 
 `
 const LastContainer = styled.div`
 width: 134px;
 height: 150px;
 display: flex;
 align-items: center;
 justify-content: center;
 font-family: 'BR Firma';
 font-style: normal;
 font-weight: 500;
 font-size: 12px;
 line-height: 21px;
 color: #4E5152;
 gap: 3px;
 `

 const DropdownWrapper = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 `
