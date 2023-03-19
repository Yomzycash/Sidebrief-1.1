import React from "react";
import { Body, Bottom, Container, UploadWrapper, TextWrapper } from "./style";
import ServicesCheckoutHeader from "components/Header/ServicesCheckoutHeader";
import { CheckoutController, CheckoutSection } from "containers";
import Download from "../../../components/File/Download";
import Upload from "../../../components/File/Upload";
import { useNavigate } from "react-router-dom";
const ServiceDocument = () => {
  const navigate = useNavigate();
  const handlePrev = () => {
    navigate(-1);
  };

  const handleNext = () => {
    navigate("/services/review/info");
  };

  return (
    <Container>
      <ServicesCheckoutHeader />

      <Body>
        <CheckoutSection
          title="Documents "
          HeaderParagraph="Download the following documents’ template (it will be required in the upload section)"
        />
        <Download />
        <UploadWrapper>
          <TextWrapper>Upload the following documents.</TextWrapper>
        </UploadWrapper>
        <Upload />
        <Bottom>
          <CheckoutController
            backAction={handlePrev}
            backText={"Previous"}
            forwardAction={handleNext}
            forwardText={"Proceed"}
          />
        </Bottom>
      </Body>
    </Container>
  );
};

export default ServiceDocument;
