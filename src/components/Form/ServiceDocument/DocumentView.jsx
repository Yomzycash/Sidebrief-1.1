import React, { useState } from "react";
import { ReviewContainer, ReviewTop, ReviewTopLeft, ReviewDocumentName } from "./styled";
import EditDeleteButton from "components/button/EditDeleteButton";

const DocumentView = ({ info, documentNumber, setDisabled, deleteAction, deleteState }) => {
  const [selectedToDelete, setselectedToDelete] = useState();

  let loading =
    deleteState.isLoading && selectedToDelete?.requirementCode === info?.requirementCode;

  const handleDeleteDocument = () => {
    deleteAction(info);
    setselectedToDelete(info);
  };

  const handleEditQuestion = () => {
    setDisabled(false);
  };

  return (
    <ReviewContainer>
      <ReviewTop>
        <ReviewTopLeft>
          <span>Document {documentNumber}</span>
        </ReviewTopLeft>
        <EditDeleteButton
          editAction={handleEditQuestion}
          deleteAction={handleDeleteDocument}
          deleteLoading={loading}
        />
      </ReviewTop>

      <ReviewDocumentName>
        {info?.requirementName}
        {info?.requirementDescription && <span>( {info?.requirementDescription} )</span>}
      </ReviewDocumentName>
    </ReviewContainer>
  );
};

export default DocumentView;
