import React, { useEffect, useRef, useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { UneditableOther } from "../styled";

const Other = ({ handleValue, otherAnswer }) => {
  const [inputValue, setInputValue] = useState(otherAnswer || "");
  const [blurred, setBlurred] = useState(false);

  const inputRef = useRef(null);

  const handleChange = (e) => {
    let value = e.target.value;
    setInputValue(value);
  };

  const handleClick = (e) => {
    setBlurred(false);
    if (inputValue.toLowerCase() === "other") setInputValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleOther();
  };

  const handleOther = () => {
    if (inputValue.trim() === "") {
      setInputValue("Other");
      handleValue("");
    } else {
      handleValue(inputValue);
    }

    handleBlur();
  };

  const handleBlur = () => {
    inputRef.current.blur();
    setBlurred(true);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <UneditableOther>
      <input
        type="text"
        placeholder="Enter option"
        ref={inputRef}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        onBlur={handleOther}
      />
      {!blurred && <BsCheckCircle onClick={handleOther} style={{ cursor: "pointer" }} />}
    </UneditableOther>
  );
};

export default Other;
