import styled from "styled-components";
import {Link }from "react-router-dom";



export const NavWrapper= styled.nav`
display: flex;
align-items: center;
justify-content: center;
border:  1px solid #EDF1F6;




`
export const ContentWrapper =styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: center;
padding: 4px 12px;
row-gap: 8px;
margin: 13.5px 344px 13.5px 40px;
width: 820px;


  
`
export const NavLinkWrapper = styled(Link)`
display: flex;
flex: 1;
align-items: center;
justify-content: center;
text-decoration: none;

:hover {
    cursor: pointer;
    background: rgba(0, 162, 212, 0.1);
    border-radius: 20px;
    color:#00A2D4;
}

  
`

export const LinkContent= styled.p`
text-decoration: none;
text-align: center;
font-family: 'BR Firma';
font-style: normal;
font-weight: 500;
font-size: 12px;
cursor: pointer;
line-height: 21px;
color: #242627;
:hover{
color:#00A2D4;
}

`

