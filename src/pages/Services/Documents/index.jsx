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
  DocumentSection,
  DownLoadContentWrapper,
  DownLoadText,
  FileContainer,
} from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { store } from "redux/Store";
import { setServiceCheckoutProgress } from "redux/Slices";
import toast from "react-hot-toast";
import { useGetSingleServiceQuery } from "services/staffService";
import {
  useAddComplyDocumentMutation,
  useDeleteComplyDocumentMutation,
  useViewComplyQuery,
} from "services/complyService";

const ServiceDocuments = () => {
  const complyInfo = JSON.parse(localStorage.getItem("complyInfo"));
  const serviceId = complyInfo?.serviceId;
  const complyCode = complyInfo?.complyCode;

  const navigate = useNavigate();
  let { option } = useParams();

  const viewService = useGetSingleServiceQuery(serviceId);
  const viewComply = useViewComplyQuery({
    complyCode,
  });
  const [addComplyDocument] = useAddComplyDocumentMutation();
  const [deleteComplyDocument] = useDeleteComplyDocumentMutation();
  const [isChanged, setIsChanged] = useState(false);

  const handlePrev = () => {
    navigate(-1);
  };

  const handleNext = () => {
    const requiredDocumentsLength = viewService.data.serviceRequirements.map(
      (el) => el.requirementName
    ).length;
    const uploadedDocumentsLength = Object.keys(
      handleDocuments(viewComply.data.complyDocuments)
    ).length;

    if (uploadedDocumentsLength === 0) {
      toast.error("All documents are required");
    } else if (requiredDocumentsLength !== uploadedDocumentsLength) {
      toast.error("All documents are required");
    } else {
      navigate(`/services/${option}/review/info`);
    }
  };

  const handleDocuments = (documents) => {
    if (documents.length > 0) {
      // get all document types
      const documentTypes = [...new Set(documents.map((el) => el.documentType))];

      const object = {};

      documentTypes.forEach((key) => {
        object[key] = documents.filter((el) => el.documentType === key).slice(-1)[0];
      });

      return object;
    }
    return {};
  };

  const complyDocuments = viewComply?.data?.complyDocuments || [];

  const docs = handleDocuments(complyDocuments);

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

    const response = await addComplyDocument(requiredData);
    await viewComply.refetch();
    const documentCode = response.data.complyDocuments.slice(-1)[0].documentCode;
    if (response.data) {
      toast.success("Document uploaded successfully");
      setIsChanged(!isChanged);
    } else if (response.error) {
      toast.error(response.error?.data.message);
    }

    return documentCode;
  };

  const removeUploadedFile = async (documentCode) => {
    const requiredData = {
      complyCode,
      documentCode,
    };
    const response = await deleteComplyDocument(requiredData);

    if (response.data) {
      toast.success("Document removed successfully");
      setIsChanged(!isChanged);
    } else if (response.error) {
      toast.error(response.error?.data.message);
    }
  };

  // Set the progress of the application
  useEffect(() => {
    store.dispatch(setServiceCheckoutProgress({ total: 2, current: 1.8 })); // total- total pages and current - current page
  }, []);

  let noTemplate = viewService?.data?.serviceTemplates < 1;
  let title = noTemplate
    ? "Upload the following document(s)"
    : "Download the template(s) below (fill then upload back)";

  return (
    <Container>
      <ServicesCheckoutHeader />

      <Body>
        <CheckoutSection title={title} />
        <LaunchPrimaryContainer>
          <LaunchFormContainer>
            <FileContainer>
              {!noTemplate && (
                <DocumentSection>
                  <DownLoadText>Download Template(s)</DownLoadText>
                  <DownLoadContentWrapper>
                    {viewService?.data?.serviceTemplates.map((document, index) => (
                      <Download
                        key={index}
                        docType={document.templateName}
                        fileUrl={document.templateLink}
                      />
                    ))}
                  </DownLoadContentWrapper>
                </DocumentSection>
              )}
              <DocumentSection>
                {!noTemplate && <DownLoadText>Upload Document(s)</DownLoadText>}
                <ContentWrapper>
                  {viewService?.data?.serviceRequirements.map((document, index) => {
                    const oldFile = docs[document.requirementName];
                    return (
                      <Upload
                        key={index}
                        docType={document.requirementName}
                        uploadAction={newHandleChange}
                        deleteAction={removeUploadedFile}
                        oldFile={
                          oldFile
                            ? { name: oldFile.fileName, code: oldFile.documentCode }
                            : { name: "", code: "" }
                        }
                      />
                    );
                  })}
                </ContentWrapper>
              </DocumentSection>
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
