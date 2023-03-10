import { question } from "pages/Services/Review/constant";
import React from "react";
import { Answer, Container, InnerContainer, Question, Wrapper } from "./style";

const QuestionCard = () => {
  return (
    <div>
      <Wrapper>
        <Container>
          {question?.map((el, index) => (
            <InnerContainer key={index}>
              <Question>{el.question}</Question>
              <Answer>{el.answer}</Answer>
            </InnerContainer>
          ))}
        </Container>
      </Wrapper>
    </div>
  );
};

export default QuestionCard;
