import React from "react";
import { useState } from "react";
import QuestionReview from "./QuestionReview";
import QuestionEdit from "./QuestionEdit";

const Questionnaire = ({
  index,
  lastQuestion,
  info,
  review,
  handleQuestionSubmit,
  handleDeleteQuestion,
}) => {
  const [disabled, setDisabled] = useState(review);

  return (
    <>
      {disabled ? (
        <QuestionReview
          setDisabled={setDisabled}
          info={info}
          questionNumber={index + 1}
          handleDeleteQuestion={handleDeleteQuestion}
        />
      ) : (
        <QuestionEdit
          handleQuestionSubmit={handleQuestionSubmit}
          info={info}
          review={review}
          setDisabled={setDisabled}
          questionNumber={review ? index + 1 : lastQuestion}
        />
      )}
    </>
  );
};

export default Questionnaire;
