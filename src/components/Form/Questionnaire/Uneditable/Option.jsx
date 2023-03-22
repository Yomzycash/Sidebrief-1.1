import React from "react";
import { UneditableOption } from "../styled";

const Option = ({ text, type, index, name, onChange }) => {
  return (
    <>
      {type === "checkbox" && (
        <UneditableOption>
          <input type="checkbox" id={"sq-checkbox-option" + index} onChange={onChange} />
          <label htmlFor={"sq-checkbox-option" + index}>{text}</label>
        </UneditableOption>
      )}
      {type === "radio" && (
        <UneditableOption>
          <input type="radio" id={"sq-radio-option" + index} name={name} onChange={onChange} />
          <label htmlFor={"sq-radio-option" + index}>{text}</label>
        </UneditableOption>
      )}
    </>
  );
};

export default Option;
