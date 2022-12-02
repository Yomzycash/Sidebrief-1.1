import styled from "styled-components";

export const Container = styled.div`
  background: #ffffff;
  border: 1px solid #edf1f7;
  box-shadow: 0px 10px 10px -5px rgba(149, 150, 151, 0.04);
  border-radius: 16px;
  padding: 24px;
  width: 100%;
`;

export const ChartContainer = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 320px;
  min-height: 271px;
  gap: 100px;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

export const TopContent = styled.div`
  justify-content: flex-end;
  align-items: center;
  display: flex;
  margin-bottom: 22px;

  select {
    font-size: 12px;
    color: #4e5152;
    background: #f8f8f8;
    border-radius: 12px;
    outline: none;
    padding: 15px 24px;
    border: none;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 24px;
`;

export const Button = styled.div`
  display: flex;
  flex-flow: row;
  gap: 24px;
  align-items: center;
  padding: 15px 24px;
  border-radius: 12px;
  border: ${(props) => props.border};
`;
export const Number = styled.p`
  color: ${(props) => props.color};
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
`;

export const BtnText = styled.p``;
