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
} from "./styled";
import { SpinningCircles } from "react-loading-icons";

const DocumentEdit = ({
  documentNumber,
  review,
  info,
  disabled,
  setDisabled,
  handleDocumentSubmit,
  handleUpdateDocument,
  addState,
  updateState,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { nameError, descriptionError, done, doneClicked, updateClicked } = state;

  const { handleDocumentName, handleDocumentDescription, handleSubmit } = useActions({
    state,
    info,
    dispatch,
    setDisabled,
    handleDocumentSubmit,
    handleUpdateDocument,
    review,
  });

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
          <>
            <CommonButton
              text="Update"
              type="submit"
              id="review-submit"
              action={() => dispatch({ type: "setUpdateClicked", payload: true })}
              loading={updateState.isLoading && updateClicked}
              LoadingIcon={
                <SpinningCircles stroke="#00a2d4" fill="#00a2d4" width={20} height={20} />
              }
            />
            <CommonButton
              text="Cancel"
              type="button"
              id="cancel-submit"
              action={() => setDisabled(true)}
            />
          </>
        ) : (
          <>
            <CommonButton
              text="Add New Document"
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
                loading={addState.isLoading && doneClicked}
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

export default DocumentEdit;
