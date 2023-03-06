import KYCFileUpload from "components/FileUpload/KYCFileUpload";
import HeaderCheckout from "components/Header/HeaderCheckout";
import { CheckoutController, CheckoutSection } from "containers";
import LaunchFormContainer from "containers/Checkout/CheckoutFormContainer/LaunchFormContainer";
import LaunchPrimaryContainer from "containers/Checkout/CheckoutFormContainer/LaunchPrimaryContainer";
import React from "react";
import {
  Body,
  Bottom,
  Container,
  ContentWrapper,
  DownLoadText,
  FileContainer,
} from "./style";

const ServiceDownload = () => {
  const requiredDocumet = [
    "NIN Document",
    "Registration Document",
    "Passport Photograph",
    "E-signature",
  ];

  const requiredDownloadDocumet = [
    " Required form_7812520",
    " Required form_7869890",
    " Required form_7965292",
    " Required form_7863490",
  ];

  return (
    <Container>
      <HeaderCheckout getStarted noProgress backToDashBoard />
      <Body>
        <CheckoutSection
          title="Download and fill out the required forms then upload below"
          HeaderParagraph="Download documents"
        />
        <LaunchPrimaryContainer>
          <LaunchFormContainer>
            <FileContainer>
              <ContentWrapper>
                {requiredDownloadDocumet.map((document) => (
                  <KYCFileUpload downloadPage downloadDocumentName={document} />
                ))}
              </ContentWrapper>
              <DownLoadText>Upload the required forms</DownLoadText>
              <ContentWrapper>
                {requiredDocumet.map((document) => (
                  <KYCFileUpload TopText={document} BottomText={document} />
                ))}
                {/* <KYCFileUpload
                  TopText="Required Form"
                  BottomText="National ID Crd"
                />
                <KYCFileUpload
                  TopText="Required Form"
                  BottomText="National ID Crd"
                />
                <KYCFileUpload
                  TopText="Required Form"
                  BottomText="National ID Crd"
                />
                <KYCFileUpload
                  TopText="Required Form"
                  BottomText="National ID Crd"
                /> */}
              </ContentWrapper>
            </FileContainer>
          </LaunchFormContainer>
          <Bottom>
            <CheckoutController
              //   backAction={handlePrev}
              backText={"Previous"}
              //   forwardAction={handleNext}
              forwardText={"Proceed"}
            />
          </Bottom>
        </LaunchPrimaryContainer>
      </Body>
    </Container>
  );
};

export default ServiceDownload;
