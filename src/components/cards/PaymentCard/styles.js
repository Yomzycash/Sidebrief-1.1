import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: max-content;
  gap: 30px;
  background: #ffffff;
  /* Border Color */
  padding: 60px 50px;
  border: 1px solid #edf1f7;
  box-shadow: 0px 10px 10px -5px rgba(149, 150, 151, 0.04);
  border-radius: 16px;
`;
export const LeftTextContainer = styled.p`
  width: 50%;
  font-size: 14px;
  margin-top: 5px;
`;
export const RightTextContainer = styled.p`
  font-size: 14px;
  padding: 4px 10px;
  border-radius: 16px;
  background-color: ${(props) => (props.background ? props.background : "")};
`;
export const FieldContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: max-content;
  background-color: white;
  padding: 18px 14px;
  border: 1px solid #edf1f6;
`;

export const TopContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const BottomContainer = styled.div`
  > div:nth-of-type(even) {
    background-color: white;
  }
  > div:nth-of-type(odd) {
    background-color: #edf1f6;
  }
`;
