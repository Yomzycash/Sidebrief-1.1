import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 30px;

  background: #ffffff;
  border: 1px solid #edf1f7;
  border-radius: 12px;
  padding: 4px 12px;
  height: max-content;

  button {
    background-color: transparent;
    padding: 0;
    gap: 10px;
    line-height: 18px;

    span {
      font-size: 12px;
    }

    :nth-of-type(1) {
      color: #0082aa;
    }
    :nth-of-type(2) {
      color: #ed4e3a;
      gap: 5px;
    }
  }

  svg {
    width: 13px;
    height: 13px;
  }
`;

export const DeleteWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  input {
    border: none;
    outline: none;
    height: 21px;

    ::placeholder {
      font-size: 10px;
    }
  }
`;
