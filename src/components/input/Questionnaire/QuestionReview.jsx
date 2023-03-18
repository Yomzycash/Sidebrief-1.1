import React, { useEffect, useRef, useState } from "react";
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
import EditIcon from "asset/Icons/EditIcon";
import { SpinningCircles } from "react-loading-icons";
import { useDeleteServiceFormFieldMutation } from "services/staffService";

const QuestionReview = ({ info, questionNumber, setDisabled, deleteAction, deleteState }) => {
  const [confirm, setConfirm] = useState(false);
  const [confirmValue, setConfirmValue] = useState("");

  const deleteInputRef = useRef();

  let questionMark = info?.fieldQuestion?.slice(-1) === "?" ? "" : "?";

  let confirmed = confirmValue === "delete";

  const handleDeleteQuestion = () => {
    if (confirmed) {
      deleteAction(info);
      deleteInputRef.current.blur();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleDeleteQuestion();
  };

  useEffect(() => {
    if (confirm) deleteInputRef.current.focus();
  }, [confirm]);

  return (
    <ReviewContainer>
      <ReviewTop>
        <ReviewTopLeft>
          <span>Question {questionNumber}</span>
          {info?.fieldRequired && <span>Compulsory</span>}
        </ReviewTopLeft>
        <ReviewTopRight>
          {confirm === false && (
            <CommonButton
              text="Edit"
              LeftIcon={EditIcon}
              leftIconColor="#0082AA"
              action={() => setDisabled(false)}
            />
          )}
          {confirm === false && (
            <CommonButton
              text="Delete"
              LeftIcon={DeleteIcon}
              leftIconColor="#ed4e3a"
              action={() => setConfirm(true)}
              loading={deleteState.isLoading}
              LoadingIcon={
                <SpinningCircles stroke="#ed4e3a" fill="#ed4e3a" width={20} height={20} />
              }
            />
          )}
          {confirm && (
            <DeleteWrapper>
              <input
                ref={deleteInputRef}
                type="text"
                placeholder="Type DELETE to confirm"
                value={confirmValue}
                onChange={(e) => setConfirmValue(e.target.value.toLowerCase())}
                onBlur={() => setConfirm(false)}
                onKeyDown={handleKeyDown}
              />
              <DeleteIcon
                width={11}
                color={confirmed ? "#ed4e3a" : "#c68181"}
                onMouseDown={handleDeleteQuestion}
              />
            </DeleteWrapper>
          )}
        </ReviewTopRight>
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
