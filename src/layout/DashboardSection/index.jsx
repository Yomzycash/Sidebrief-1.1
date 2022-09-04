import React from "react";
import { Section, Header, HeaderTop, Right, HeaderBody, Body } from "./styled";

const DashboardSection = ({
  title,
  body,
  children,
  MarginRight,
  BigTitle,
  link,
  nowrap,
}) => {
  return (
    <Section MarginRight={MarginRight}>
      <Header>
        <HeaderTop BigTitle={BigTitle}>
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
      <Body nowrap={nowrap}>{children}</Body>
    </Section>
  );
};

export default DashboardSection;
