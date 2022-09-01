import React from "react";
import { Section, Header, Body } from "./styled";

const DashboardSection = ({ title, body, children }) => {
  return (
    <Section>
      <Header>
        <p>{title}</p>
        <p>{body}</p>
      </Header>
      <Body>{children}</Body>
    </Section>
  );
};

export default DashboardSection;
