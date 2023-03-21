import React from "react";
import { UneditableOption } from "../styled";

const Option = ({ text, type, index, name, onChange }) => {
  let unique = name?.split(" ")?.join("") + text;

  return (
    <>
      {type === "checkbox" && (
        <UneditableOption>
          <input type="checkbox" id={unique} onChange={onChange} />
          <label htmlFor={unique}>{text}</label>
        </UneditableOption>
      )}
      {type === "radio" && (
        <UneditableOption>
          <input type="radio" id={unique} name={name} onChange={onChange} />
          <label htmlFor={unique}>{text}</label>
        </UneditableOption>
      )}
    </>
  );
};

export default Option;
