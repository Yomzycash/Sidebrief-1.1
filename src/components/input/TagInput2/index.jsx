import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Container, Options, Select, Tags } from "./styled";

const TagInput2 = ({
  initialValue,
  options,
  onSelect = () => {},
  icon,
  style,
  selectStyle,
  optionsStyle,
  left,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(initialValue);
  const [tags, setTags] = useState([]);

  const optionsRef = useRef();

  const handleSelect = (selected) => {
    setSelectedValue(selected);
    onSelect(selected);
    setOpen(false);
  };

  const toggleOptions = () => {
    // setOpen(!open);
  };

  const handleFocus = () => {
    if (!open) setOpen(true);
  };

  useEffect(() => {
    if (open) optionsRef.current.focus();
  }, [open]);

  return (
    <Container onBlur={() => setOpen(false)} ref={optionsRef} tabIndex={0} style={style}>
      <Select onClick={toggleOptions} style={selectStyle}>
        {left}
        <Tags>
          {tags?.map((el) => (
            <span>{el}</span>
          ))}
        </Tags>
        <input type="text" />
        {icon ? icon : <MdOutlineKeyboardArrowDown />}
      </Select>
      {open && (
        <Options style={optionsStyle}>
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

export default TagInput2;
