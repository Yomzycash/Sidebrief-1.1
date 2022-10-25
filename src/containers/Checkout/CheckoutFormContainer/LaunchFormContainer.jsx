import React from "react";
import styled from "styled-components";

const LaunchFormContainer = ({ children, style }) => {
  return <Container style={{ ...style }}>{children}</Container>;
};

export default LaunchFormContainer;

const Container = styled.div`
  border-top: solid 1px #edf1f6;
  /* padding: 20px 40px; */
  padding: clamp(18px, 1.8vw, 20px) clamp(24px, 3.4vw, 40px);
  gap: clamp(20px, 2vw, 24px);
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 600px) {
    padding-inline: 24px;
  }
`;
