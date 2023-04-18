import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
  margin: 0 40px;
  padding: 24px 0;

  @media screen and (max-width: 700px) {
    margin: 24px;
    padding: 0;
  }
`;

export const Body = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 500px));
  gap: 42px;
  padding-block: 40px;

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(200px, 500px));
  }

  @media screen and (max-width: 800px) {
    display: flex;
    flex-flow: column;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-flow: column;
  gap: 12px;
  background-color: white;
  z-index: 2;

  p:nth-of-type(1) {
    text-transform: capitalize;
    font-size: clamp(18px, 1.8vw, 20px);
    font-weight: 600;
  }
`;
