import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
`;
export const Top = styled.div``;
export const Body = styled.div`
  display: flex;
  flex-flow: column;
  padding-top: 150px;
`;
export const Main = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin: auto 250px;
`;
export const Image = styled.img`
  margin-bottom: 24px;
`;
export const BoldText = styled.h3`
  color: #151717;
  font-size: clamp(20px, 1.5vw, 28px);
  font-weight: 700;
  text-align: ${(props) => props.align};
  margin-top: ${(props) => props.top};
  margin-bottom: ${(props) => props.bottom};
  margin-right: ${(props) => props.right};
  margin-left: ${(props) => props.left};
`;

export const ParagraphText = styled.p`
  color: ${(props) => (props.clickColor ? "#00a2d4" : "#4E5152")};
  font-size: clamp(14px, 1.5vw, 16px);
  font-weight: 400;
  text-align: ${(props) => props.align};
  margin-top: ${(props) => props.top};
  margin-bottom: ${(props) => props.bottom};
  margin-right: ${(props) => props.right};
  margin-left: ${(props) => props.left};
  width: ${(props) => props.width};
  cursor: ${(props) => props.cursor && "pointer"};
`;

export const ComingBtn = styled.button`
  border: 1px solid #00a2d4;
  padding: 16px 7px;
  width: 500px;
  color: #00a2d4;
  background: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 40px;

  :hover {
    background-color: #00a2d4;
    color: white;
  }
`;
