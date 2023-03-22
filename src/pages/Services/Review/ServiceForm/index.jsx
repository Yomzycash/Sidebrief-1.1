import QuestionCard from "components/cards/QuestionCard";
import React, { useEffect, useState, useCallback } from "react";
import { Wrapper } from "./style";
import { useNavigate } from "react-router-dom";
import { CheckoutController } from "containers";
import { Bottom } from "../style";
import { useViewComplyMutation } from "services/complyService";

const ServiceFormReview = () => {
  const complyCodeData = JSON.parse(localStorage.getItem("complyData"));
  let complyCode = complyCodeData.complyCode;

  const navigate = useNavigate();
  const [viewServiceDocument, viewServiceDocumentState] = useViewComplyMutation();
  const [questionContainer, setQuestionContainer] = useState([]);

  const handleViewDocument = useCallback(async () => {
    const requiredData = {
      complyCode: complyCode,
    };
    const response = await viewServiceDocument(requiredData);
    setQuestionContainer(response?.data?.complyData);
  }, [complyCode, viewServiceDocument]);

  useEffect(() => {
    handleViewDocument();
  }, [handleViewDocument]);

  const handlePrev = () => {
    navigate(-1);
  };

  const handleNext = async () => {
    navigate("/services/review/documents");
  };

  return (
    <Wrapper>
      <QuestionCard question={questionContainer} loadingState={viewServiceDocumentState} />
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

export default ServiceFormReview;
