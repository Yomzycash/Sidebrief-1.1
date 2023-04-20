import styled from "styled-components";

export const EmptyContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 24px;

  * {
    max-width: 90%;
  }

  p {
    text-align: center;
    font-size: clamp(16px, 1.8vw, 20px);
  }

  button {
    span {
      max-width: max-content;
    }
  }
`;
