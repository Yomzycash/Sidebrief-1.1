import React, { useEffect, useRef, useState } from "react";
import { UneditableOption } from "../styled";
import OtherOption from "./OtherOption";

const Option = ({ text, type, info, onChange, fieldAnswer, otherFieldAnswer, normalize }) => {
  let fieldName = info?.fieldName;

  const [openOther, setOpenOther] = useState(otherFieldAnswer ? true : false);

  let unique = fieldName?.split(" ")?.join("") + text;
  let isOther = normalize(text) === "other";

  //
  const handleChange = (e) => {
    let checked = e.target.checked;

    if (isOther) {
      setOpenOther(checked);
      checked === false && onChange(checked);
    } else {
      onChange(checked);
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

    if (type === "radio") {
      element.checked = answer === text || (otherFieldAnswer && isOther);
    } else {
      element.checked = otherFieldAnswer && isOther ? true : false;
      answer &&
        answer?.map((el) => (normalize(el) === normalize(text) ? (element.checked = true) : false));
    }

    if (otherFieldAnswer) setOpenOther(true);
  }, [info?.fieldAnswer]);

  return (
    <UneditableOption>
      <input
        type={type === "radio" ? "radio" : "checkbox"}
        id={unique}
        onChange={handleChange}
        name={fieldName}
      />

      {isOther && openOther ? (
        <OtherOption
          handleValue={handleOtherValue}
          type={type}
          otherAnswer={otherFieldAnswer}
          checkInputId={unique}
        />
      ) : (
        <label htmlFor={unique}>{text}</label>
      )}
    </UneditableOption>
  );
};

export default Option;
