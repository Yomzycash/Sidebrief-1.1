import styled from "styled-components";

export const Registration = styled.div`
  display: flex;
  flex-flow: column;
  height: max-content;
  gap: 12px;
  background-color: white;
  padding: 59px;
  border: 1px solid #edf1f7;
  box-shadow: -10px -10px 10px -5px #9596970a, 10px 10px 10px -5px #9596970a;
  border-radius: 12px;

  @media screen and (max-width: 700px) {
    padding-inline: 24px;
  }
`;
export const TestBlock = styled.div`
  height: 1px;
  width: 100%;
`;
export const Form = styled.form`
  display: flex;
  flex-flow: column;
  gap: clamp(32px, 3.2vw, 40px);
  height: max-content;

  @media screen and (max-width: 1000px) {
    margin-top: 20px;
  }
`;
export const Body = styled.div`
  display: flex;
  flex-flow: column;
  gap: 1rem;
`;

export const Bottom = styled.div`
  display: flex;
  flex-flow: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
`;
export const DoubleGridWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(45%, 1fr));
  row-gap: 24px;
  column-gap: 24px;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;
export const OrWrapper = styled.div`
  display: flex;
  gap: 24px;
  padding: 24px;
  hr {
    width: 40%;
    height: 0.1px;
    margin-top: 6px;
    color: #f4f4f4;
    opacity: 0.2;
  }
`;
export const OrText = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: #959697;
`;
export const QuestionWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
`;

export const DropDownWrapper = styled.div`
  background: #ffffff;
  width: 100%;
  position: relative;
  padding: 4px;
  margin-top: 10px;
  height: 50px;
  border-radius: 8px;

  border: 1px solid #e1e1de;
`;

export const CheckInputBox = styled.input`
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.46);
`;

export const ShowList = styled.div`
  background: #ffffff;
  width: 90%;
  align-items: center;
  display: flex;
  gap: 10px;
  padding-inline: 24px;
`;

export const ShowListIcon = styled.div`
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  cursor: pointer;
`;

export const DropDown = styled.div`
  background: #ffffff;
  border: 1px solid #e1e1de;
  position: absolute;
  width: 100%;
  height: 200px;
  top: 50px;
  overflow-y: auto;
  right: 1px;
  z-index: 5;
  padding: 10px 0px;
`;

export const ListItems = styled.ul`
  gap: 10px;
  display: flex;
  flex-direction: column;
`;
export const Label = styled.label`
  color: #4e5152;
  font-weight: 500;
  font-size: clamp(12px, 1.3vw, 14px);
`;
export const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ListItem = styled.li`
  display: flex;
  gap: 10px;
  padding: 14px 10px;
  align-items: center;

  &:hover {
    background-color: rgba(0, 162, 212, 0.1);
    cursor: pointer;
  }
`;

export const Item = styled.p`
  font-size: 14px;
`;
export const ErrMsg = styled.div`
  color: red;
  font-size: 12px;
  justify-content: center;
  align-items: center;
`;
export const OtherInput = styled.input`
  height: 80%;
  border: none;
  font-size: 14px;
  outline: none;
`;
