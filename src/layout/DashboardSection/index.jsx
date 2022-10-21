import React from "react";
import { Section, Header, HeaderTop, Right, HeaderBody, Body } from "./styled";

const DashboardSection = ({
  title,
  body,
  children,
  MarginRight,
  link,
  nowrap,
  column,
  carousel,
}) => {
  return (
    <Section MarginRight={MarginRight} carousel={carousel}>
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
      <Body nowrap={nowrap} carousel={carousel}>
        {children}
      </Body>
    </Section>
  );
};

export default DashboardSection;
