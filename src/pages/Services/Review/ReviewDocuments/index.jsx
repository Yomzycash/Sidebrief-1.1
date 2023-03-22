import ServiceReviewCard from "components/cards/ServiceReviewCard";
import { CheckoutController } from "containers";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useViewComplyMutation } from "services/complyService";
import { Bottom,Loading } from "./style";
import { Puff } from "react-loading-icons";

const ReviewDocuments = () => {
  const complyCodeData = JSON.parse(localStorage.getItem("complyData"));
  let complyCode = "302033545077050509";

  const navigate = useNavigate();
  const [viewServiceDocument, viewServiceDocumentState] = useViewComplyMutation();
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
    <div>
      {viewServiceDocumentState?.isLoading && (
          <Loading height="50vh">
            <Puff stroke="#00A2D4" fill="white" />
          </Loading>
      )}
      <ServiceReviewCard DocContent={documentContainer} />
      <Bottom>
        <CheckoutController
          backText={"Previous"}
          forwardSubmit
          backAction={handlePrev}
          forwardAction={handleNext}
          forwardText="Next"
        />
      </Bottom>
    </div>
  );
};

export default ReviewDocuments;
