import styled from "styled-components";
export const Container = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
`;
export const Body = styled.div`
  display: flex;
  gap: 42px;
  border: 1px solid #edf1f7;
  border-top: none;
  @media screen and (max-width: 700px) {
    overflow: auto;
    border: none
  }
`;
export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100%;
  height: 200px;
`;
