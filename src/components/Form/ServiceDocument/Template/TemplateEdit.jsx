import React, { useEffect, useReducer } from "react";
import CommonButton from "components/button/commonButton";
import InputWithLabel from "components/input/inputWithLabel";
import { ReactComponent as AddIcon } from "asset/Launch/Add.svg";
import { useActions } from "./actions";
import { initialState, reducer } from "./reducer";
import {
  Document,
  DocumentForm,
  DocumentInfoWrapper,
  DocumentTitle,
  SubmitButtons,
} from "../styled";
import { SpinningCircles } from "react-loading-icons";
import { MdClear } from "react-icons/md";

const TemplateEdit = ({
  templateNumber,
  review,
  info,
  disabled,
  setDisabled,
  handleTemplateSubmit,
  handleUpdateTemplate,
  addState,
  updateState,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { templateLink, nameError, linkError, done } = state;

  const { handleTemplateName, handleTemplateLink, handleSubmit } = useActions({
    state,
    info,
    dispatch,
    setDisabled,
    handleTemplateSubmit,
    handleUpdateTemplate,
    review,
  });

  // Populates the Templates info
  useEffect(() => {
    dispatch({ type: "setTemplateName", payload: info?.templateName });
    dispatch({ type: "setTemplateLink", payload: info?.templateLink });
  }, [disabled, info]);

  return (
    <DocumentForm onSubmit={handleSubmit}>
      {!done && (
        <DocumentInfoWrapper>
          <DocumentTitle>Template {templateNumber}</DocumentTitle>
          <Document>
            <InputWithLabel
              label={`Template Name`}
              placeholder="Enter template name here"
              labelStyle="input-label"
              type="text"
              inputClass="input-class-1"
              containerStyle="input-container-class"
              value={state.templateName}
              onChange={handleTemplateName}
              errorMessage={nameError}
              disabled
            />{" "}
            <InputWithLabel
              label="Template Link"
              placeholder="https://res.cloudinary.com/soss/image/upload/..."
              labelStyle="input-label"
              type="text"
              inputClass="input-class"
              containerStyle="input-container-class"
              value={state.templateLink}
              onChange={handleTemplateLink}
              errorMessage={linkError}
            />
          </Document>
        </DocumentInfoWrapper>
      )}

      <SubmitButtons style={{ maxWidth: "300px" }}>
        <CommonButton
          text={info?.templateLink ? "Update Link" : "Add Link"}
          type="submit"
          id="done-submit"
          loading={addState?.isLoading || updateState.isLoading}
          LoadingIcon={<SpinningCircles stroke="#00a2d4" fill="#00a2d4" width={20} height={20} />}
        />
        <CommonButton
          text={info?.templateLink ? "Cancel" : "No Template"}
          LeftIcon={!info?.templateLink ? MdClear : ""}
          leftIconColor="#00a2d4"
          type="button"
          id="addnew-submit"
          action={() => setDisabled(true)}
        />
      </SubmitButtons>
    </DocumentForm>
  );
};

export default TemplateEdit;
