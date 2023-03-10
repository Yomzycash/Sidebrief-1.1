import { yupResolver } from "@hookform/resolvers/yup";
import { DropDown, InputWithLabel } from "components/input";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { getSchema } from "./actions";
import { DynamicFormWrapper, Inputs } from "./styled";

const DynamicForm = ({
  formInfo,
  formMode,
  previewInfo,
  loading,
  disable,
  style,
  inputsStyle,
  submitAction,
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

  useEffect(() => {
    if (formMode === "edit")
      previewInfo.map((el) => setValue(el.name, previewInfo.entityName, { shouldValidate: true }));
  }, []);

  return (
    <DynamicFormWrapper onSubmit={handleSubmit(submitAction)} style={style}>
      <Inputs style={inputsStyle}>
        {formInfo.map((el, index) =>
          el.options ? (
            <DropDown
              key={index}
              containerStyle={{ margin: 0, marginBottom: "24px" }}
              label={el.question}
              name={el.name}
              type={el.type}
              labelStyle="input-label"
              placeholder=""
              options={el?.options?.map((each) => ({
                value: each,
                label: each,
              }))}
              onChange={(e) => handleChange(e, el)}
              errorMessage={errors[el.name]?.message}
              // defaultValue={rewardInfo ? rewardInfo.rewardCategory : ""}
              fontSize="clamp(12px, 1.2vw, 14px)"
              height="40px"
              // disable={disable}
            />
          ) : (
            <InputWithLabel
              key={index}
              label={el.question}
              labelStyle="input-label"
              placeholder=""
              type={el.type}
              name={el.name}
              inputClass="service-form-input"
              containerStyle="input-container-class"
              register={register}
              errorMessage={errors[el.name]?.message}
            />
          )
        )}
      </Inputs>
    </DynamicFormWrapper>
  );
};

export default DynamicForm;
