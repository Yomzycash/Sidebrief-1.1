import React from "react";
import {
  buttonContainerStyles,
  buttonStyles,
  SectionContainer,
  SectionInfoContainer,
} from "./styled";
import EditableQuestionnaire from "components/Form/Questionnaire/Editable";
import { CheckoutController } from "containers";
import { useActions } from "./actions";
import { useSearchParams } from "react-router-dom";
import {
  useAddServiceFormFieldMutation,
  useUpdateServiceFormFieldMutation,
  useDeleteServiceFormFieldMutation,
} from "services/staffService";
import { useGetSingleServiceQuery } from "services/staffService";

const FormSection = ({ service, setOpen, serviceId, mode, refetchServices }) => {
  const { data, refetch } = useGetSingleServiceQuery(serviceId);

  const [addFormField, addState] = useAddServiceFormFieldMutation();
  const [updateFormField, updateState] = useUpdateServiceFormFieldMutation();
  const [deleteFormField, deleteState] = useDeleteServiceFormFieldMutation();

  const {
    scrollTo,
    handleServiceFormFieldAdd,
    handleServiceFormFieldUpdate,
    handleServiceFormFieldDelete,
  } = useActions({
    service,
    serviceId,
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

  const handleUpdateQuestion = async (formInfo) => {
    return await handleServiceFormFieldUpdate(formInfo);
  };

  const handlePrev = () => {
    let infoRef = document.getElementById("staff-service-info");
    scrollTo(infoRef);
    setOpen(mode, serviceId);
  };

  const handleNext = () => {
    let docsRef = document.getElementById("staff-service-docs");
    scrollTo(docsRef, serviceId);
    setOpen(mode, serviceId, 100);
  };

  return (
    <SectionContainer id="staff-service-form">
      <SectionInfoContainer>
        {data?.serviceForm?.map((el, index) => (
          <EditableQuestionnaire
            key={index}
            index={index}
            info={el}
            review={true}
            handleQuestionSubmit={handleQuestionSubmit}
            handleDeleteQuestion={handleDeleteQuestion}
            handleUpdateQuestion={handleUpdateQuestion}
            deleteState={deleteState}
            updateState={updateState}
          />
        ))}

        <EditableQuestionnaire
          handleQuestionSubmit={handleQuestionSubmit}
          handleUpdateQuestion={handleUpdateQuestion}
          review={false}
          lastQuestion={(data?.serviceForm?.length || 0) + 1}
          addState={addState}
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
