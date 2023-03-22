import React from "react";
import SelectType from "./SelectType";
import TextType from "./TextType";

const UneditableQuestionnaire = ({
  index,
  info,
  handleTextChange,
  handleRadioSelect,
  handleCheckboxSelect,
}) => {
  return (
    <>
      {(info?.fieldType === "input" ||
        info?.fieldType === "textarea" ||
        info?.fieldType === "number") && (
        <TextType questionNumber={index + 1} info={info} handleChange={handleTextChange} />
      )}

      {(info?.fieldType === "checkbox" || info?.fieldType === "radio") && (
        <SelectType
          info={info}
          questionNumber={index + 1}
          handleRadioSelect={handleRadioSelect}
          handleCheckboxSelect={handleCheckboxSelect}
        />
      )}
    </>
  );
};

export default UneditableQuestionnaire;
