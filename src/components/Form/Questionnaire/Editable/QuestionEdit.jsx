import React, { useEffect, useReducer, useRef } from "react";
import InputWithLabel from "components/input/inputWithLabel";
import ToggleButton from "components/input/ToggleButton";
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
} from "../styled";
import CommonButton from "components/button/commonButton";
import Option from "./Option";
import { ReactComponent as AddIcon } from "asset/Launch/Add.svg";
import { useActions } from "./actions";
import { initialState, reducer } from "./reducer";
import { ErrMsg } from "components/input/styled";
import { SpinningCircles } from "react-loading-icons";

const QuestionEdit = ({
  questionNumber,
  review,
  info,
  disabled,
  setDisabled,
  handleQuestionSubmit,
  handleUpdateQuestion,
  addState,
  updateState,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const optionsRef = useRef(null);

  const {
    question,
    required,
    selectedType,
    optionsArray,
    questionError,
    optionsError,
    done,
    doneClicked,
    updateClicked,
  } = state;

  const {
    otherClicked,
    applyActive,
    handleQuestion,
    handleOptionAdd,
    handleOtherAdd,
    focusLastOption,
    handleOptionRemove,
    updateOptionValue,
    handleToggle,
    handleSubmit,
  } = useActions({
    state,
    info,
    dispatch,
    setDisabled,
    handleQuestionSubmit,
    handleUpdateQuestion,
    review,
    optionsRef,
  });

  // Focuses the last option
  useEffect(() => {
    focusLastOption();
  }, [selectedType]);

  // Populates the Question info
  useEffect(() => {
    if (review && !disabled) {
      dispatch({ type: "setQuestion", payload: info?.fieldQuestion });
      dispatch({ type: "setRequired", payload: info?.fieldRequired });
      dispatch({ type: "setSelectedType", payload: info?.fieldType });
      dispatch({ type: "setOptionsArray", payload: info?.fieldOptions });
      dispatch({ type: "setRequired", payload: info?.fieldRequired });
    }
  }, [disabled]);

  // Hides edit instance if there is at least one question
  useEffect(() => {
    if (questionNumber > 1 && !review) {
      dispatch({ type: "setDone", payload: true });
    }
  }, [questionNumber, review]);

  return (
    <QuestionForm onSubmit={handleSubmit}>
      {!done && (
        <QuestionInfoWrapper>
          <Question>
            <InputWithLabel
              label={`Question ${questionNumber}`}
              placeholder="Enter question here"
              labelStyle="input-label"
              type="text"
              inputClass="input-class"
              containerStyle="input-container-class"
              value={state.question}
              onChange={handleQuestion}
              errorMessage={questionError}
            />
            <ToggleWrapper>
              <ToggleButton rightText="Compulsory" checked={required} onChange={handleToggle} />
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
              style={applyActive("textarea")}
              action={() => dispatch({ type: "setSelectedType", payload: "textarea" })}
            />
            <CommonButton
              text="Number"
              style={applyActive("number")}
              action={() => dispatch({ type: "setSelectedType", payload: "number" })}
            />
          </QuestionType>

          {selectedType === "checkbox" && (optionsArray.length > 0 || optionsError) && (
            <QuestionOptions ref={optionsRef}>
              {optionsError && <ErrMsg style={{ left: "24px" }}>{optionsError}</ErrMsg>}
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
              {optionsError && <ErrMsg style={{ left: "24px" }}>{optionsError}</ErrMsg>}
              {optionsArray?.map((text, index) => (
                <Option
                  type="radio"
                  text={text}
                  key={index}
                  index={index}
                  removeAction={() => handleOptionRemove(index)}
                  placeholder={`Enter option ${index + 1}`}
                  updateOptionValue={updateOptionValue}
                  focusLastOption={focusLastOption}
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
          <>
            <CommonButton
              text="Update"
              type="submit"
              id="review-submit"
              action={() => dispatch({ type: "setUpdateClicked", payload: true })}
              loading={updateState.isLoading && updateClicked}
              LoadingIcon={
                <SpinningCircles stroke="#00a2d4" fill="#00a2d4" width={20} height={20} />
              }
            />
            <CommonButton
              text="Cancel"
              type="button"
              id="cancel-submit"
              action={() => setDisabled(true)}
            />
          </>
        ) : (
          <>
            <CommonButton
              text="Add New Question"
              LeftIcon={AddIcon}
              type="submit"
              id="addnew-submit"
            />
            {!done && (
              <CommonButton
                text="Done"
                type="submit"
                action={() => dispatch({ type: "setDoneClicked", payload: true })}
                id="done-submit"
                loading={addState.isLoading && doneClicked}
                LoadingIcon={
                  <SpinningCircles stroke="#00a2d4" fill="#00a2d4" width={20} height={20} />
                }
              />
            )}
          </>
        )}
      </SubmitButtons>
    </QuestionForm>
  );
};

export default QuestionEdit;
