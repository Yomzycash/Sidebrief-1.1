import ManageCard from "components/cards/ManageCard";
import { CheckoutController } from "containers";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Bottom } from "../style";
import { Wrapper } from "./style";

const ServiceDocumentsReview = () => {
  const navigate = useNavigate();

  const handlePrev = () => {
    navigate(-1);
  };

  const handleNext = async (formData) => {
    navigate("");
  };

  return (
    <Wrapper>
      <ManageCard />
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
