import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import styled from "styled-components";
import { Container, Options, Select } from "./style";

const CustomDropDown = ({ initialValue, options, onSelect = () => {}, icon }) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(initialValue);

  const optionsRef = useRef();

  const handleSelect = (selected) => {
    setSelectedValue(selected);
    onSelect(selected);
    setOpen(false);
  };

  const toggleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (open) optionsRef.current.focus();
  }, [open]);

  return (
    <Container onBlur={() => setOpen(false)} ref={optionsRef} tabIndex={0}>
      <Select onClick={toggleOpen}>
        {icon} {selectedValue} {!icon && <MdOutlineKeyboardArrowDown />}
      </Select>
      {open && (
        <Options>
          {options?.map((el, i) => (
            <div key={i} onMouseDown={() => handleSelect(el)} tabIndex={0}>
              {el}
            </div>
          ))}
        </Options>
      )}
    </Container>
  );
};

export default CustomDropDown;
