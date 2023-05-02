import React, { useEffect, useRef, useState } from "react";
import { ArrowDown, DropDownBtn, DropDownContent, DropDownItems, TextContainer } from "./style";
import { IoIosArrowDown } from "react-icons/io";

const CustomDropdown = ({ options, intialvalue, selectedValue, mobile }) => {
  const [selected, setSelected] = useState(intialvalue);
  const [isActive, setIsActive] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Close the dropdown here
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [dropdownRef]);

  //  const options = ['senderID', 'serviceID']
  return (
    <div
      ref={dropdownRef}
      style={{
        position: "relative",
        width: "max-content",
        background: !mobile ? "#FAFAFA" : "white",

        border: !mobile ? "1px solid #F1F1F1" : "none",
        borderRadius: !mobile ? "12px" : "0px",
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
