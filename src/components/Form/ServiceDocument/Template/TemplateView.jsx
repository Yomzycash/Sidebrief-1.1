import React, { useEffect, useRef, useState } from "react";
import {
  DeleteWrapper,
  ReviewContainer,
  ReviewTop,
  ReviewTopLeft,
  ReviewTopRight,
  ReviewDocumentName,
} from "../styled";
import CommonButton from "components/button/commonButton";
import DeleteIcon from "asset/Icons/DeleteIcon";
import EditIcon from "asset/Icons/EditIcon";
import { SpinningCircles } from "react-loading-icons";

const TemplateView = ({ info, templateNumber, setDisabled, deleteAction, deleteState }) => {
  const [confirm, setConfirm] = useState(false);
  const [confirmValue, setConfirmValue] = useState("");
  const [selectedToDelete, setselectedToDelete] = useState();

  const deleteInputRef = useRef();

  let confirmed = confirmValue === "delete";
  let loading = deleteState.isLoading && selectedToDelete?.templateCode === info?.templateCode;

  const handleDeleteQuestion = () => {
    if (confirmed) {
      deleteAction(info);
      setselectedToDelete(info);
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
          <span>Template {templateNumber}</span>
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
        {info?.templateName}
        {info?.templateLink && <span>( {info?.templateLink} )</span>}
      </ReviewDocumentName>
    </ReviewContainer>
  );
};

export default TemplateView;
