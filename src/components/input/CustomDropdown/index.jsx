import React, { useEffect, useRef, useState } from "react";
import { ArrowDown, DropDownBtn, DropDownContent, DropDownItems, DropDownMobileContent, TextContainer } from "./style";
import { IoIosArrowDown } from "react-icons/io";
import styled from "styled-components";

const CustomDropdown = ({
  options,
  intialvalue,
  selectedValue,
  mobile,
  originalOptions,
  realSelectedValue,
  initialTitle,
  initialLength,
}) => {
  const [selected, setSelected] = useState(intialvalue);
  const [newSelected, setNewSelected] = useState({
    title: initialTitle,
    totalLength: initialLength,
  });
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
        {mobile ? (
          <TopSelected>
            <SubTopSelected>
              <TextContainer> {newSelected?.title}</TextContainer>
              {newSelected?.totalLength > 0 && (
                <LengthContainer>
                  <LengthText>{newSelected?.totalLength}</LengthText>
                </LengthContainer>
              )}
            </SubTopSelected>
            <ArrowDown onClick={() => setIsActive(!isActive)} isActive={isActive}>
              <IoIosArrowDown />
            </ArrowDown>
          </TopSelected>
        ) : (
          <>
            <TextContainer> {selected}</TextContainer>
            <ArrowDown onClick={() => setIsActive(!isActive)} isActive={isActive}>
              <IoIosArrowDown />
            </ArrowDown>
          </>
        )}
      </DropDownBtn>
      {isActive && !mobile && (
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
      {isActive && mobile && (
        <DropDownMobileContent>
          {originalOptions?.map((option, index) => (
            <SubTopSelected
              key={index}
              onClick={(e) => {
                setNewSelected(option);
                realSelectedValue(option);
                setIsActive(false);
              }}
            >
              <DropDownItems>{option?.title}</DropDownItems>
              {option?.totalLength > 0 && (
                <LengthContainer>
                  <LengthText>{option?.totalLength}</LengthText>
                </LengthContainer>
              )}
            </SubTopSelected>
          ))}
        </DropDownMobileContent>
      )}
    </div>
  );
};

export default CustomDropdown;

const TopSelected = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 8px 0px;
  gap: 8px;
`;
const SubTopSelected = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 8px 0px;
  gap: 8px;
`;
const LengthContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4px 12px;
  gap: 10px;

  width: 39px;
  height: 22px;

  background: rgba(0, 162, 212, 0.1);
  border-radius: 10px;
`;

const LengthText = styled.h3`
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  /* identical to box height, or 150% */

  display: flex;
  align-items: center;

  /* Blue 2 */

  color: #00a2d4;
`;
