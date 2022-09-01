import styled from "styled-components";

export const Section = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 32px;
`;
export const Header = styled.div`
  display: flex;
  flex-flow: column;
  gap: 4px;
  > p:nth-of-type(1) {
    font-weight: 600;
    font-size: clamp(13px, 1.5vw, 16px);
    color: #151717;
  }
  > p:nth-of-type(2) {
    font-weight: 400;
    font-size: clamp(12px, 1.5vw, 14px);
    color: #727474;
  }
`;
export const Body = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 24px;
`;
