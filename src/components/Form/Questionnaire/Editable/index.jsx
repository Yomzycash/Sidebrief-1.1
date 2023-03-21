import React from "react";
import { useState } from "react";
import QuestionReview from "./QuestionReview";
import QuestionEdit from "./QuestionEdit";

const EditableQuestionnaire = ({
  index,
  lastQuestion,
  info,
  review,
  handleQuestionSubmit,
  handleDeleteQuestion,
  handleUpdateQuestion,
  deleteState,
}) => {
  const [disabled, setDisabled] = useState(review);

  return (
    <>
      {disabled ? (
        <QuestionReview
          setDisabled={setDisabled}
          info={info}
          questionNumber={index + 1}
          deleteAction={handleDeleteQuestion}
          deleteState={deleteState}
        />
      ) : (
        <QuestionEdit
          handleQuestionSubmit={handleQuestionSubmit}
          handleUpdateQuestion={handleUpdateQuestion}
          info={info}
          review={review}
          disabled={disabled}
          setDisabled={setDisabled}
          questionNumber={review ? index + 1 : lastQuestion}
        />
      )}
    </>
  );
};

export default EditableQuestionnaire;
