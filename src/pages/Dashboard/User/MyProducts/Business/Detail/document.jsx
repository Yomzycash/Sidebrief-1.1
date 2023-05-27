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
  Download,
} from "./styles";
import { ReactComponent as UploadIcon } from "asset/svg/Upload.svg";
import { useLocation } from "react-router-dom";
// import {completed}  from 'asset/images/completed';
import { CommonButton } from "components/button";
import StaffDocumentModal from "components/modal/StaffDocumentModal";

import { useViewLaunchRequestQuery } from "services/launchService";
import { downLoadImage } from "utils/staffHelper";
import { ReactComponent as DownloadWhite } from "asset/svg/DownloadWhite.svg";

const DetailDocument = () => {
  const [open, setOpen] = useState(false);
  const [clickedDocument, setClickedDocument] = useState({});
  const [cardAction, setCardAction] = useState("");
  const { pathname, search } = useLocation();
  const path = pathname.includes("staff");

  const searchParams = new URLSearchParams(search);
  const launchResponse = {
    launchCode: searchParams.get("launchCode"),
    registrationCountry: searchParams.get("registrationCountry"),
    registrationType: searchParams.get("registrationType"),
  };
  const launchRequest = useViewLaunchRequestQuery(launchResponse);
  console.log(launchRequest);

  const data1 = launchRequest?.data?.businessDocument;

  const handleCardClick = (document) => {
    setCardAction("edit");
    setOpen(true);
    setClickedDocument(document);
  };
  const handleAddButton = () => {
    setOpen(true);
    setCardAction("add");
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
                    <Title>{doc?.documentName}</Title>
                    <SubText> {doc?.documentDescription} </SubText>
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
                <DocumentWrapper
                  key={index}
                  onClick={async () => {
                    await downLoadImage(doc?.documentUrl, doc?.documentName);
                  }}
                >
                  <Title>{doc?.documentName}</Title>
                  <SubText> {doc?.documentDescription} </SubText>
                </DocumentWrapper>
                {/* <Download
                  
                  type="button"
                >
                  <DownloadWhite />
                </Download> */}
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
        setOpen={setOpen}
        open={open}
      />
    </>
  );
};

export default DetailDocument;
