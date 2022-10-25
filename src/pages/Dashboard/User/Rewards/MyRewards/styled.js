import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
`;

export const Body = styled.div`
  display: flex;
  gap: clamp(24px, 2.4vw, 42px);
  padding: clamp(16px, 3.6vw, 24px) 24px 24px;
  border: 1px solid #edf1f7;
  border-top: none;

  @media screen and (max-width: 700px) {
    border: none;
  }
`;

export const BodyLeft = styled.div`
  position: sticky;
  top: clamp(222px, 24vw, 262px);
  display: flex;
  flex-flow: column;
  gap: 16px;
  white-space: nowrap;
  font-size: clamp(14px, 1.5rem, 16px);
  height: max-content;
  padding-inline: 0 20px;

  h3 {
    font-weight: 600;
    color: #151717;
  }

  h4 {
    color: #00a2d4;
    font-weight: 500;
  }

  ul {
    display: flex;
    flex-flow: column;
    gap: 16px;
    color: #4e5152;
    font-weight: 500;
    list-style-type: none;
    > li {
      cursor: pointer;
    }
  }

  @media screen and (max-width: 800px) {
    display: none;
  }
`;
export const BodyRight = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: clamp(16px, 1.6vw, 24px);
  width: 100%;

  @media screen and (max-width: 532px) {
    grid-template-columns: auto;
  }

  @media screen and (max-width: 1000px) {
    grid-template-columns: auto auto;
  }

  @media screen and (min-width: 1550px) {
    grid-template-columns: auto auto auto auto;
  }
`;
export const Footer = styled.div``;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 40px;
  height: ${({ height }) => height && height};
`;
