import React, { useEffect, useState } from "react";
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
  const [checkList, setCheckList] = useState(info?.fieldAnswer || []);

  let questionMark = info?.fieldQuestion?.slice(-1) === "?" ? "" : "?";

  //
  const onRadioChange = (text, otherText) => {
    let isOther = text.toLowerCase() === "other";
    let otherValue = text + (otherText ? `(${otherText})` : "");

    handleRadioSelect(isOther ? otherValue : text, info?.fieldName);
  };

  //
  const onCheckboxChange = (checked, text, otherText) => {
    let isOther = text.toLowerCase() === "other";
    let otherValue = text + (otherText ? `(${otherText})` : "");
    let optionsMinusOther = [...checkList.filter((el) => !el.includes(`${text}(`) && el !== text)];

    if (checked) {
      let list;
      if (isOther) {
        list = [...optionsMinusOther, otherValue];
      } else {
        list = [...checkList, text];
      }
      setCheckList(list);
      handleCheckboxSelect(list, info?.fieldName);
    } else {
      let list = checkList.filter((el) => (isOther ? !el.includes(`${text}(`) : el));
      list = list.filter((el) => el !== text);
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
              type="checkbox"
              text={text}
              info={info}
              name={info?.fieldName}
              onChange={(checked, otherText) => onCheckboxChange(checked, text, otherText)}
            />
          ))}
        </QuestionOptions>
      )}

      {info?.fieldType === "radio" && (
        <QuestionOptions>
          {info?.fieldOptions?.map((text, index) => (
            <Option
              key={index}
              type="radio"
              text={text}
              info={info}
              name={info?.fieldName}
              onChange={(checked, otherText) => onRadioChange(text, otherText)}
            />
          ))}
        </QuestionOptions>
      )}
    </ReviewContainer>
  );
};

export default SelectType;
