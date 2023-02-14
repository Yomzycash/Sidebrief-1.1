import React from 'react'
import { Section, Header, HeaderTop, Right, HeaderBody, Body } from './styled'

const DashboardSection = ({
  title,
  body,
  children,
  MarginRight,
  link,
  nowrap,
  column,
  carousel,
  bodyStyle,
  maxWidth,
}) => {
  return (
    <Section MarginRight={MarginRight} carousel={carousel} maxWidth={maxWidth}>
      <Header>
        <HeaderTop>
          <p>{title}</p>
          {link && (
            <Right to={link?.to}>
              <p>{link?.text}</p>
              {link?.icon}
            </Right>
          )}
        </HeaderTop>
        <HeaderBody>
          <p>{body}</p>
        </HeaderBody>
      </Header>
      <Body nowrap={nowrap} carousel={carousel} style={{ ...bodyStyle }}>
        {children}
      </Body>
    </Section>
  )
}

export default DashboardSection
