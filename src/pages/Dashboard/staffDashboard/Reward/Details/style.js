import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
`;

export const Body = styled.div`
  display: flex;
  width: 100%;
`;
export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 40px;
  height: ${({ height }) => height && height};
`;
