import React, { useEffect, useRef, useState } from "react";
import CommonButton from "../commonButton";
import { Container, DeleteWrapper } from "./styled";
import EditIcon from "asset/Icons/EditIcon";
import { SpinningCircles } from "react-loading-icons";
import DeleteIcon from "asset/Icons/DeleteIcon";

const EditDeleteButton = ({ editAction, deleteAction, deleteLoading, hideEdit, hideDelete }) => {
  const [confirm, setConfirm] = useState(false);
  const [confirmValue, setConfirmValue] = useState("");

  const deleteInputRef = useRef();
  let confirmed = confirmValue === "delete";

  const handleDeleteQuestion = () => {
    if (confirmed) {
      deleteAction();
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
    <Container>
      {confirm ? (
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
      ) : (
        <>
          {!hideEdit && (
            <CommonButton
              text="Edit"
              LeftIcon={EditIcon}
              leftIconColor="#0082AA"
              action={editAction}
            />
          )}
          {!hideDelete && (
            <CommonButton
              text="Delete"
              LeftIcon={DeleteIcon}
              leftIconColor="#ed4e3a"
              action={() => setConfirm(true)}
              loading={deleteLoading}
              LoadingIcon={
                <SpinningCircles
                  stroke="#ed4e3a"
                  fill="#ed4e3a"
                  width={20}
                  height={20}
                  style={{ paddingBlock: "4px", boxSizing: "content-box" }}
                />
              }
            />
          )}
        </>
      )}
    </Container>
  );
};

export default EditDeleteButton;
