
import React from 'react'
import { NavWrapper,NavLinkWrapper,ContentWrapper,WrapperDropdown,Iconwrapper,Link } from './styled.js'

const TabNavBar = ({
    content1 ='Business Registration',
    content2 ='Business Compliance', 
    content3 ='Automate Taxes',
    content4 = 'Hiring and payroll',
    content5 = 'Intellectual Assets',
    content6 ='More',
    icon

}

) => {
  return (
    <NavWrapper>
        <NavLinkWrapper>
        <ContentWrapper>
          <Link>{content1}</Link>
            
        </ContentWrapper>

        <ContentWrapper>
        <Link>{content2}</Link>
        </ContentWrapper>

         <ContentWrapper>
            <Link>{content3}</Link>
        </ContentWrapper> 

        <ContentWrapper>
         <Link>{content4}</Link>
        </ContentWrapper> 
        <ContentWrapper>
        <Link>{content5}</Link>
        </ContentWrapper>

        <WrapperDropdown>
        <ContentWrapper>
        <Link>{content6}</Link>
        </ContentWrapper>
        <Iconwrapper>
            {icon}
        </Iconwrapper>
        </WrapperDropdown>

    </NavLinkWrapper>
        
    </NavWrapper>
  )
}

export default TabNavBar

