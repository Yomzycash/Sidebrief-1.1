import React, { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

import {
  DropDown,
  DropDownWrapper,
  ListItem,
  ListItems,
  ShowList,
  DefaultItem,
  ShowListIcon,
  Item,
  Label,
  OtherInput,
  ErrMsg,
  Top,
  InvisibleBackDrop,
} from "./styled";

const DropOther = ({
  setValue,
  referralOptions,
  errorMessage,
  setErrorMessage,
}) => {
  const [open, setOpen] = useState(false);
  const [openInput, setOpenInput] = useState(false);
  const [dValue, setDValue] = useState("");

  const handleOpenDropdown = () => {
    setOpen(!open);
  };
  const handleOptionClick = (value) => {
    setOpen(false);
    setDValue(value);
    setValue(value);
    setErrorMessage("");
    if (value === "Other") {
      setOpenInput(true);
      setErrorMessage("");
    } else {
      setOpenInput(false);
      setErrorMessage("");
    }
  };
  const handleChange = (e) => {
    let input = e.target.value;
    setValue(input);
  };

  return (
    <>
      <Top>
        <Label>How did you find us ?</Label>

        {errorMessage !== "" ? <ErrMsg>{errorMessage}</ErrMsg> : null}
      </Top>
      <DropDownWrapper
        border={errorMessage !== "" ? "1px solid red" : "1px solid #e1e1de"}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            height: "100%",
          }}
        >
          <ShowList>
            {dValue !== "" && dValue !== "Other" ? (
              <Item>{dValue}</Item>
            ) : (
              <>
                {openInput === false && (
                  <DefaultItem>Select an Option</DefaultItem>
                )}
              </>
            )}
            {openInput && (
              <OtherInput
                name="referral_code"
                onChange={handleChange}
                placeholder="Please enter the option"
              />
            )}
          </ShowList>
          <ShowListIcon onClick={handleOpenDropdown}>
            {" "}
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
                  <ListItem
                    key={index}
                    onClick={() => handleOptionClick(option.value)}
                  >
                    <>{option.label}</>
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
