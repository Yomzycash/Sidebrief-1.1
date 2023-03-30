import React, { useRef, useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

import {
  DropDown,
  DropDownWrapper,
  ListItem,
  ListItems,
  ShowList,
  ShowListIcon,
  Label,
  ErrMsg,
  Top,
  InvisibleBackDrop,
  Input,
} from "./styled";

const DropOther = ({
  setValue,
  value,
  referralOptions,
  errorMessage,
  setErrorMessage,
  label,
  register,
  name,
  handleReferralChange,
}) => {
  const [open, setOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState("Please select an option");

  const inputRef = document.getElementById("custom-dropdown-input");

  const handleOpenDropdown = () => {
    setOpen(!open);
  };

  const handleOptionClick = (value) => {
    setOpen(false);

    if (value === "Other") {
      inputRef.focus();
      handleReferralChange("");
      setErrorMessage("");
      setPlaceholder("Please enter how you found us");
    } else {
      inputRef.blur();
      setErrorMessage("");
      handleReferralChange(value);
      setPlaceholder("Please select an option");
    }
  };

  const handleChange = (e) => {
    let value = e.target.value;
    handleReferralChange(value);
  };

  const handleInputClick = () => {
    setPlaceholder("Please select an option");
  };

  return (
    <>
      <Top>
        <Label>{label}</Label>

        {errorMessage ? <ErrMsg>{errorMessage}</ErrMsg> : null}
      </Top>
      <DropDownWrapper border={errorMessage ? "1px solid red" : "1px solid #e1e1de"}>
        <div
          style={{
            width: "100%",
            display: "flex",
            height: "100%",
          }}
          onClick={handleOpenDropdown}
        >
          <ShowList>
            {register ? (
              <Input
                id="custom-dropdown-input"
                name={name}
                onChange={handleChange}
                placeholder={placeholder}
                onClick={handleInputClick}
                ref={inputRef}
                {...register(name)}
              />
            ) : (
              <Input
                name={name}
                onChange={handleChange}
                value={value}
                placeholder={placeholder}
                onClick={handleInputClick}
              />
            )}
          </ShowList>
          <ShowListIcon>
            {open ? (
              <HiChevronUp size={24} color="#4E5152" />
            ) : (
              <HiChevronDown size={24} color="#4E5152" />
            )}
          </ShowListIcon>
        </div>
        {open && (
          <>
            <InvisibleBackDrop onClick={() => setOpen(false)} />
            <DropDown>
              <ListItems>
                {referralOptions.map((option, index) => (
                  <ListItem key={index} onClick={() => handleOptionClick(option.value)}>
                    {option.label}
                  </ListItem>
                ))}
              </ListItems>
            </DropDown>
          </>
        )}
      </DropDownWrapper>
    </>
  );
};

export default DropOther;
