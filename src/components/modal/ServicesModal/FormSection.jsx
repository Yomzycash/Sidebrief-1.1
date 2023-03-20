import React from "react";
import {
  buttonContainerStyles,
  buttonStyles,
  SectionContainer,
  SectionInfoContainer,
} from "./styled";
import Questionnaire from "components/input/Questionnaire";
import { CheckoutController } from "containers";
import { useActions } from "./actions";
import { useSearchParams } from "react-router-dom";
import { useViewServiceQuery } from "services/complyService";
import {
  useAddServiceFormFieldMutation,
  useUpdateServiceFormFieldMutation,
  useDeleteServiceFormFieldMutation,
} from "services/staffService";

const FormSection = ({ service, setOpen, serviceId, mode, refetchServices }) => {
  const { data, refetch } = useViewServiceQuery(serviceId);
  const [addFormField, addState] = useAddServiceFormFieldMutation();
  const [updateFormField, updateState] = useUpdateServiceFormFieldMutation();
  const [deleteFormField, deleteState] = useDeleteServiceFormFieldMutation();

  const { scrollTo, handleServiceFormFieldAdd, handleServiceFormFieldDelete } = useActions({
    service,
    addFormField,
    updateFormField,
    deleteFormField,
    refetchServices,
    refetchService: refetch,
  });

  const handleQuestionSubmit = async (formData) => {
    return await handleServiceFormFieldAdd(formData);
  };

  const handleDeleteQuestion = async (info) => {
    return await handleServiceFormFieldDelete(info);
  };

  const handleUpdateQuestion = (formData) => {
    console.log("Question Updated", formData);
  };

  const handlePrev = () => {
    let infoRef = document.getElementById("staff-service-info");
    scrollTo(infoRef);
    setOpen(mode, serviceId, 50);
  };

  const handleNext = () => {
    let docsRef = document.getElementById("staff-service-docs");
    scrollTo(docsRef);
  };

  return (
    <SectionContainer id="staff-service-form">
      <SectionInfoContainer>
        {data?.serviceForm?.map((el, index) => (
          <Questionnaire
            key={index}
            index={index}
            info={el}
            review={true}
            handleQuestionSubmit={handleQuestionSubmit}
            handleDeleteQuestion={handleDeleteQuestion}
            handleUpdateQuestion={handleUpdateQuestion}
            deleteState={deleteState}
          />
        ))}

        <Questionnaire
          handleQuestionSubmit={handleQuestionSubmit}
          handleUpdateQuestion={handleUpdateQuestion}
          review={false}
          lastQuestion={data?.serviceForm?.length + 1}
        />
      </SectionInfoContainer>

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
    </SectionContainer>
  );
};

export default FormSection;
