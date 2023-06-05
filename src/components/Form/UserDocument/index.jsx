import React from "react";
import { useState } from "react";
import DocumentEdit from "./DocumentEdit";
import DocumentView from "./DocumentView";

const UserDocument = ({
  index,
  lastQuestion,
  info,
  review,
  handleDocumentAdd,
  handleDocumentDelete,
  handleDocumentUpdate,
  addState,
  updateState,
  deleteState,
  fileLoading,
}) => {
  const [disabled, setDisabled] = useState(review);

  return (
    <>
      {disabled ? (
        <DocumentView
          setDisabled={setDisabled}
          info={info}
          documentNumber={index + 1}
          deleteAction={handleDocumentDelete}
          deleteState={deleteState}
        />
      ) : (
        <DocumentEdit
          handleDocumentAdd={handleDocumentAdd}
          handleDocumentUpdate={handleDocumentUpdate}
          info={info}
          review={review}
          disabled={disabled}
          setDisabled={setDisabled}
          documentNumber={review ? index + 1 : lastQuestion}
          addState={addState}
          updateState={updateState}
          fileLoading={fileLoading}
        />
      )}
    </>
  );
};

export default UserDocument;
