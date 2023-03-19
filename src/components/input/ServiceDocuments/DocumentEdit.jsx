import React, { useEffect, useReducer } from "react";
import InputWithLabel from "../inputWithLabel";
import CommonButton from "components/button/commonButton";
import { ReactComponent as AddIcon } from "asset/Launch/Add.svg";
import { useActions } from "./actions";
import { initialState, reducer } from "./reducer";
import {
  Document,
  DocumentForm,
  DocumentInfoWrapper,
  DocumentTitle,
  SubmitButtons,
} from "./styled";

const DocumentEdit = ({
  documentNumber,
  review,
  info,
  disabled,
  setDisabled,
  handleDocumentSubmit,
  handleUpdateDocument,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { documentName, documentDescription, nameError, descriptionError, done } = state;

  const { handleDocumentName, handleDocumentDescription, handleSubmit, handleDone, resetFields } =
    useActions({
      state,
      dispatch,
      handleDocumentSubmit,
      handleUpdateDocument,
      review,
    });

  let doneClicked = false;

  // Populates the Documents info
  useEffect(() => {
    if (review && !disabled) {
      dispatch({ type: "setDocumentName", payload: info?.requirementName });
      dispatch({ type: "setDocumentDescription", payload: info?.requirementDescription });
    }
  }, [disabled]);

  return (
    <DocumentForm onSubmit={handleSubmit}>
      {!done && (
        <DocumentInfoWrapper>
          <DocumentTitle>Document {documentNumber}</DocumentTitle>
          <Document>
            <InputWithLabel
              label={`Document Name`}
              placeholder="Enter document name here"
              labelStyle="input-label"
              type="text"
              inputClass="input-class"
              containerStyle="input-container-class"
              value={state.documentName}
              onChange={handleDocumentName}
              errorMessage={nameError}
            />{" "}
            <InputWithLabel
              label="Document Description"
              placeholder="Enter document description here"
              labelStyle="input-label"
              type="text"
              inputClass="input-class"
              containerStyle="input-container-class"
              value={state.documentDescription}
              onChange={handleDocumentDescription}
              errorMessage={descriptionError}
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
            action={() => setDisabled(true)}
          />
        ) : (
          <>
            <CommonButton
              text="Add New Document"
              LeftIcon={AddIcon}
              type={done ? "button" : "submit"}
              action={() => {
                dispatch({ type: "setDone", payload: false });
                resetFields();
              }}
              id="addnew-submit"
            />
            {!done && (
              <CommonButton
                text="Done"
                type={documentDescription || documentName ? "submit" : "button"}
                action={() => (documentDescription || documentName ? "" : handleDone())}
                id="done-submit"
              />
            )}
          </>
        )}
      </SubmitButtons>
    </DocumentForm>
  );
};

export default DocumentEdit;
