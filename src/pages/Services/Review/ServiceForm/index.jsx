import QuestionCard from "components/cards/QuestionCard";
import React from "react";
import { Wrapper } from "./style";
import { useNavigate } from "react-router-dom";
import { CheckoutController } from "containers";
import { Bottom } from "../style";

const ServiceFormReview = () => {
  const navigate = useNavigate();

  const handlePrev = () => {
    navigate(-1);
  };

  const handleNext = async () => {
    navigate("/services/review/documents");
  };

  return (
    <Wrapper>
      <QuestionCard />
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
