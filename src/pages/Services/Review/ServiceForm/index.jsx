import FormContainer from "containers/FormContainer";
import React, { useEffect, useState, useCallback } from "react";
import { Wrapper, Loading } from "./style";
import { useNavigate } from "react-router-dom";
import { CheckoutController } from "containers";
import { Bottom } from "../style";
import { Puff } from "react-loading-icons";
import { useLazyViewComplyQuery } from "services/complyService";

const ServiceFormReview = () => {
  const complyCodeData = JSON.parse(localStorage.getItem("complyInfo"));

  let complyCode = complyCodeData?.complyCode;

  const navigate = useNavigate();
  const [viewServiceDocument, viewServiceDocumentState] = useLazyViewComplyQuery();
  const [questionContainer, setQuestionContainer] = useState([]);

  const handleViewDocument = useCallback(async () => {
    const requiredData = {
      complyCode: complyCode,
    };
    const response = await viewServiceDocument(requiredData);
    if (Array.isArray(response?.data?.complyData)) {
      setQuestionContainer(response?.data?.complyData);
    }
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
      {viewServiceDocumentState?.isLoading && (
        <Loading height="50vh">
          <Puff stroke="#00A2D4" fill="white" />
        </Loading>
      )}
      {questionContainer?.map((el, index) => (
        <div key={index}>
          <FormContainer
            number={index + 1}
            question={el?.complyQuestion}
            answerArray={el?.complyAnswer}
            answer={el?.complyAnswer}
          />
        </div>
      ))}

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
