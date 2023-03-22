import styled from "styled-components";

export const Bottom = styled.div`
display: flex;
width: 100%;
padding: 32px clamp(24px, 3.4vw, 40px);
`;
export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 40px;
  height: ${({ height }) => height && height};
`;
