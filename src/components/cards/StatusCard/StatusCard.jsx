import React from 'react'
import styled from 'styled-components';

const StatusCard = (
{
    top= 'Total Applications',
    middle='12',
    icon, 
    bottom='20% this month',
    border, 
    color
    

}
) => {
  return (
    <Container border= {border}>
        <Top>{top}</Top>
        <Middle>{middle}</Middle>
        <BottomWrapper>
            <IconWrapper color ={color}></IconWrapper>
            <div>
            {bottom}</div>
        </BottomWrapper>

    </Container>
  )
}

export default StatusCard


 const Container =styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 32px;
gap: 8px;
width: 198px;
height: 150px;
background: #FFFFFF;
border: 1px solid  #EDF1F7;
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
padding: 0px;
gap: 2px;
wrap: no-wrap;

 
 `
 const IconWrapper = styled.div`
width: 8px;
height: 8px;
border-radius: 50%;
background-color:${(props)=>(props.color ? props.color :"#00D448")};
 
 `
