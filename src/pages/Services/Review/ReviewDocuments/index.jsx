import ServiceReviewCard from "components/cards/ServiceReviewCard";
import { CheckoutController } from "containers";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useLazyViewComplyQuery } from "services/complyService";
import { Bottom, Loading } from "./style";
import { Puff } from "react-loading-icons";
import { removeComplyFromLocalStorage } from "utils/globalFunctions";

const ReviewDocuments = () => {
  const viewComply = useOutletContext();

  const navigate = useNavigate();

  const handlePrev = () => {
    navigate(-1);
  };

  const handleNext = async (formData) => {
    navigate("/services/success");
  };
  return (
    <div>
      {viewComply?.isLoading?.isLoading && (
        <Loading height="50vh">
          <Puff stroke="#00A2D4" fill="white" />
        </Loading>
      )}
      <ServiceReviewCard DocContent={viewComply?.data?.complyDocuments} />
      <Bottom>
        <CheckoutController
          backText={"Previous"}
          forwardSubmit
          backAction={handlePrev}
          forwardAction={handleNext}
          forwardText="Done"
        />
      </Bottom>
    </div>
  );
};

export default ReviewDocuments;
