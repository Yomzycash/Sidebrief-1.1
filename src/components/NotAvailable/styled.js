import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  border: solid red;
  padding-top: 100px;
  padding-bottom: 100px;
`;

export const BoldText = styled.h3`
  color: #151717;
  font-size: clamp(20px, 1.5vw, 28px);
  font-weight: 700;
  text-align: center;
`;

export const ParagraphText = styled.p`
  color: ${(props) => (props.clickColor ? "#00a2d4" : "#4E5152")};
  font-size: clamp(14px, 1.5vw, 16px);
  font-weight: 400;
  text-align: center;
`;
