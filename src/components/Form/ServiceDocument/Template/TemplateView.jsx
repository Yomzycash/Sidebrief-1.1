import React, { useState } from "react";
import { ReviewContainer, ReviewTop, ReviewTopLeft, ReviewDocumentName } from "../styled";
import EditDeleteButton from "components/button/EditDeleteButton";

const TemplateView = ({ info, templateNumber, setDisabled, deleteAction, deleteState }) => {
  const [selectedToDelete, setselectedToDelete] = useState();

  let loading = deleteState.isLoading && selectedToDelete?.templateCode === info?.templateCode;

  const handleDeleteTemplate = () => {
    deleteAction(info);
    setselectedToDelete(info);
  };

  const handleEditTemplate = () => {
    setDisabled(false);
  };

  return (
    <ReviewContainer>
      <ReviewTop>
        <ReviewTopLeft>
          <span>Template {templateNumber}</span>
        </ReviewTopLeft>
        <EditDeleteButton
          editAction={handleEditTemplate}
          deleteAction={handleDeleteTemplate}
          deleteLoading={loading}
          hideDelete={!info?.templateLink}
        />
      </ReviewTop>

      <ReviewDocumentName>
        {info?.templateName}
        <span>( {info?.templateLink ? info?.templateLink : "Link not provided"} )</span>
      </ReviewDocumentName>
    </ReviewContainer>
  );
};

export default TemplateView;
