import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 24px;

  svg {
    max-width: 80%;
    height: auto;
  }

  p {
    text-align: center;
    font-size: clamp(14px, 1.8vw, 18px);
  }

  button {
    span {
      max-width: max-content;
    }
  }
`;
