import React from "react";
import { useState } from "react";
import DocumentView from "./DocumentView";
import DocumentEdit from "./DocumentEdit";

const ServiceDocument = ({
  index,
  lastDocument,
  info,
  review,
  handleDocumentSubmit,
  handleDeleteDocument,
  handleUpdateDocument,
  addState,
  updateState,
  deleteState,
}) => {
  const [disabled, setDisabled] = useState(review);

  return (
    <>
      {disabled ? (
        <DocumentView
          setDisabled={setDisabled}
          info={info}
          documentNumber={index + 1}
          deleteAction={handleDeleteDocument}
          deleteState={deleteState}
        />
      ) : (
        <DocumentEdit
          handleDocumentSubmit={handleDocumentSubmit}
          handleUpdateDocument={handleUpdateDocument}
          info={info}
          review={review}
          disabled={disabled}
          setDisabled={setDisabled}
          documentNumber={review ? index + 1 : lastDocument}
          addState={addState}
          updateState={updateState}
        />
      )}
    </>
  );
};

export default ServiceDocument;
