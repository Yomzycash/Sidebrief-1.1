import styled from "styled-components";

export const StyledWrapper = styled.div`
  cursor: pointer;
  width: 100%;
  height: 168px;
  padding: clamp(18px, 1.8vw, 24px);
  background: #ffffff;
  box-shadow: 0px 10px 10px -5px #9596970a;
  border-radius: 16px;
  border: 1px solid #edf1f7;
  transition: 0.3s ease all;

  @media screen and (min-width: 701px) {
    grid-row: span 2;
    grid-column: span 1;
    width: auto;
  }

  @media screen and (max-width: 700px) {
    grid-row: span 2;
    grid-column: span 1;
    width: 100%;
  }

  :hover {
    box-shadow: 0 0 15px #ebebeb;
  }
`;

export const Number = styled.h3`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #242627;
  padding: 15px 0;
  // margin-block-end: 8px;
`;

export const TopText = styled.h4`
  font-weight: 500;
  font-size: clamp(12px, 1.2vw, 14px);
  line-height: 21px;
  letter-spacing: -0.01em;
  color: #4e5152;
  white-space: nowrap;
`;

export const BottomText = styled.h4`
  font-weight: 500;
  font-size: clamp(10px, 1vw, 12px);
  line-height: 21px;
  letter-spacing: -0.01em;
  color: #4e5152;
  white-space: nowrap;
  border-top: 1px solid #edf1f7;
  padding: 10px 0;
`;
