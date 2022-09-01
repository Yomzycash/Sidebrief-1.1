
import React, {useState} from 'react'
import { NavWrapper,NavLinkWrapper,ContentWrapper,wrapperLink,LinkContent} from './styled.js'
import { NavbarLink } from "utils/config";
import styled from 'styled-components';

const TabNavBar = (
  {icon}
) => {

  return (
    
    <NavWrapper>
        

        <ContentWrapper>
       
          {NavbarLink.map((item,index)=>(
            <NavLinkWrapper
            to={item.path}
            key={index}> 
         
            <LinkContent>
                {item.title}
                </LinkContent>
                </NavLinkWrapper>

          ))}
          <IconTextWrapper>
          <TextWrapper>
          <LinkContent>
              More
          </LinkContent>
          </TextWrapper>
          </IconTextWrapper>
          <IconWrapper>
            {icon}
          </IconWrapper>
         </ContentWrapper>
          
            
   
      
      

    
        
    </NavWrapper>
  )
}

export default TabNavBar
const TextWrapper = styled.div`
padding :0px 8px;
:hover {
  cursor: pointer;
  background: rgba(0, 162, 212, 0.1);
  border-radius: 20px;
  color:#00A2D4;
}


`

const IconTextWrapper = styled.div`
display:flex;
align-items:center;
justify-content:center;


`
const IconWrapper = styled.div`
display: flex;
justify-content: center;
align-items:center;
`
