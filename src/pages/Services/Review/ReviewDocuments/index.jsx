import ServiceReviewCard from "components/cards/ServiceReviewCard";
import { CheckoutController } from "containers";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useLazyViewComplyQuery } from "services/complyService";
import { Bottom, Loading } from "./style";
import { Puff } from "react-loading-icons";
import { removeComplyFromLocalStorage } from "utils/globalFunctions";
import { useActions } from "../actions";
import { useUpdateComplyMutation } from "services/complyService";

const ReviewDocuments = () => {
  const viewComply = useOutletContext();
  const [updateComply, updateState] = useUpdateComplyMutation();

  const { handleStatusUpdate } = useActions({
    serviceId: viewComply.data?.serviceId,
    complyInfo: viewComply.data,
    updateComply,
  });

  const navigate = useNavigate();
  let { option } = useParams();

  const handlePrev = () => {
    navigate(-1);
  };

  const handleNext = async () => {
    let response = await handleStatusUpdate();
    response.data && navigate(`/services/${option}/success`);
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
          backAction={handlePrev}
          forwardAction={handleNext}
          forwardText="Done"
          forwardLoading={updateState.isLoading}
        />
      </Bottom>
    </div>
  );
};

export default ReviewDocuments;
