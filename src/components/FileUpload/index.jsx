import React, { useRef, useState } from "react";
import styled from "styled-components";
import { FiUpload } from "react-icons/fi";

const FileUpload = ({ TopText, BottomText }) => {
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    let filePath = [...e.target.value];
    let valueIndex = e.target.value.lastIndexOf("\\");
    let fileNameArray = filePath.slice(valueIndex + 1);
    let fileName = fileNameArray.join("");
    setFileName(fileName);
    console.log(fileName);
  };

  return (
    <Container>
      <Top htmlFor="file">{TopText}</Top>
      <Middle>
        <label htmlFor="file">
          {fileName ? (
            fileName
          ) : (
            <span>
              <FiUpload /> Choose a file
            </span>
          )}
        </label>
        <input type="file" id="file" name="file" onChange={handleChange} />
      </Middle>
      <Bottom>
        <p>{BottomText}</p>
      </Bottom>
    </Container>
  );
};

export default FileUpload;

const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  gap: 8px;
  max-width: 630px;
`;
const Top = styled.div`
  font-weight: 500;
  font-size: calc(12px, 1.5vw, 14px);
  color: #4e5152;
`;
const Middle = styled.div`
  display: flex;
  width: 100%;
  input {
    display: none;
    &::-webkit-file-upload-button {
      display: none;
    }
  }
  label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: clamp(35px, 3vw, 48px);
    border-radius: 8px;
    font-size: clamp(12px, 1.5vw, 14px);
    font-weight: 400;
    color: #959697;
    border: 1px dashed #edf1f6;
    span {
      display: flex;
      gap: 9px;
    }
  }
`;
const Bottom = styled.div`
  font-size: clamp(11px, 1.5vw, 12px);
  color: #4e5152;
`;
