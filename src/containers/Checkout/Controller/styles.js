import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  ${({ hidePrev }) => `
  justify-content: ${hidePrev ? "flex-end" : ""};
  `}

  @media screen and (max-width: 600px) {
    flex-direction: ${({ $modal }) => ($modal ? "" : "column-reverse")};
    gap: 27px;
    justify-content: center;
  }
`;
