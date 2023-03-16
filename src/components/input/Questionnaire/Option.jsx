import React, { useEffect, useState } from "react";
import {
  CheckBullet,
  OptionContainer,
  OptionText,
  OtherOption,
  OtherSelect,
  RadioBullet,
} from "./stylex";
import { MdClear } from "react-icons/md";
import { InvisibleBackDrop } from "../styled";

const Option = ({
  text,
  type,
  removeAction,
  placeholder,
  index,
  updateOptionValue,
  disable,
  focusLastOption,
}) => {
  let other = text === "Other" || text === "Other (allowed to type)";

  const [openOther, setOpenOther] = useState(other ? true : false);

  const handleChange = (e) => {
    if (other) return;
    let value = e.target.value;
    updateOptionValue(index, value);
  };

  const handleSelect = (value) => {
    updateOptionValue(index, value);
    setOpenOther(false);
  };

  const handleInputClick = () => {
    setOpenOther(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") focusLastOption();
  };

  return (
    <OptionContainer>
      {type === "checkbox" && <CheckBullet />}
      {type === "radio" && <RadioBullet />}

      <OptionText
        value={text}
        onChange={handleChange}
        placeholder={placeholder}
        onClick={handleInputClick}
        disabled={(other && openOther) || disable}
        onKeyDown={handleKeyDown}
      />

      {other && openOther && (
        <OtherSelect>
          <InvisibleBackDrop onClick={() => setOpenOther(false)} />
          <OtherOption onClick={() => handleSelect("Other")}>Other</OtherOption>
          <OtherOption onClick={() => handleSelect("Other (allowed to type)")}>
            Other (allowed to type)
          </OtherOption>
        </OtherSelect>
      )}

      {!disable && <MdClear onClick={removeAction} />}
    </OptionContainer>
  );
};

export default Option;
