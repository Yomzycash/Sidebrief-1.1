import { yupResolver } from "@hookform/resolvers/yup";
import { DropDown, InputWithLabel } from "components/input";
import { CheckoutController } from "containers";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { getSchema, getType } from "./actions";
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

  const handleChange = (value, el) => {
    let category = Object.values(value)[0];
    setValue(el?.name, category, { shouldValidate: true });
  };

  const handleTextChange = (value, name) => {
    console.log(value, name);
    setValue(name, value, { shouldValidate: true });
  };

  const handleRadioSelect = (selected, name) => {
    console.log(selected, name);
    setValue(name, selected, { shouldValidate: true });
  };

  const handleCheckboxSelect = (checkList, name) => {
    console.log(checkList, name);
    setValue(name, checkList, { shouldValidate: true });
  };

  useEffect(() => {
    if (formMode === "edit")
      previewInfo.map((el) => setValue(el.name, previewInfo.entityName, { shouldValidate: true }));
  }, []);

  return (
    <DynamicFormWrapper onSubmit={handleSubmit(submitAction)} style={style}>
      <Inputs>
        {formInfo?.map((el, index) => (
          <UneditableQuestionnaire
            key={index}
            index={index}
            info={el}
            handleTextChange={handleTextChange}
            handleRadioSelect={handleRadioSelect}
            handleCheckboxSelect={handleCheckboxSelect}
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
        />
      </Bottom>
    </DynamicFormWrapper>
  );
};

export default DynamicForm;
