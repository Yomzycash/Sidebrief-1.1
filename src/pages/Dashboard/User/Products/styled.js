import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
  margin: 0 40px;

  @media screen and (max-width: 1050px) {
    margin: 0;
  }
`;

export const Body = styled.div`
  display: flex;
  gap: 42px;
  border: 1px solid #edf1f7;
  border-top: none;
`;

export const Header = styled.div`
  position: sticky;
  top: 57.1px;
  display: flex;
  flex-flow: column;
  background-color: white;
  z-index: 2;

  @media screen and (max-width: 700px) {
    flex-flow: column-reverse;
  }
`;
