import styled from "styled-components";

export const LoaderWrapper = styled.div({
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  flexDirection: "row",
  padding: "auto",
  height: "100vh",
});

export const Image = styled.img`
  width: clamp(100px, 12vw, 130px);
`;
