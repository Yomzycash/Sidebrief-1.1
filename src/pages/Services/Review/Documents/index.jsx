import ManageCard from "components/cards/ManageCard";
import { CheckoutController } from "containers";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useViewServiceDocumentMutation } from "services/complyService";
import { Bottom } from "../style";
import { Wrapper } from "./style";

const ServiceDocumentsReview = () => {
  const complyCodeData = JSON.parse(localStorage.getItem("complyData"));
  let complyCode = complyCodeData.complyCode;

  const navigate = useNavigate();
  const [viewServiceDocument, viewServiceDocumentState] = useViewServiceDocumentMutation();
  const [documentContainer, setDocumentContainer] = useState([]);

  const handleViewDocument = useCallback(async () => {
    const requiredData = {
      complyCode: complyCode,
    };
    const response = await viewServiceDocument(requiredData);
    setDocumentContainer(response?.data?.complyDocuments);
  }, [complyCode, viewServiceDocument]);

  useEffect(() => {
    handleViewDocument();
  }, [handleViewDocument]);

  const handlePrev = () => {
    navigate(-1);
  };

  const handleNext = async (formData) => {
    navigate("/services/success");
    localStorage.removeItem("complyData");
    localStorage.removeItem("servicePaymentDetails");
    // localStorage.removeItem("serviceData");
  };

  return (
    <Wrapper>
      <ManageCard document={documentContainer} loadingState={viewServiceDocumentState} />

      <Bottom>
        <CheckoutController
          backText={"Previous"}
          forwardSubmit
          backAction={handlePrev}
          forwardAction={handleNext}
          forwardText="Next"
        />
      </Bottom>
    </Wrapper>
  );
};

export default ServiceDocumentsReview;
