import React, { useEffect, useState } from "react";
import { MdClear } from "react-icons/md";
import {
  TagLabel,
  AllWrapper,
  TagWrapper,
  TagInputWrapper,
  TagItem,
  TagText,
  Tagclose,
  TagInputField,
  BottomText,
  TagTop,
} from "./styled.js";

const TagInput = ({
  label = "Business Name",
  bottomText = "Please provide sidebrief with four names you want for your business, in order of preferences",
  getSelectedValues,
  initialValues,
}) => {
  const [tags, setTags] = useState([]);
  const [error, setError] = useState("");

  function handlekeydown(e) {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    if (tags.length >= 4) {
      setError("You cannot have more than 4 business names");
      return;
    }
    if (value.length <= 2) {
      setError("Business name must be at least 3 characters");
      return;
    }
    setTags([...tags, value]);
    e.target.value = "";
  }
  function removeTags(index) {
    setTags(tags.filter((el, i) => i !== index));
    setError("");
  }

  // Return the tags array
  useEffect(() => {
    if (getSelectedValues) getSelectedValues(tags);
  }, [tags]);

  // This sets the values of the tags when the component mounts
  useEffect(() => {
    setTags([...initialValues]);
  }, [initialValues.length]);

  return (
    <>
      <AllWrapper>
        <TagTop>
          <TagLabel> {label} </TagLabel>
          <span>{error}</span>
        </TagTop>

        <TagWrapper>
          {tags.map((tag, index) => (
            <TagItem key={index}>
              <TagText>{tag}</TagText>
              <MdClear size={20} onClick={() => removeTags(index)} />
            </TagItem>
          ))}
        </TagWrapper>

        <TagInputWrapper>
          <TagInputField
            type="text"
            placeholder="Type your Business name "
            onKeyDown={handlekeydown}
          />
        </TagInputWrapper>
        <BottomText>{bottomText}</BottomText>
      </AllWrapper>
    </>
  );
};

export default TagInput;
