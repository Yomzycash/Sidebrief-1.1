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

  // Set previous answer to the state.
  useEffect(() => {
    if (info?.fieldAnswer) setCheckList(info?.fieldAnswer);
  }, [info?.fieldAnswer]);

  let questionMark = info?.fieldQuestion?.slice(-1) === "?" ? "" : "?";

  //
  const onRadioChange = (text) => {
    console.log(text);
    handleRadioSelect(text, info?.fieldName);
  };

  // Appends/Removes the text of the selected answer to/from the answers list array.
  const onCheckboxChange = (checked, text) => {
    console.log(checked, text);
    if (checked) {
      let list = checkList;
      if (checkIfOther(text)) {
        list = list.filter((el) => normalize(el) !== "other");
      }
      list = list.filter((el) => normalize(el) !== normalize(text));
      list = [...list, text];
      console.log(list);
      setCheckList(list);
      handleCheckboxSelect(list, info?.fieldName);
    } else {
      let list = checkList;
      if (checkIfOther(text)) {
        list = list.filter((el) => info?.fieldOptions?.find((val) => val === el));
      }

      list = list.filter((el) => el !== text);
      console.log(list);
      setCheckList(list);
      handleCheckboxSelect(list, info?.fieldName);
    }
  };

  const checkIfOther = (text) => {
    let isOther =
      !info?.fieldOptions?.find((el) => normalize(el) === normalize(text)) ||
      normalize(text) === "other";
    return isOther ? text : false;
  };

  const normalize = (text) => {
    return text?.toLowerCase()?.trim();
  };

  const checkboxFieldAnswers = (info?.fieldType === "checkbox" ? info?.fieldAnswer : []) || [];
  const checkboxOtherAnswer = checkboxFieldAnswers?.find((el) => checkIfOther(el));

  const radioFieldAnswer = info?.fieldType === "radio" ? info?.fieldAnswer : "";
  const radioOtherAnswer = checkIfOther(radioFieldAnswer);

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
              onChange={(checked, otherText) => onCheckboxChange(checked, otherText || text)}
              fieldAnswer={checkboxFieldAnswers}
              otherFieldAnswer={checkboxOtherAnswer}
              normalize={normalize}
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
              onChange={(checked, otherText) => onRadioChange(otherText || text)}
              fieldAnswer={radioFieldAnswer}
              otherFieldAnswer={radioOtherAnswer}
              normalize={normalize}
            />
          ))}
        </QuestionOptions>
      )}
    </ReviewContainer>
  );
};

export default SelectType;
