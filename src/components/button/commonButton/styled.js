import styled from "styled-components";

export const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  padding: 10px 24px;
  background: #00a2d4;
  border-radius: 8px;
  outline: none;
  border: none;
  cursor: pointer;
  max-width: max-content;

  span {
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
  }
`;
