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

const ServiceDocuments = () => {
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
                <KYCFileUpload downloadPage />
                <KYCFileUpload downloadPage />
                <KYCFileUpload downloadPage />
                <KYCFileUpload downloadPage />
              </ContentWrapper>
              <DownLoadText>Upload the required forms</DownLoadText>
              <ContentWrapper>
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
                />
                <KYCFileUpload
                  TopText="Required Form"
                  BottomText="National ID Crd"
                />
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

export default ServiceDocuments;
