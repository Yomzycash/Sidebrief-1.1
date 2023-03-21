import styled from "styled-components";

export const Container = styled.div``;
export const Top = styled.div``;

export const ToggleWrapper = styled.div`
  display: flex;
  gap: 8px;
  cursor: pointer;
`;

export const LeftText = styled.div``;

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 36px;
  height: 20px;
  background: ${({ $checkedStatus }) => ($checkedStatus ? "#00A2D4" : "#e6e6e6")};
  border-radius: 24px;
  transition: 0.3s ease all;

  input {
    display: none;
  }
`;

export const Indicator = styled.div`
  position: relative;
  left: ${({ $checkedStatus }) => ($checkedStatus ? "calc(100% - 16px)" : "0")};
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
  transition: 0.3s ease all;
`;
export const RightText = styled.div`
  color: #959697;
  font-weight: 400;
  font-size: 14px;
`;
