import KYCFileUpload from "components/FileUpload/KYCFileUpload";
import ServicesCheckoutHeader from "components/Header/ServicesCheckoutHeader";
import { CheckoutController, CheckoutSection } from "containers";
import LaunchFormContainer from "containers/Checkout/CheckoutFormContainer/LaunchFormContainer";
import LaunchPrimaryContainer from "containers/Checkout/CheckoutFormContainer/LaunchPrimaryContainer";
import React, { useEffect } from "react";
import { Body, Bottom, Container, ContentWrapper, DownLoadText, FileContainer } from "./style";
import { useNavigate } from "react-router-dom";
import { store } from "redux/Store";
import { setServiceCheckoutProgress } from "redux/Slices";

const ServiceDocuments = () => {
  const navigate = useNavigate();

  const handlePrev = () => {
    navigate(-1);
  };

  const handleNext = () => {
    navigate("/services/review/info");
  };

  // Set the progress of the application
  useEffect(() => {
    store.dispatch(setServiceCheckoutProgress({ total: 4, current: 3 })); // total- total pages and current - current page
  }, []);

  return (
    <Container>
      <ServicesCheckoutHeader />

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
                <KYCFileUpload TopText="Required Form" BottomText="National ID Crd" />
                <KYCFileUpload TopText="Required Form" BottomText="National ID Crd" />
                <KYCFileUpload TopText="Required Form" BottomText="National ID Crd" />
                <KYCFileUpload TopText="Required Form" BottomText="National ID Crd" />
              </ContentWrapper>
            </FileContainer>
          </LaunchFormContainer>
          <Bottom>
            <CheckoutController
              backAction={handlePrev}
              backText={"Previous"}
              forwardAction={handleNext}
              forwardText={"Proceed"}
            />
          </Bottom>
        </LaunchPrimaryContainer>
      </Body>
    </Container>
  );
};

export default ServiceDocuments;
