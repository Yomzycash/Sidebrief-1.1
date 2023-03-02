import { yupResolver } from "@hookform/resolvers/yup";
import { DropDown, InputWithLabel } from "components/input";
import { CheckoutController } from "containers";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getSchema } from "./actions";
import { buttonStyles, DynamicFormWrapper } from "./styled";

const DynamicForm = ({ formInfo, formMode, loading, disable }) => {
  const navigate = useNavigate();

  let schema = getSchema(array);

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

  const handleNext = () => {};

  const submitForm = (formValues) => {
    console.log(formValues);
  };

  useEffect(() => {
    if (formMode === "edit")
      formInfo.map((el) =>
        setValue(el.name, formInfo.entityName, { shouldValidate: true })
      );
  }, []);

  return (
    <DynamicFormWrapper onSubmit={handleSubmit(submitForm)}>
      {array.map((el, index) =>
        el.options ? (
          <DropDown
            key={index}
            containerStyle={{ margin: 0, marginBottom: "24px" }}
            label={el.question}
            name={el.name}
            type={el.type}
            labelStyle="input-label"
            placeholder=""
            options={el?.options?.map((each) => ({ value: each, label: each }))}
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
            inputClass="input-class"
            containerStyle="input-container-class"
            register={register}
            errorMessage={errors[el.name]?.message}
          />
        )
      )}
      <CheckoutController
        backAction={() => navigate(-1)}
        backText={"Previous"}
        forwardAction={handleNext}
        forwardText={"Proceed"}
        backBottonStyle={buttonStyles}
        forwardButtonStyle={buttonStyles}
        forwardSubmit
        forwardLoading={loading}
        forwardDisable={disable}
        $modal
      />
    </DynamicFormWrapper>
  );
};

export default DynamicForm;

// name uniqueness has to be validated
const array = [
  {
    question: "When did you register your company",
    type: "text",
    name: "registration",
    required: true,
  },
  {
    question: "Who is your favourite artist",
    type: "text",
    options: ["davido", "wizkid", "burna"],
    name: "artist",
    required: false,
  },
  {
    question: "How many shareholders do you have",
    type: "number",
    name: "shareholders",
    required: true,
  },
];
