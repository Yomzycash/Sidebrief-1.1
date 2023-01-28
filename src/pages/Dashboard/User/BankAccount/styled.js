import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
`;
export const Top = styled.div``;

export const Body = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
  margin-inline: 25px;
`;

export const BodyMain = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: clamp(16px, 1.6vw, 24px);
  width: 100%;

  @media screen and (max-width: 430px) {
    display: flex;
    flex-flow: column;
    align-items: center;
    gap: 16px;
  }

  @media screen and (max-width: 1000px) {
    grid-template-columns: auto auto;
  }

  @media screen and (min-width: 1550px) {
    grid-template-columns: auto auto auto auto;
  }
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 40px;
  height: ${({ height }) => height && height};
`;
