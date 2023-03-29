import FormContainer from "containers/FormContainer";
import React, { useEffect, useState, useCallback } from "react";
import { Wrapper, Loading } from "./style";
import { useNavigate, useOutletContext } from "react-router-dom";
import { CheckoutController } from "containers";
import { Bottom } from "../style";
import { Puff } from "react-loading-icons";
import { useLazyViewComplyQuery } from "services/complyService";

const ServiceFormReview = () => {
  const viewComply = useOutletContext();
  console.log(viewComply)

  const navigate = useNavigate();
  

  const handlePrev = () => {
    navigate(-1);
  };

  const handleNext = async () => {
    navigate("/services/review/documents");
  };

  return (
    <Wrapper>
      {viewComply ?.isLoading && (
        <Loading height="50vh">
          <Puff stroke="#00A2D4" fill="white" />
        </Loading>
      )}
      {viewComply?.data?.complyData?.map((el, index) => (
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
