import React, { useState } from "react";
import { ArrowDown, DropDownBtn, DropDownContent, DropDownItems, TextContainer } from "./style";
import { IoIosArrowDown } from "react-icons/io";

const CustomDropdown = ({ options, intialvalue, selectedValue }) => {
  const [selected, setSelected] = useState(intialvalue);
  const [isActive, setIsActive] = useState(false);

  //  const options = ['senderID', 'serviceID']
  return (
    <div
      style={{
        position: "relative",
        width: "max-content",
        background: "#FAFAFA",

        border: "1px solid #F1F1F1",
        borderRadius: "12px",
      }}
    >
      <DropDownBtn
        onClick={() => {
          setIsActive(!isActive);
        }}
      >
        <TextContainer> {selected}</TextContainer>
        <ArrowDown onClick={() => setIsActive(!isActive)} isActive={isActive}>
          <IoIosArrowDown />
        </ArrowDown>
      </DropDownBtn>
      {isActive && (
        <DropDownContent>
          {options?.map((option, index) => (
            <DropDownItems
              key={index}
              onClick={(e) => {
                setSelected(option);
                selectedValue(option);
                setIsActive(false);
              }}
            >
              {option}
            </DropDownItems>
          ))}
        </DropDownContent>
      )}
    </div>
  );
};

export default CustomDropdown;