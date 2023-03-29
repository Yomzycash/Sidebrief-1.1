import React from "react";
import SelectType from "./SelectType";
import TextType from "./TextType";

const UneditableQuestionnaire = ({
  index,
  info,
  handleTextChange,
  handleRadioSelect,
  handleCheckboxSelect,
  error,
  register,
}) => {
  return (
    <>
      {(info?.fieldType === "input" ||
        info?.fieldType === "textarea" ||
        info?.fieldType === "number") && (
        <TextType
          questionNumber={index + 1}
          info={info}
          handleChange={handleTextChange}
          error={error}
          register={register}
        />
      )}

      {(info?.fieldType === "checkbox" || info?.fieldType === "radio") && (
        <SelectType
          info={info}
          questionNumber={index + 1}
          handleRadioSelect={handleRadioSelect}
          handleCheckboxSelect={handleCheckboxSelect}
          error={error}
          register={register}
        />
      )}
    </>
  );
};

export default UneditableQuestionnaire;
