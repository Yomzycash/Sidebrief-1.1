import React from "react";
import { useState } from "react";
import TemplateView from "./TemplateView";
import TemplateEdit from "./TemplateEdit";

const ServiceDocumentTemplate = ({
  index,
  lastTemplate,
  info,
  review,
  handleTemplateSubmit,
  handleDeleteTemplate,
  handleUpdateTemplate,
  addState,
  updateState,
  deleteState,
}) => {
  const [disabled, setDisabled] = useState(info?.templateLink);

  return (
    <>
      {disabled ? (
        <TemplateView
          setDisabled={setDisabled}
          info={info}
          templateNumber={index + 1}
          deleteAction={handleDeleteTemplate}
          deleteState={deleteState}
        />
      ) : (
        <TemplateEdit
          handleTemplateSubmit={handleTemplateSubmit}
          handleUpdateTemplate={handleUpdateTemplate}
          info={info}
          review={review}
          disabled={disabled}
          setDisabled={setDisabled}
          templateNumber={review ? index + 1 : lastTemplate}
          addState={addState}
          updateState={updateState}
        />
      )}
    </>
  );
};

export default ServiceDocumentTemplate;
