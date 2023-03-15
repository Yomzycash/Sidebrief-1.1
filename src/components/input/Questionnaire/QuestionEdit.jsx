import React, { useEffect, useReducer, useRef } from "react";
import InputWithLabel from "../inputWithLabel";
import ToggleButton from "../ToggleButton";
import {
  AddOption,
  Question,
  QuestionForm,
  QuestionOptions,
  QuestionType,
  AddOptionButton,
  ToggleWrapper,
  QuestionInfoWrapper,
  SubmitButtons,
} from "./stylex";
import CommonButton from "components/button/commonButton";
import Option from "./Option";
import { ReactComponent as AddIcon } from "asset/Launch/Add.svg";
import { useActions } from "./actions";
import { initialState, reducer } from "./reducer";
import { ErrMsg } from "../styled";

const QuestionEdit = ({ questionNumber, review, info, setDisabled, handleQuestionSubmit }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const optionsRef = useRef(null);

  const { selectedType, optionsArray, questionError, optionsError, done } = state;

  // const { fieldCode, fieldName, fieldOptions, fieldQuestion, fieldRequired, fieldType } = info;

  const {
    otherClicked,
    applyActive,
    handleQuestion,
    handleOptionAdd,
    handleOtherAdd,
    handleOptionRemove,
    updateOptionValue,
    handleToggle,
    handleSubmit,
    handleDone,
  } = useActions({ state, dispatch, handleQuestionSubmit, review });

  // Focuses the last option
  useEffect(() => {
    let lastIndex = optionsArray.length - 1;
    if (lastIndex < 0) return;
    if (selectedType === "checkbox" || selectedType === "radio")
      optionsRef.current?.childNodes[lastIndex + 1]?.childNodes[1].focus();
  }, [optionsArray, selectedType]);

  let hideFormView = !done || questionError || optionsError;

  return (
    <QuestionForm onSubmit={handleSubmit}>
      {hideFormView && (
        <QuestionInfoWrapper>
          <Question>
            <InputWithLabel
              label={`Question ${questionNumber}`}
              placeholder="Enter question here"
              labelStyle="input-label"
              type="text"
              name="name"
              inputClass="input-class"
              containerStyle="input-container-class"
              onChange={handleQuestion}
              errorMessage={questionError}
            />
            <ToggleWrapper>
              <ToggleButton rightText="Compulsory" name="toggle-button" onChange={handleToggle} />
            </ToggleWrapper>
          </Question>

          <QuestionType>
            <CommonButton
              text="Multi-choice"
              style={applyActive("checkbox")}
              action={() => dispatch({ type: "setSelectedType", payload: "checkbox" })}
            />
            <CommonButton
              text="Single choice"
              style={applyActive("radio")}
              action={() => dispatch({ type: "setSelectedType", payload: "radio" })}
            />
            <CommonButton
              text="Short text"
              style={applyActive("input")}
              action={() => dispatch({ type: "setSelectedType", payload: "input" })}
            />
            <CommonButton
              text="Paragraph"
              style={applyActive("text-area")}
              action={() => dispatch({ type: "setSelectedType", payload: "text-area" })}
            />
            <CommonButton
              text="Number"
              style={applyActive("number")}
              action={() => dispatch({ type: "setSelectedType", payload: "number" })}
            />
          </QuestionType>

          {selectedType === "checkbox" && (optionsArray.length > 0 || optionsError) && (
            <QuestionOptions ref={optionsRef}>
              <ErrMsg style={{ left: "24px" }}>{optionsError}</ErrMsg>
              {optionsArray?.map((text, index) => (
                <Option
                  type="checkbox"
                  text={text}
                  error
                  key={index}
                  index={index}
                  removeAction={() => handleOptionRemove(index)}
                  placeholder={`Enter option ${index + 1}`}
                  updateOptionValue={updateOptionValue}
                />
              ))}
            </QuestionOptions>
          )}

          {selectedType === "radio" && (optionsArray.length > 0 || optionsError) && (
            <QuestionOptions ref={optionsRef}>
              <ErrMsg style={{ left: "24px" }}>{optionsError}</ErrMsg>
              {optionsArray?.map((text, index) => (
                <Option
                  type="radio"
                  text={text}
                  key={index}
                  index={index}
                  removeAction={() => handleOptionRemove(index)}
                  placeholder={`Enter option ${index + 1}`}
                  updateOptionValue={updateOptionValue}
                />
              ))}
            </QuestionOptions>
          )}

          {(selectedType === "checkbox" || selectedType === "radio") && (
            <AddOption $disable={otherClicked}>
              <AddOptionButton onClick={handleOptionAdd} disabled={otherClicked}>
                Add option
              </AddOptionButton>{" "}
              or{" "}
              <AddOptionButton
                onClick={handleOtherAdd}
                disabled={otherClicked || optionsArray.length < 1}
              >
                Add other
              </AddOptionButton>
            </AddOption>
          )}
        </QuestionInfoWrapper>
      )}

      <SubmitButtons>
        {review ? (
          <CommonButton text="Update" type="submit" id="review-submit" />
        ) : (
          <>
            <CommonButton
              text="Add New Question"
              LeftIcon={AddIcon}
              type={done ? "button" : "submit"}
              action={() => dispatch({ type: "setDone", payload: false })}
              id="addnew-submit"
            />
            {hideFormView && <CommonButton text="Done" type="submit" id="done-submit" />}
          </>
        )}
      </SubmitButtons>
    </QuestionForm>
  );
};

export default QuestionEdit;
