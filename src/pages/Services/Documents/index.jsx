import { Download, Upload } from "components/File";
import ServicesCheckoutHeader from "components/Header/ServicesCheckoutHeader";
import { CheckoutController, CheckoutSection } from "containers";
import LaunchFormContainer from "containers/Checkout/CheckoutFormContainer/LaunchFormContainer";
import LaunchPrimaryContainer from "containers/Checkout/CheckoutFormContainer/LaunchPrimaryContainer";
import React, { useEffect, useState } from "react";
import {
  Body,
  Bottom,
  Container,
  ContentWrapper,
  DownLoadContentWrapper,
  DownLoadText,
  FileContainer,
} from "./style";
import { useNavigate } from "react-router-dom";
import { store } from "redux/Store";
import { setServiceCheckoutProgress } from "redux/Slices";
import toast from "react-hot-toast";
import { useGetSingleServiceQuery } from "services/staffService";
import { useAddComplyDocumentMutation } from "services/complyService";

const ServiceDocuments = () => {
  const complyInfo = JSON.parse(localStorage.getItem("complyInfo"));
  let serviceId = complyInfo?.serviceId;

  const navigate = useNavigate();
  const viewService = useGetSingleServiceQuery(serviceId);
  console.log("dddd", viewService);
  const [addServiceDocument, { isLoading, isSuccess }] = useAddComplyDocumentMutation();
  const [isChanged, setIsChanged] = useState(false);
  const handlePrev = () => {
    navigate(-1);
  };

  const handleNext = () => {
    navigate("/services/review/info");
  };

  let complyCode = complyInfo?.complyCode;

  const newHandleChange = async (uploadedFile, fileName, rawFile) => {
    const requiredData = {
      complyCode: complyCode,
      complyDocument: {
        documentName: fileName,
        documentType: fileName,
        documentLink: uploadedFile.url,
        fileName: rawFile.name,
        fileType: rawFile.type,
      },
    };

    const response = await addServiceDocument(requiredData);
    if (response.data) {
      toast.success("Document uploaded successfully");
      setIsChanged(!isChanged);
    } else if (response.error) {
      toast.error(response.error?.data.message);
    }
  };

  const removeUploadedFile = () => {
    console.log("removed");
  };

  // Set the progress of the application
  useEffect(() => {
    store.dispatch(setServiceCheckoutProgress({ total: 2, current: 1.8 })); // total- total pages and current - current page
  }, []);

  return (
    <Container>
      <ServicesCheckoutHeader />

      <Body>
        <CheckoutSection
          title="Download the templates below (fill and upload back)"
          HeaderParagraph="Download documents"
        />
        <LaunchPrimaryContainer>
          <LaunchFormContainer>
            <FileContainer>
              <DownLoadContentWrapper>
                {viewService?.data?.serviceTemplates.map((document, index) => (
                  <Download
                    key={index}
                    docType={document.templateName}
                    fileUrl={document.templateLink}
                  />
                ))}
              </DownLoadContentWrapper>
              <DownLoadText>Upload Documents</DownLoadText>
              <ContentWrapper>
                {viewService?.data?.serviceRequirements.map((document, index) => (
                  <Upload
                    key={index}
                    docType={document.requirementName}
                    uploadAction={newHandleChange}
                    deleteAction={removeUploadedFile}
                  />
                ))}
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
