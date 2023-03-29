import React from "react";
import { BsCheck2All } from "react-icons/bs";
import styled from "styled-components";

const FormContainer = ({ number, question, answer, answerArray }) => {
  return (
    <Container>
      <InnerContainer>
        <QuestionNumber> Question {number}</QuestionNumber>

        <Question>{question} ? </Question>
        {Array.isArray(answerArray) &&
          answerArray?.map((el, index) => (
            <Answer key={index}>
              <BsCheck2All /> {el}
            </Answer>
          ))}
        {!Array.isArray(answerArray) && (
          <Answer>
            <BsCheck2All /> {answer}
          </Answer>
        )}
      </InnerContainer>
    </Container>
  );
};

export default FormContainer;

const Container = styled.div`
  width: 100%;

  padding-inline-start: 20px;
  padding-block: 20px;
  border: 1px solid #edf1f7;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const QuestionNumber = styled.h4`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #4e5152;
`;
const Question = styled.h3`
  font-weight: 500;
  font-size: 14px;
  line-height: 27px;

  display: flex;
  align-items: center;

  color: #242627;
`;
const Answer = styled.h3`
  display: flex;
  gap: 8px;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;

  color: #4e5152;
`;
