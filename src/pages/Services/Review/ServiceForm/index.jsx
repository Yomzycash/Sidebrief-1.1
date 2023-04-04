import FormContainer from "containers/FormContainer";
import React from "react";
import { Wrapper, Loading } from "./style";
import { useNavigate, useOutletContext } from "react-router-dom";
import { CheckoutController } from "containers";
import { Bottom } from "../style";
import { Puff } from "react-loading-icons";
import { useActions } from "../actions";
import { useUpdateComplyMutation } from "services/complyService";

const ServiceFormReview = () => {
  const [updateComply, updateState] = useUpdateComplyMutation();

  const viewComply = useOutletContext();
  const documents = viewComply?.data?.complyDocuments;
  let done = documents?.length < 1;

  const { handleStatusUpdate } = useActions({
    serviceId: viewComply.data?.serviceId,
    complyInfo: viewComply.data,
    updateComply,
  });

  const navigate = useNavigate();

  const handlePrev = () => {
    navigate(-1);
  };

  const handleNext = async () => {
    let link = "/services/review/documents";
    link = done ? "/services/success" : link;

    if (done) {
      let response = await handleStatusUpdate();
      response.data && navigate(link);
    } else {
      navigate(link);
    }
  };

  return (
    <Wrapper>
      {viewComply?.isLoading && (
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
            forwardLoading={updateState.isLoading}
          />
        </div>
      ))}

      <Bottom>
        <CheckoutController
          backText={"Previous"}
          backAction={handlePrev}
          forwardAction={handleNext}
          forwardText={done ? "Done" : "Next"}
        />
      </Bottom>
    </Wrapper>
  );
};

export default ServiceFormReview;
