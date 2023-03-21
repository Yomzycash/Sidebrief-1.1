import React, { useState } from "react";
import {
  DeleteWrapper,
  QuestionOptions,
  ReviewContainer,
  ReviewQuestion,
  ReviewTop,
  ReviewTopLeft,
  ReviewTopRight,
} from "./stylex";
import CommonButton from "components/button/commonButton";
import Option from "./Option";
import DeleteIcon from "asset/Icons/DeleteIcon";
import { ReactComponent as EditIcon } from "asset/svg/Edit.svg";
import { SpinningCircles } from "react-loading-icons";
import { useDeleteServiceFormFieldMutation } from "services/staffService";

const QuestionReview = ({
  setDisabled,
  questionType = "checkbox",
  optionsArray = [
    "What is your name?",
    "What is your DOB?",
    "What service do you want",
    "Are you a womanizer?",
  ],
}) => {
  const [confirm, setConfirm] = useState(false);
  const [confirmValue, setConfirmValue] = useState("");

  const [deleteFormField, deleteState] = useDeleteServiceFormFieldMutation();

  const handleDeleteQuestion = () => {};

  return (
    <ReviewContainer>
      <ReviewTop>
        <ReviewTopLeft>
          <span>Question</span>
          <span>Compulsory</span>
        </ReviewTopLeft>
        <ReviewTopRight>
          {confirm === false && (
            <CommonButton text="Edit" LeftIcon={EditIcon} action={() => setDisabled(false)} />
          )}
          {confirm === false && (
            <CommonButton
              text="Delete"
              LeftIcon={DeleteIcon}
              leftIconColor="#ed4e3a"
              action={() => setConfirm(true)}
            />
          )}
          {confirm && (
            <DeleteWrapper>
              <input
                type="text"
                placeholder="Type DELETE to confirm"
                onChange={(e) => setConfirmValue(e.target.value.toLowerCase())}
              />
              {deleteState?.isLoading ? (
                <SpinningCircles stroke="#ed4e3a" fill="#ed4e3a" width={20} height={20} />
              ) : (
                <DeleteIcon
                  width={11}
                  color={confirmValue === "delete" || confirm === false ? "#ed4e3a" : "#c68181"}
                  onClick={handleDeleteQuestion}
                />
              )}
            </DeleteWrapper>
          )}
        </ReviewTopRight>
      </ReviewTop>

      <ReviewQuestion>Which of these is the largest in Nigeria?</ReviewQuestion>

      {questionType === "checkbox" && (
        <QuestionOptions>
          {optionsArray?.map((text, index) => (
            <Option key={index} type="checkbox" text={text} disable={true} />
          ))}
        </QuestionOptions>
      )}

      {questionType === "radio" && (
        <QuestionOptions>
          {optionsArray?.map((text, index) => (
            <Option key={index} type="radio" text={text} disable={true} />
          ))}
        </QuestionOptions>
      )}
    </ReviewContainer>
  );
};

export default QuestionReview;
