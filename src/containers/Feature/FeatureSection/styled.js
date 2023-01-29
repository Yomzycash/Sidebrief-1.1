import styled from "styled-components";

export const SectionContainer = styled.div`
  border: 1px solid #edf1f7;
  border-radius: 16px;
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 24px;
  border-bottom: 1px solid #edf1f7;
`;

export const TopLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;

  p {
    :nth-of-type(1) {
      color: #242627;
      font-weight: 600;
      font-size: clamp(18px, 1.8vw, 20px);
      line-height: 30px;
    }
    :nth-of-type(2) {
      color: #727474;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
    }
  }
`;

export const TopRight = styled.div`
  display: flex;
  gap: 23px;
`;

export const Input = styled.div`
  font-size: 14px;
  position: relative;

  img {
    position: absolute;
    left: 18px;
    top: 10px;
  }

  input {
    border: 1px solid #edf1f7;
    border-radius: 8px;
    background: #ffffff;
    outline: none;
    padding: 11px 10px 11px 56px;

    :placeholder-shown {
      font-size: 14px;
      color: #959697;
      font-weight: 400;
      line-height: 21px;
    }
  }
`;

export const Content = styled.div``;
