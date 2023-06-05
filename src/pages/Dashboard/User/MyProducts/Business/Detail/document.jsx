import UserDocument from "components/Form/UserDocument";
import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useOutletContext } from "react-router-dom";
import {
  useAddLaunchDocumentMutation,
  useDeleteLaunchDocumentMutation,
  useGetLaunchDocumentsQuery,
  useUpdateLaunchDocumentMutation,
} from "services/launchService";
import { checkStaffEmail, handleError, handleResponse } from "utils/globalFunctions";
import { convertToLink } from "utils/LaunchHelper";
import { DocumentDescription, DocumentsContainer, DocumentsWrapper, DocumentTitle } from "./styles";
import CheckIcon from "asset/Icons/CheckIcon.svg";

const RegistrationDocument = () => {
  const [fileLoading, setFileLoading] = useState(false);

  const { data } = useOutletContext();
  const launchCode = data?.launchCode;

  const [addLaunchDocument, addState] = useAddLaunchDocumentMutation();
  const [updateLaunchDocument, updateState] = useUpdateLaunchDocumentMutation();
  const [deleteLaunchDocument, deleteState] = useDeleteLaunchDocumentMutation();
  const document = useGetLaunchDocumentsQuery(launchCode);

  //
  // Adds a new document
  const handleDocumentAdd = async (formInfo) => {
    const realFile = formInfo.docFile[0];

    setFileLoading(true);
    const uploadedFile = await convertToLink(realFile);
    setFileLoading(false);

    if (!uploadedFile?.url) {
      toast.error("Could not upload file");
      return;
    }

    const payload = {
      launchCode,
      documentDetails: {
        documentName: formInfo.documentName,
        documentDescription: formInfo.documentDescription,
        documentUrl: uploadedFile.url,
        fileName: realFile.name,
        fileType: realFile.type,
      },
    };

    const response = await addLaunchDocument(payload);
    const data = response?.data;
    const error = response?.error;
    if (data) {
      handleResponse(response, "Document added successfully", document.refetch());
      return true;
    }
    handleError(error);
  };

  //
  // Update an existing document
  const handleDocumentUpdate = async (formInfo) => {
    const realFile = formInfo.docFile[0];

    setFileLoading(true);
    const uploadedFile =
      realFile?.name && realFile?.size
        ? await convertToLink(realFile)
        : { url: formInfo.documentUrl };
    setFileLoading(false);

    if (!uploadedFile?.url) {
      toast.error("Could not upload file");
      return;
    }

    const payload = {
      launchCode,
      documentCode: formInfo.documentCode,
      documentDetails: {
        documentName: formInfo.documentName,
        documentDescription: formInfo.documentDescription,
        documentUrl: uploadedFile?.url,
        fileName: realFile?.name || formInfo.fileName,
        fileType: realFile?.type || formInfo.fileType,
      },
    };

    const response = await updateLaunchDocument(payload);
    const data = response?.data;
    const error = response?.error;
    if (data) {
      handleResponse(response, "Document updated successfully", document.refetch());
      return true;
    }
    handleError(error);
  };

  //
  // Deletes a document
  const handleDocumentDelete = async (formInfo) => {
    const payload = {
      launchCode,
      documentCode: formInfo.documentCode,
    };

    const response = await deleteLaunchDocument(payload);
    const data = response?.data;
    const error = response?.error;
    if (data) {
      handleResponse(response, "Document deleted successfully", document.refetch());
      return true;
    }
    handleError(error);
  };

  const isStaff = checkStaffEmail(localStorage.getItem("userEmail"));

  return (
    <DocumentsContainer>
      <DocumentTitle>
        <img src={CheckIcon} alt="" />
        <p>Registration Completed</p>
      </DocumentTitle>
      <DocumentDescription>
        Your registration has been completed, and your documents are now available for download.
      </DocumentDescription>
      <DocumentsWrapper>
        {document.data?.data?.map((el, i) => (
          <UserDocument
            key={i}
            index={i}
            addState={addState}
            updateState={updateState}
            handleDocumentAdd={handleDocumentAdd}
            handleDocumentUpdate={handleDocumentUpdate}
            handleDocumentDelete={handleDocumentDelete}
            info={el}
            review={true}
            deleteState={deleteState}
            fileLoading={fileLoading}
          />
        ))}
        {isStaff && (
          <UserDocument
            addState={addState}
            updateState={updateState}
            handleDocumentAdd={handleDocumentAdd}
            handleDocumentUpdate={handleDocumentUpdate}
            handleDocumentDelete={handleDocumentDelete}
            info={document.data}
            review={false}
            fileLoading={fileLoading}
          />
        )}
      </DocumentsWrapper>
    </DocumentsContainer>
  );
};

export default RegistrationDocument;
