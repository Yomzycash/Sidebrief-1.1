import React from "react";
import styled from "styled-components";

const PrimaryText = ({ title, body }) => {
  return (
    <PrimaryTextCont>
      <Title> {title}</Title>
      <Body>{body}</Body>
    </PrimaryTextCont>
  );
};

export default PrimaryText;

const PrimaryTextCont = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
`;

const Title = styled.div`
  font-size: clamp(20px, 2vw, 28px);
  color: var(--SecondaryBlack);
  font-weight: 700;
`;
const Body = styled.div`
  font-size: clamp(14px, 1.5vw, 20px);
  color: var(--PrimaryBlack);
  font-weight: 400;
`;
