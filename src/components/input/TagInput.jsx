import React, { useState } from "react";
import {
  TagLabel,
  AllWrapper,
  TagWrapper,
  TagInputWrapper,
  TagItem,
  TagText,
  Tagclose,
  TagInputField,
  BottomText
} from "./styled.js";



const TagInput = ({ 
  label = "Business Name",
  bottomText = "Please provide sidebrief with four names you want for your business, in order of preferences"
 }) => {
  const [tags, setTags] = useState([]);

  function handlekeydown(e) {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    e.target.value = "";
  }
  function removeTags(index) {
    setTags(tags.filter((el, i) => i !== index));
  }

  return (
    <>
      <AllWrapper>
        <TagLabel>{label}</TagLabel>

        <TagWrapper>
          {tags.map((tag, index) => (
            <TagItem key={index}>
              <TagText>{tag}</TagText>
              <Tagclose onClick={() => removeTags(index)}>&times;</Tagclose>
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
