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
