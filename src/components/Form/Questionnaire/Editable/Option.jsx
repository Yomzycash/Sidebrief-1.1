import React from "react";
import { CheckBullet, OptionContainer, OptionText, RadioBullet } from "../styled";
import { MdClear } from "react-icons/md";

const Option = ({
  text,
  type,
  removeAction,
  placeholder,
  index,
  updateOptionValue,
  disable,
  optionsArray,
  dispatch,
}) => {
  let other = text.toLowerCase() === "other";

  const handleChange = (e) => {
    if (other) return;
    let value = e.target.value;
    updateOptionValue(index, value);
  };

  // Removes an option input when Backspace is pressed when the input is empty.
  const handleKeyDown = (e) => {
    let value = e.target.value;
    if (e.key === "Backspace" && value?.length < 1) {
      optionsArray?.splice(index, 1);
      dispatch({ type: "setOptionsArray", payload: optionsArray });
    }
  };

  return (
    <OptionContainer>
      {type === "checkbox" && <CheckBullet />}
      {type === "radio" && <RadioBullet />}

      <OptionText
        value={text}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={other || disable}
        onKeyDown={handleKeyDown}
      />

      {!disable && <MdClear onClick={removeAction} />}
    </OptionContainer>
  );
};

export default Option;
