import React from "react";
import { buttonContainerStyles, buttonStyles, FormSectionContainer } from "./styled";
import Questionnaire from "components/input/Questionnaire";
import { CheckoutController } from "containers";
import { useActions } from "./actions";
import { useSearchParams } from "react-router-dom";
import { useViewServiceQuery } from "services/complyService";

const FormSection = ({ parentRef, dialogRef }) => {
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get("serviceId");
  const mode = searchParams.get("mode");

  const { data } = useViewServiceQuery(serviceId);

  const { scrollToPrev, scrollToNext } = useActions({ parentRef, dialogRef });

  const handleNext = () => {};

  const handleQuestionSubmit = (formData) => {
    console.log(formData);
  };

  const handleDeleteQuestion = (formData) => {
    console.log(formData);
  };

  return (
    <FormSectionContainer>
      {data?.serviceForm?.map((el, index) => (
        <Questionnaire
          key={index}
          index={index}
          info={el}
          review={true}
          handleQuestionSubmit={handleQuestionSubmit}
          handleDeleteQuestion={handleDeleteQuestion}
        />
      ))}

      <Questionnaire
        handleQuestionSubmit={handleQuestionSubmit}
        review={false}
        lastQuestion={data?.serviceForm?.length + 1}
      />
      <CheckoutController
        backAction={scrollToPrev}
        forwardAction={scrollToNext}
        backText="Previous"
        containerStyle={buttonContainerStyles}
        backBottonStyle={buttonStyles}
        forwardButtonStyle={buttonStyles}
        forwardText="Next"
        // forwardDisable={disable}
        $modal
      />
    </FormSectionContainer>
  );
};

export default FormSection;
