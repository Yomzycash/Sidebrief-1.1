import React from "react";
import { buttonContainerStyles, buttonStyles, FormSectionContainer } from "./styled";
import Questionnaire from "components/input/Questionnaire";
import { CheckoutController } from "containers";
import { useActions } from "./actions";
import { useSearchParams } from "react-router-dom";
import { useViewServiceQuery } from "services/complyService";
import {
  useAddServiceFormFieldMutation,
  useDeleteServiceFormFieldMutation,
} from "services/staffService";

const FormSection = ({ service, setOpen, serviceId, mode }) => {
  const { data, refetch } = useViewServiceQuery(serviceId);
  const [addFormField, addState] = useAddServiceFormFieldMutation();
  const [deleteFormField, deleteState] = useDeleteServiceFormFieldMutation();

  const { scrollTo, handleServiceFormFieldAdd, handleServiceFormFieldDelete } = useActions({
    service,
    addFormField,
    deleteFormField,
  });

  const handleQuestionSubmit = async (formData) => {
    await handleServiceFormFieldAdd(formData);
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
    setOpen(mode, serviceId);
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
          handleServiceFormFieldDelete={handleServiceFormFieldDelete}
          deleteState={deleteState}
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
