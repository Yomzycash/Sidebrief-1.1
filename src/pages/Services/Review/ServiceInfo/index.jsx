import InfoCard from "components/cards/InfoCard";
import { CheckoutController } from "containers";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Bottom } from "../style";
import { Wrapper } from "./style";

const ServiceInfoReview = () => {
  const navigate = useNavigate();

  const handlePrev = () => {
    navigate(-1);
  };

  const handleNext = async () => {
    navigate("/services/review/form");
  };
  return (
    <Wrapper>
      <InfoCard />
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

export default ServiceInfoReview;
