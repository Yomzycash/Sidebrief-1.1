import { yupResolver } from "@hookform/resolvers/yup";
import { CommonButton } from "components/button";
import { InputWithLabel } from "components/input";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { SpinningCircles } from "react-loading-icons";
import { launchDocumentSchema } from "./constants";
import {
  DocumentErrorLabel,
  DocumentFile,
  DocumentForm,
  documentStyle,
  FieldsWrapper,
  SubmitButtons,
} from "./styled";
import { ReactComponent as AddIcon } from "asset/Launch/Add.svg";
import { v4 as uuidv4 } from "uuid";
import { Upload } from "components/File";
import { useState } from "react";

const DocumentEdit = ({
  review,
  addState,
  updateState,
  info,
  handleDocumentAdd,
  handleDocumentUpdate,
  setDisabled,
  fileLoading,
}) => {
  const [doneClicked, setDoneClicked] = useState(false);
  const [done, setDone] = useState(false);
  const [resetFile, setResetFile] = useState(false);

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(launchDocumentSchema),
  });

  //
  const submitForm = async (formInfo) => {
    if (review) {
      const res = await handleDocumentUpdate({ ...info, ...formInfo });
      if (res) setDisabled(true);
      return;
    }
    const res = await handleDocumentAdd(formInfo);
    if (res) {
      reset();
      setResetFile(true);
      if (doneClicked) setDone(true);
    }
  };

  //
  const handleDocumentChange = (docType, file) => {
    setValue("docFile", file);
  };

  //
  const deleteDocument = () => {
    setValue("docFile", []);
  };

  //
  const handleDone = () => {
    setDoneClicked(true);
    const formValues = getValues();
    if (!formValues?.documentName && !formValues?.documentDescription) setDone(true);
  };

  // Populates the Document info
  useEffect(() => {
    if (review) {
      setValue("documentName", info?.documentName);
      setValue("documentDescription", info?.documentDescription);
      setValue("docFile", [{ fileName: info?.fileName }]);
    }
  }, []);

  const documentNameId = uuidv4();
  const docDescId = uuidv4();
  const docLinkId = uuidv4();

  return (
    <DocumentForm onSubmit={handleSubmit(submitForm)} style={{ height: done ? "max-content" : "" }}>
      {!done && (
        <FieldsWrapper>
          <InputWithLabel
            label="Document Name"
            placeholder="CAC Registration Receipt"
            name="documentName"
            containerStyle="checkoutInput"
            labelStyle="checkoutInputLabel"
            type="text"
            register={register}
            errorMessage={errors.documentName?.message}
            inputId={documentNameId}
            nextElementId={docDescId}
          />
          <InputWithLabel
            label="Document Description"
            placeholder="CAC Registration Receipt"
            name="documentDescription"
            containerStyle="checkoutInput"
            labelStyle="checkoutInputLabel"
            type="text"
            register={register}
            errorMessage={errors.documentDescription?.message}
            inputId={docDescId}
            nextElementId={docLinkId}
          />
          <DocumentFile>
            <DocumentErrorLabel>{errors.docFile?.message}</DocumentErrorLabel>
            <Upload
              docType=""
              uploadAction={handleDocumentChange}
              deleteAction={deleteDocument}
              oldFile={
                info ? { name: info.fileName, code: info.documentCode } : { name: "", code: "" }
              }
              containerStyle={documentStyle}
              reset={resetFile}
            />
          </DocumentFile>
        </FieldsWrapper>
      )}

      <SubmitButtons>
        {review ? (
          <>
            <CommonButton
              text="Update"
              type="submit"
              id="review-submit"
              loading={updateState.isLoading || fileLoading}
              LoadingIcon={
                <SpinningCircles stroke="#00a2d4" fill="#00a2d4" width={20} height={20} />
              }
            />
            <CommonButton
              text="Cancel"
              type="button"
              id="cancel-submit"
              action={() => {
                setDisabled(true);
              }}
            />
          </>
        ) : (
          <>
            <CommonButton
              text="Add New Document"
              LeftIcon={AddIcon}
              type={done ? "button" : "submit"}
              id="addnew-submit"
              action={() => {
                setDoneClicked(false);
                setDone(false);
              }}
            />
            {!done && (
              <CommonButton
                text="Done"
                type="submit"
                id="done-submit"
                loading={(addState.isLoading || fileLoading) && doneClicked}
                LoadingIcon={
                  <SpinningCircles stroke="#00a2d4" fill="#00a2d4" width={20} height={20} />
                }
                action={handleDone}
              />
            )}
          </>
        )}
      </SubmitButtons>
    </DocumentForm>
  );
};

export default DocumentEdit;
