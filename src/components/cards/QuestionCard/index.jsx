import React from "react";
import { Answer, Container, InnerContainer, Loading, Question, Wrapper } from "./style";
import { Puff } from "react-loading-icons";
const QuestionCard = ({ question, loadingState }) => {
  return (
    <div>
      <Wrapper>
        {loadingState?.isLoading && (
          <Loading height="50vh">
            <Puff stroke="#00A2D4" fill="white" />
          </Loading>
        )}

        <Container>
          {question?.map((el, index) => (
            <InnerContainer key={index}>
              <Question>{el.complyQuestion}</Question>
              <Answer>{el.complyAnswer}</Answer>
            </InnerContainer>
          ))}
        </Container>
      </Wrapper>
    </div>
  );
};

export default QuestionCard;
