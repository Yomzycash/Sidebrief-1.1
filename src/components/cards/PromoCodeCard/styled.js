import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 30px;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;

export const Left = styled.div``;

export const PromoInfo = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  color: #242627;

  span {
    :nth-of-type(2) {
      color: #00a2d4;
    }
  }
`;

export const PromoDate = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #727474;
`;

export const Right = styled.div`
  display: flex;
  gap: 30px;

  button {
    cursor: pointer;
    border: none;
    outline: none;
    background-color: transparent;
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;

    :nth-of-type(1) {
      color: #c54130;
    }
    :nth-of-type(2) {
      color: #00a2d4;
    }
  }
`;
