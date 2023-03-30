import { yupResolver } from "@hookform/resolvers/yup";
import { CheckoutController } from "containers";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { getSchema } from "./actions";
import { Bottom, DynamicFormWrapper, Inputs } from "./styled";
import UneditableQuestionnaire from "components/Form/Questionnaire/Uneditable";

const DynamicForm = ({
  formInfo,
  formMode,
  previewInfo,
  loading,
  disable,
  style,
  inputsStyle,
  submitAction,
  handlePrev,
}) => {
  let schema = getSchema(formInfo);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleTextChange = (value, name) => {
    setValue(name, value, { shouldValidate: true });
  };

  const handleRadioSelect = (selected, name) => {
    setValue(name, selected, { shouldValidate: true });
  };

  const handleCheckboxSelect = (checkList, name) => {
    setValue(name, checkList, { shouldValidate: true });
  };

  useEffect(() => {
    if (previewInfo)
      previewInfo.map((el) =>
        setValue(el.complyQuestionName, el.complyAnswer, {
          shouldValidate: true,
        })
      );
  }, [previewInfo]);

  let updatedFormInfo = formInfo?.map((el) => ({
    ...el,
    // complyDataInfo: previewInfo?.find((each) => each?.complyQuestionName === el?.fieldName) || {},
    fieldAnswer:
      previewInfo?.find((each) => each?.complyQuestionName === el?.fieldName)?.complyAnswer || "",
  }));

  return (
    <DynamicFormWrapper onSubmit={handleSubmit(submitAction)} style={style}>
      <Inputs>
        {updatedFormInfo?.map((el, index) => (
          <UneditableQuestionnaire
            key={index}
            index={index}
            info={el}
            handleTextChange={handleTextChange}
            handleRadioSelect={handleRadioSelect}
            handleCheckboxSelect={handleCheckboxSelect}
            error={errors[el?.fieldName]}
            register={register}
          />
        ))}
      </Inputs>
      <Bottom>
        <CheckoutController
          backText={"Previous"}
          forwardSubmit
          backAction={handlePrev}
          forwardAction={() => {}}
          forwardText="Next"
          forwardLoading={loading}
        />
      </Bottom>
    </DynamicFormWrapper>
  );
};

export default DynamicForm;
