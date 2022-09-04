import React, { useRef, useState } from "react";
import styled from "styled-components";

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
        <label htmlFor="file">{fileName ? fileName : "Choose a file"}</label>
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
  gap: 8px;
  max-width: 630px;
`;
const Top = styled.div`
  font-weight: 500;
  font-size: calc(12, 1.5vw, 14px);
  color: #4e5152;
`;
const Middle = styled.div`
  input {
    display: none;
    &::-webkit-file-upload-button {
      display: none;
    }
    label {
      border: 1px dashed #edf1f6;
      width: 100%;
      background-color: yellow;
      font-size: 55px;
    }
  }
`;
const Bottom = styled.div`
  font-size: clamp(11px, 1.5vw, 12px);
  color: #4e5152;
`;
