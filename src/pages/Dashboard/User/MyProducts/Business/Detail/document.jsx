import React, { useState, UseEffect } from "react";

import {
  Container,
  TopContainer,
  Left,
  Right,
  DetailWrapper,
  DetailContainer,
  CardContainer,
  Image,
  DocumentContainer,
  DocumentWrapper,
  Title,
  SubText,
  Body,
  Loader,
  EmptyContainer,
} from "./styles";
import { ReactComponent as UploadIcon } from "asset/svg/Upload.svg";
import { useLocation } from "react-router-dom";
// import {completed}  from 'asset/images/completed';
import { CommonButton } from "components/button";
import StaffDocumentModal from "components/modal/StaffDocumentModal";
import KYCFileUpload from "components/FileUpload/KYCFileUpload";
import { handleError } from "utils/globalFunctions";
import { toast } from "react-hot-toast";
import {
  useAddUploadDocumentMutation,
  useDeleteUploadDocumentMutation,
  useUpdateUploadDocumentMutation,
  useViewLaunchRequestQuery,
} from "services/launchService";

const DetailDocument = () => {
  const [open, setOpen] = useState(false);
  const [clickedDocument, setClickedDocument] = useState({});
  const [cardAction, setCardAction] = useState("");
  const { pathname, search } = useLocation();
  const path = pathname.includes("staff");

  //const { data, isLoading, refetch } = useGetUploadDocumentQuery();

  const searchParams = new URLSearchParams(search);
  const launchResponse = {
    launchCode: searchParams.get("launchCode"),
    registrationCountry: searchParams.get("registrationCountry"),
    registrationType: searchParams.get("registrationType"),
  };
  const launchRequest = useViewLaunchRequestQuery(launchResponse);
  console.log(clickedDocument);
  const [updateDocument, updateState] = useUpdateUploadDocumentMutation();
  const [addDocuent, addState] = useAddUploadDocumentMutation();
  const [deleteDocument, deleteState] = useDeleteUploadDocumentMutation();

  const data1 = launchRequest?.data?.businessDocument;

  //   let data = [
  //     {
  //       title: "Passport",
  //       text: "My passport description",
  //     },
  //     {
  //       title: "NIN",
  //       text: "My National Identification Number description ",
  //     },
  //     {
  //       title: "Photo",
  //       text: "Photo description",
  //     },
  //     {
  //       title: "Receipt",
  //       text: "Payment receipt description",
  //     },
  //   ];
  const getRequired = (formData) => {
    return {
      launchCode: searchParams.get("launchCode"),
      documentDetails: {
        documentName: formData?.name,
        documentDescription: formData?.description,
        documentUrl: "http://test.com",
      },
    };
  };

  const handleCardClick = (document) => {
    setCardAction("edit");
    setOpen(true);
    setClickedDocument(document);
  };
  const handleAddButton = () => {
    setOpen(true);
    setCardAction("add");
  };
  // This adds a new entity
  const handleDocumentAdd = async (formData) => {
    let requiredData = getRequired(formData);
    let response = await addDocuent(requiredData);
    let data = response?.data;
    let error = response?.error;
    if (data) {
      toast.success("Document added successfully");
      setOpen(false);
    } else {
      handleError(error);
    }
    // refetch();
  };

  // This updates an existing entity
  const handleDocumentUpdate = async (formData) => {
    let requiredData = getRequired(formData);
    let response = await updateDocument(requiredData);
    let data = response?.data;
    let error = response?.error;
    if (data) {
      toast.success("Document updated successfully");
      setOpen(false);
    } else {
      handleError(error);
    }
    //refetch();
  };

  // This runs when the delete icon is pressed
  const handleDocumentDelete = async (entityInfo) => {
    let response = await deleteDocument(entityInfo);
    let data = response?.data;
    let error = response?.error;
    if (data) {
      toast.success("Document deleted successfully");
      setOpen(false);
    } else {
      handleError(error);
    }
    //refetch();
  };

  return (
    <>
      {path ? (
        <Container>
          <TopContainer>
            <Left>
              <h3>
                {/* <span>
                                <Image src={completed} alt=""/>
                            </span> */}
                Registration Completed
                <span>
                  ({data1?.length} Document{data1?.length === 1 ? "" : "s"} added)
                </span>
              </h3>
              <SubText>
                Your business registration has been successfully completed, you can now upload
                necessary documents.
              </SubText>
            </Left>
            <Right>
              <CommonButton text="Add New Document" action={handleAddButton} />
            </Right>
          </TopContainer>
          {data1?.length === 0 ? (
            <EmptyContainer>
              <h5>No Document Added</h5>
            </EmptyContainer>
          ) : (
            <DocumentContainer>
              {data1?.map((doc, index) => (
                <>
                  <DocumentWrapper key={index} onClick={() => handleCardClick(doc)}>
                    <Title>{doc.documentName}</Title>
                    <SubText> {doc.documentDescription} </SubText>
                    {/* <KYCFileUpload /> */}
                  </DocumentWrapper>
                </>
              ))}
            </DocumentContainer>
          )}
        </Container>
      ) : (
        <Container>
          <CardContainer>
            {data1?.map((doc, index) => (
              <>
                <DocumentWrapper key={index}>
                  <Title>{doc.title}</Title>
                  <SubText> {doc.text} </SubText>
                </DocumentWrapper>
              </>
            ))}
          </CardContainer>
        </Container>
      )}
      <StaffDocumentModal
        disableAll={cardAction === "edit" ? true : false}
        cardAction={cardAction}
        title={cardAction === "edit" ? "Document Information" : "Add New Document"}
        documentInfo={clickedDocument}
        submitAction={cardAction === "edit" ? handleDocumentUpdate : handleDocumentAdd}
        loading={updateState.isLoading || addState.isLoading}
        deleteState={deleteState}
        handleDocumentDelete={handleDocumentDelete}
        setOpen={setOpen}
        open={open}
      />
    </>
  );
};

export default DetailDocument;
