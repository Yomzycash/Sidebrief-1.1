import KYCFileUpload from "components/FileUpload/KYCFileUpload";
import ServicesCheckoutHeader from "components/Header/ServicesCheckoutHeader";
import { CheckoutController, CheckoutSection } from "containers";
import LaunchFormContainer from "containers/Checkout/CheckoutFormContainer/LaunchFormContainer";
import LaunchPrimaryContainer from "containers/Checkout/CheckoutFormContainer/LaunchPrimaryContainer";
import React, { useEffect, useState } from "react";
import { Body, Bottom, Container, ContentWrapper, DownLoadText, FileContainer } from "./style";
import { useNavigate } from "react-router-dom";
import { store } from "redux/Store";
import { setServiceCheckoutProgress } from "redux/Slices";
import { useAddServiceDocumentMutation, useViewServiceQuery } from "services/complyService";
import { convertToLink } from "utils/LaunchHelper";
import toast from "react-hot-toast";

const ServiceDocuments = () => {
  // let code = 9031415997;
  const navigate = useNavigate();
  const viewService = useViewServiceQuery();
  const [addServiceDocument, { isLoading, isSuccess }] = useAddServiceDocumentMutation();
  const [isChanged, setIsChanged] = useState(false);
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

  let complyCode = "335928451015517734"; // to be changed to the one stored in the localstorage

  const handleChange = async (file, fileName) => {
    const res = await convertToLink(file[0]);

    const requiredData = {
      complyCode: complyCode,
      complyDocument: {
        documentName: fileName,
        documentType: fileName,
        documentLink: res.url,
        fileName: file[0].name,
        fileType: file[0].type,
      },
    };

    console.log("ggg", requiredData);

    const response = await addServiceDocument(requiredData);
    if (response.data) {
      toast.success("Document uploaded successfully");
      setIsChanged(!isChanged);
    } else if (response.error) {
      toast.error(response.error?.data.message);
    }
  };
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
                {viewService?.data?.serviceTemplates.map((document, index) => (
                  <KYCFileUpload
                    key={index}
                    downloadPage
                    downloadDocumentName={document.fileName}
                    downloadDocumentLink={document.templateLink}
                  />
                ))}
              </ContentWrapper>
              <DownLoadText>Upload the required forms</DownLoadText>
              <ContentWrapper>
                {viewService?.data?.serviceRequirements.map((document, index) => (
                  <KYCFileUpload
                    key={index}
                    TopText={document.requirementName}
                    BottomText={document.requirementDescription}
                    documentComponentType={document.requirementName}
                    onDrop={(files) => handleChange(files, document.requirementName)}
                    isChanged={isChanged}
                    complyCode={complyCode}
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
