import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import { MdClear } from "react-icons/md";

const TagInputWithSearch = ({
  label, // The input label
  list, // The list of options
  MultiSelect, //
  MaxError,
  ExistsError, // The error displayed when typed value does not match the available options
  MatchError, // The error to display when reselecting an already selected value
  EmptyError, // () The error to display when no value is selected
  getValue, // (function): returns the selected tags as an argument
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredList, setFilteredList] = useState(list);
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(false);
  const [value, setValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [keyPressed, setKeyPressed] = useState("");

  const suggestionContainer = useRef();

  // Update list when it chages
  useEffect(() => {
    setFilteredList(list);
  }, list);

  useEffect(() => {
    if (keyPressed === "ArrowDown") {
      if (selectedIndex > 4) {
        suggestionContainer.current.scrollBy(0, 56);
      }
    } else if (keyPressed === "ArrowUp") {
      if (selectedIndex < filteredList.length - 5) {
        suggestionContainer.current.scrollBy(0, -56);
      }
    }
  }, [selectedIndex]);

  // This function handles the input tag change event
  const handleChange = (e) => {
    let value = e.target.value;
    setError("");
    setValue(value);
    setShowSuggestions(true);
    let match = list.filter((element) =>
      element.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredList(match);
  };

  // This fires off when a value is selected
  const setSelected = (value) => {
    if (tags.length > 3) {
      setError(MaxError);
      return "error";
    }
    let tagAlreadyExists = tags.filter(
      (element) => element.toLowerCase() === value.toLowerCase()
    );
    if (tagAlreadyExists.length > 0) {
      setError(ExistsError);
      return "error";
    }
    return "noError";
  };

  // This function handles the input tag keydown event
  const handleKeyDown = (e) => {
    let key = e.key;
    let value = e.target.value;

    if (key !== "Enter") {
      setError("");
      // This runs if an arrow up key is pressed
      if (key === "ArrowUp") {
        setKeyPressed("ArrowUp");
        if (selectedIndex > 0) {
          setSelectedIndex(selectedIndex - 1);
          return;
        }
      }
      // This runs if an arrow down key is pressed
      if (key === "ArrowDown") {
        setKeyPressed("ArrowDown");
        if (selectedIndex < list.length - 1) {
          setSelectedIndex(selectedIndex + 1);
          return;
        }
      }
    }
    // This runs if an Enter key is pressed
    const handleEnter = () => {
      if (MultiSelect) {
        let res = setSelected(value);
        if (res === "error") return;
        let valueCheck = list.filter(
          (element) => element.toLowerCase() === value.toLowerCase()
        );
        if (valueCheck.length !== 0) {
          setTags([...tags, ...valueCheck]);
          setError("");
          return;
        } else if (valueCheck.length === 0) {
          setError(MatchError);
          return;
        }
        if (tags.length === 0) {
          setError(EmptyError);
          return;
        }
      }
    };
    if (selectedIndex !== -1) {
      setValue(filteredList[selectedIndex]);
      setSelectedIndex(-1);
      setShowSuggestions(false);
      handleEnter();
      return;
    }
    handleEnter();
  };

  // This function is fired when a drop down suggestion is clicked
  const handleSuggestionClick = (value) => {
    if (MultiSelect) {
      let res = setSelected(value);
      if (res === "error") return;
      setError("");
      setTags([...tags, value]);
      return;
    }
    setValue(value);
  };

  // This function handles individual tag delete when clear(X) icon is clicked
  const handleTagDelete = (removedTag) => {
    let filteredTags = tags.filter((tag) => tag !== removedTag);
    setTags(filteredTags);
  };

  // This sends back the input data
  useEffect(() => {
    if (getValue) {
      getValue(MultiSelect ? tags : value);
    }
  }, [tags, value]);

  return (
    <Container>
      <Title>
        <span>{label}</span>
        <span>{error}</span>
      </Title>
      <Tags>
        {tags.map((tag, index) => (
          <Tag key={index}>
            <span>{tag}</span> <MdClear onClick={() => handleTagDelete(tag)} />
          </Tag>
        ))}
      </Tags>
      <InputWrapper>
        <Input>
          <input
            type="text"
            placeholder="--"
            value={value}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <div>
            <IoIosArrowDown
              size={16}
              style={{ backgroundColor: "white", padding: "" }}
            />
          </div>
        </Input>
        {showSuggestions && (
          <Suggestions ref={suggestionContainer}>
            {filteredList.map((element, index) => (
              <li
                key={index}
                onMouseDown={() => handleSuggestionClick(element)}
                style={{
                  backgroundColor: selectedIndex === index ? "#edf1f7" : "",
                }}
              >
                {element}
              </li>
            ))}
          </Suggestions>
        )}
      </InputWrapper>
    </Container>
  );
};

export default TagInputWithSearch;

// Styled components
const Container = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
  gap: 8px;
`;
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  color: #4e5152;
  font-size: clamp(12px, 1.5rem, 14px);
  font-weight: 500;
  > span:nth-of-type(2) {
    font-size: clamp(10px, 1.5rem, 12px);
    color: red;
  }
`;
const Tags = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 10px;
`;
const Tag = styled.p`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: clamp(12px, 1.5vw, 14px);
  color: white;
  background-color: #0082aa;
  border-radius: 4px;
  padding: 5px 8px 5px 10px;
`;
const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
`;
const Input = styled.div`
  position: relative;
  display: flex;

  > input {
    border: 1px solid #00c3ff;
    padding: 24px;
    border-radius: 8px;
    height: 48px;
    width: 100%;
    outline: 0;
    transition: 0.3s all ease;

    &:focus {
      box-shadow: -2px -2px 4px 2px #00c3ff28, 2px 2px 4px 2px #00c3ff28;
    }
  }

  > div {
    position: absolute;
    top: 19px;
    right: 25px;
    color: #151717;
  }
`;
const Suggestions = styled.div`
  position: absolute;
  top: 52px;
  display: flex;
  flex-flow: column;
  width: 100%;
  max-height: 296px;
  overflow-y: scroll;
  background-color: white;
  border: 1px solid #edf1f7;
  border-radius: 8px;

  > li {
    display: flex;
    align-items: center;
    min-height: 56px;
    padding: 24px;
    list-style-type: none;
    transition: 0.3s all ease;
    font-size: clamp(13px, 1.5vw, 14px);

    &:hover {
      background-color: #edf1f7;
    }
  }
  &::-webkit-scrollbar {
    width: 6px;
    border-radius: 50%;
    background-color: white;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #edf1f7;
  }
`;
