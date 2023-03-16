import React from "react";
import { buttonContainerStyles, buttonStyles, FormSectionContainer } from "./styled";
import Questionnaire from "components/input/Questionnaire";
import { CheckoutController } from "containers";
import { useActions } from "./actions";
import { useSearchParams } from "react-router-dom";
import { useViewServiceQuery } from "services/complyService";
import { useAddServiceFormFieldMutation } from "services/staffService";

const FormSection = ({ service, setOpen }) => {
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get("serviceId");
  const mode = searchParams.get("mode");

  const { data, refetch } = useViewServiceQuery(serviceId);
  const [addFormField, addState] = useAddServiceFormFieldMutation();

  const { scrollTo, handleServiceFormFieldAdd } = useActions({ service, addFormField });

  const handleQuestionSubmit = (formData) => {
    handleServiceFormFieldAdd(formData);
    refetch();
  };

  const handleDeleteQuestion = (formData) => {
    console.log("Question Deleted", formData);
  };

  const handleUpdateQuestion = (formData) => {
    console.log("Question Updated", formData);
  };

  const handlePrev = () => {
    let infoRef = document.getElementById("staff-service-info");
    scrollTo(infoRef);
    setOpen(mode, serviceId, 0);
  };

  const handleNext = () => {
    let docsRef = document.getElementById("staff-service-docs");
    scrollTo(docsRef);
  };

  return (
    <FormSectionContainer id="staff-service-form">
      {data?.serviceForm?.map((el, index) => (
        <Questionnaire
          key={index}
          index={index}
          info={el}
          review={true}
          handleQuestionSubmit={handleQuestionSubmit}
          handleDeleteQuestion={handleDeleteQuestion}
          handleUpdateQuestion={handleUpdateQuestion}
        />
      ))}

      <Questionnaire
        handleQuestionSubmit={handleQuestionSubmit}
        handleUpdateQuestion={handleUpdateQuestion}
        review={false}
        lastQuestion={data?.serviceForm?.length + 1}
      />
      <CheckoutController
        backAction={handlePrev}
        forwardAction={handleNext}
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
