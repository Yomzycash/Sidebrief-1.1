import styled from "styled-components";

export const RadioWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 20px 50px;
  margin-top: 16px;
`;

export const Radio = styled.div`
  display: flex;
  align-items: center;

  input,
  label {
    cursor: pointer;
  }

  label {
    padding-left: 8px;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: #4e5152;
  }
`;
