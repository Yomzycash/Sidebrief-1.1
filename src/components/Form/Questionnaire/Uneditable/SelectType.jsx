import React, { useState } from "react";
import {
  ErrMsg,
  QuestionOptions,
  ReviewContainer,
  ReviewQuestion,
  ReviewTop,
  ReviewTopLeft,
} from "../styled";
import Option from "./Option";

const SelectType = ({ info, questionNumber, handleRadioSelect, handleCheckboxSelect, error }) => {
  const [checkList, setCheckList] = useState([]);

  let questionMark = info?.fieldQuestion?.slice(-1) === "?" ? "" : "?";

  const onRadioChange = (e, text) => {
    handleRadioSelect(text, info?.fieldName);
  };

  const onCheckboxChange = (e, text) => {
    let checked = e.target.checked;

    if (checked) {
      let list = [...checkList, text];
      setCheckList(list);
      handleCheckboxSelect(list, info?.fieldName);
    } else {
      let list = checkList.filter((el) => el !== text);
      setCheckList(list);
      handleCheckboxSelect(list, info?.fieldName);
    }
  };

  return (
    <ReviewContainer>
      <ReviewTop>
        <ReviewTopLeft>
          <span>Question {questionNumber}</span>
          {info?.fieldRequired && <span>Compulsory</span>}
        </ReviewTopLeft>
        <ErrMsg>{error?.message}</ErrMsg>
      </ReviewTop>

      <ReviewQuestion>{info?.fieldQuestion + questionMark}</ReviewQuestion>

      {info?.fieldType === "checkbox" && (
        <QuestionOptions>
          {info?.fieldOptions?.map((text, index) => (
            <Option
              key={index}
              index={index}
              type="checkbox"
              text={text}
              name={info?.fieldName}
              onChange={(e) => onCheckboxChange(e, text)}
            />
          ))}
        </QuestionOptions>
      )}

      {info?.fieldType === "radio" && (
        <QuestionOptions>
          {info?.fieldOptions?.map((text, index) => (
            <Option
              key={index}
              index={index}
              type="radio"
              text={text}
              name={info?.fieldName}
              onChange={(e) => onRadioChange(e, text)}
            />
          ))}
        </QuestionOptions>
      )}
    </ReviewContainer>
  );
};

export default SelectType;
