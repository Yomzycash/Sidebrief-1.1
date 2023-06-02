import React from "react";
import {
  AnswerInput,
  AnswerTextArea,
  ErrMsg,
  QuestionOptions,
  ReviewContainer,
  ReviewQuestion,
  ReviewTop,
  ReviewTopLeft,
} from "../styled";
import Option from "./Option";

const TextType = ({ questionNumber, info, handleChange, error, register }) => {
  let questionMark = info?.fieldQuestion?.slice(-1) === "?" ? "" : "?";

  const onChange = (e) => {
    let value = e.target.value;
    handleChange(value, info?.fieldName);
  };

  return (
    <ReviewContainer>
      <ReviewTop>
        <ReviewTopLeft htmlFor={info?.fieldName}>
          <span>Question {questionNumber}</span>
          {info?.fieldRequired && <span>Compulsory</span>}
        </ReviewTopLeft>
        <ErrMsg>{error?.message}</ErrMsg>
      </ReviewTop>

      <ReviewQuestion htmlFor={info?.fieldName}>
        {info?.fieldQuestion + questionMark}
      </ReviewQuestion>

      {info?.fieldType === "input" && (
        <AnswerInput
          id={info?.fieldName}
          type="text"
          onChange={onChange}
          error={error?.message}
          {...register(info?.fieldName)}
        />
      )}

      {info?.fieldType === "number" && (
        <AnswerInput
          id={info?.fieldName}
          type="number"
          onChange={onChange}
          error={error?.message}
          {...register(info?.fieldName)}
        />
      )}

      {info?.fieldType === "textarea" && (
        <AnswerTextArea
          id={info?.fieldName}
          onChange={onChange}
          error={error?.message}
          {...register(info?.fieldName)}
        />
      )}
    </ReviewContainer>
  );
};

export default TextType;
