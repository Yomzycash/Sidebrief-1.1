import React, { useEffect, useRef, useState } from "react";
import { DeleteWrapper, ReviewContainer, ReviewTop, ReviewTopLeft, ReviewTopRight } from "./styled";
import CommonButton from "components/button/commonButton";
import DeleteIcon from "asset/Icons/DeleteIcon";
import EditIcon from "asset/Icons/EditIcon";
import { SpinningCircles } from "react-loading-icons";
import { ReviewDocumentDescription, ReviewDocumentName } from "./styled";

const DocumentView = ({ info, documentNumber, setDisabled, deleteAction, deleteState }) => {
  const [confirm, setConfirm] = useState(false);
  const [confirmValue, setConfirmValue] = useState("");

  const deleteInputRef = useRef();

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
          <span>Document {documentNumber}</span>
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

      <ReviewDocumentName>
        {info?.requirementName}
        {info?.requirementDescription && <span>( {info?.requirementDescription} )</span>}
      </ReviewDocumentName>
    </ReviewContainer>
  );
};

export default DocumentView;
