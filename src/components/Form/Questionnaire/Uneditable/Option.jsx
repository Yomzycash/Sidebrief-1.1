import React, { useEffect, useRef, useState } from "react";
import { UneditableOption } from "../styled";
import OtherOption from "./OtherOption";

const Option = ({ text, type, info, onChange }) => {
  let fieldName = info?.fieldName;
  let fieldAnswer = info?.fieldAnswer;

  let otherAnswer =
    fieldAnswer &&
    (type === "radio"
      ? fieldAnswer
      : fieldAnswer?.find(
          (el) => el?.toLowerCase()?.includes("other(") || el?.toLowerCase() === "other"
        ));

  const [openOther, setOpenOther] = useState(otherAnswer ? true : false);

  let inputRef = useRef(null);
  let inputChecked = inputRef.current?.checked;

  let unique = fieldName?.split(" ")?.join("") + text;
  let isOther = text?.toLowerCase() === "other";
  let closeOther = type === "radio" && isOther && !inputChecked;

  //
  const handleChange = (e) => {
    let checked = e.target.checked;
    onChange(checked);

    if (isOther) {
      setOpenOther(checked);
    }
  };

  //
  const handleOtherValue = (value) => {
    onChange(true, value);
  };

  // Populates answers on mount, if available.
  useEffect(() => {
    let element = document.getElementById(unique);
    let answer = fieldAnswer;
    let checkOther = (ans) =>
      ans?.toLowerCase()?.includes("other") && text?.toLowerCase() === "other";

    if (type === "radio") {
      element.checked = answer === text || checkOther(answer) ? true : false;
    } else {
      answer &&
        answer?.map((el) => (el === text || checkOther(el) ? (element.checked = true) : false));
    }
  }, [fieldAnswer]);

  return (
    <UneditableOption>
      <input
        type={type === "radio" ? "radio" : "checkbox"}
        id={unique}
        ref={inputRef}
        onChange={handleChange}
        name={fieldName}
      />

      {isOther && openOther && !closeOther ? (
        <OtherOption handleValue={handleOtherValue} type={type} otherAnswer={otherAnswer} />
      ) : (
        <label htmlFor={unique}>{text}</label>
      )}
    </UneditableOption>
  );
};

export default Option;
