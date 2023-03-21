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

  const { templateName, templateLink, nameError, linkError, done, doneClicked, updateClicked } =
    state;

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
    if (review && !disabled) {
      dispatch({ type: "setTemplateName", payload: info?.templateName });
      dispatch({ type: "setTemplateLink", payload: info?.templateLink });
    }
  }, [disabled]);

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
              inputClass="input-class"
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

      <SubmitButtons>
        {review ? (
          <CommonButton
            text="Update"
            type="submit"
            id="review-submit"
            action={() => dispatch({ type: "setUpdateClicked", payload: true })}
            loading={updateState?.isLoading && updateClicked}
            LoadingIcon={<SpinningCircles stroke="#00a2d4" fill="#00a2d4" width={20} height={20} />}
          />
        ) : (
          <>
            <CommonButton
              text="Add New Template"
              LeftIcon={AddIcon}
              type="submit"
              id="addnew-submit"
            />
            {!done && (
              <CommonButton
                text="Done"
                type="submit"
                action={() => dispatch({ type: "setDoneClicked", payload: true })}
                id="done-submit"
                loading={addState?.isLoading && doneClicked}
                LoadingIcon={
                  <SpinningCircles stroke="#00a2d4" fill="#00a2d4" width={20} height={20} />
                }
              />
            )}
          </>
        )}
      </SubmitButtons>
    </DocumentForm>
  );
};

export default TemplateEdit;
