import React, { useState } from "react";
import {
  QuestionOptions,
  ReviewContainer,
  ReviewQuestion,
  ReviewTop,
  ReviewTopLeft,
} from "../styled";
import EditDelete from "components/button/EditDelete";
import Option from "./Option";

const QuestionReview = ({ info, questionNumber, setDisabled, deleteAction, deleteState }) => {
  const [selectedToDelete, setselectedToDelete] = useState();

  let questionMark = info?.fieldQuestion?.slice(-1) === "?" ? "" : "?";

  let loading = deleteState.isLoading && selectedToDelete?.fieldCode === info?.fieldCode;

  const handleDeleteQuestion = () => {
    deleteAction(info);
    setselectedToDelete(info);
  };

  const handleEditQuestion = () => {
    setDisabled(false);
  };

  return (
    <ReviewContainer>
      <ReviewTop>
        <ReviewTopLeft>
          <span>Question {questionNumber}</span>
          {info?.fieldRequired && <span>Compulsory</span>}
        </ReviewTopLeft>
        <EditDelete
          editAction={handleEditQuestion}
          deleteAction={handleDeleteQuestion}
          deleteLoading={loading}
        />
      </ReviewTop>

      <ReviewQuestion>{info?.fieldQuestion + questionMark}</ReviewQuestion>

      {info?.fieldType === "checkbox" && (
        <QuestionOptions>
          {info?.fieldOptions?.map((text, index) => (
            <Option key={index} type="checkbox" text={text} disable={true} />
          ))}
        </QuestionOptions>
      )}

      {info?.fieldType === "radio" && (
        <QuestionOptions>
          {info?.fieldOptions?.map((text, index) => (
            <Option key={index} type="radio" text={text} disable={true} />
          ))}
        </QuestionOptions>
      )}
    </ReviewContainer>
  );
};

export default QuestionReview;
