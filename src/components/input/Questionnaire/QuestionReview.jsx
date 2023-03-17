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

  const handleDeleteQuestion = () => {
    deleteAction(info?.fieldCode);
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
            />
          )}
          {confirm && (
            <DeleteWrapper>
              <input
                ref={deleteInputRef}
                type="text"
                placeholder="Type DELETE to confirm"
                onChange={(e) => setConfirmValue(e.target.value.toLowerCase())}
                onBlur={() => setConfirm(false)}
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
