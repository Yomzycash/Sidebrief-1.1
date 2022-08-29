import styled from "styled-components";

// Chart comoponent's styles
export const Label = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: clamp(10px, 2vw, 12px);
  color: #727474;
  gap: 5px;
  > p {
    color: #00a2d4;
    font-weight: 700;
    font-size: clamp(20px, 2vw, 24px);
  }
`;

// BusinessChart component's styles (index)
export const BusinessesChart = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  max-width: 454px;
  min-height: 264px;
  border-radius: 16px;
  padding: 0 8px;
  background-color: white;
  border: 1px solid #edf1f6;
  box-shadow: 0 10px 10px -5px rgba(149, 150, 151, 0.08);
`;
export const Indicator = styled.div`
  display: flex;
  justify-content: center;
`;
export const Bottom = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: flex-start;
  gap: 4px;
  width: 100%;
  margin: 0 0 14px;
  @media screen and (max-width: 280px) {
    flex-flow: column;
    align-self: center;
    width: max-content;
  }
`;

// Status component's styles
export const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
`;
export const Left = styled.div`
  > div {
    margin-top: 3px;
    width: 12px;
    height: 12px;
    background-color: ${(props) => props.color || "#00a2d4"};
    border-radius: 50%;
  }
`;
export const Right = styled.div`
  display: flex;
  flex-flow: column;
  > p {
    color: #151717;
    font-size: clamp(14px, 2vw, 18px);
    font-weight: 700;
  }
  > div {
    color: #727474;
    font-size: clamp(10px, 1.5vw, 12px);
  }
`;
