import React, { useState } from "react";
import styled from "styled-components";
import { FiUpload } from "react-icons/fi";
import { ReactComponent as DeleteIcon } from "asset/svg/delete.svg";
import { imageTypeImage } from "utils/config";

const FileUpload = ({
  TopText,
  BottomText,
  errorMsg,
  onChange,
  name,
  fileName,
  type,
  handleRemove,
}) => {
  return (
    <Container>
      <Top htmlFor="file">
        <DocTitle>{TopText}</DocTitle>
        <ErrorWrapper>{errorMsg}</ErrorWrapper>
      </Top>
      <Middle>
        <label htmlFor="file">
          {fileName ? (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                backgroundColor: "#FAFAFA",
                padding: "0px 10px",
              }}
            >
              {imageTypeImage
                .filter((i) => type === i.type)
                .map((d) => (
                  <img
                    src={d.image}
                    alt=""
                    style={{
                      margin: 0,
                      height: "30px",
                      width: "30px",
                    }}
                  />
                ))}
              <UploadedTitle>{fileName}</UploadedTitle>
              <DeleteIcon onClick={handleRemove} />
            </div>
          ) : (
            <span>
              <FiUpload /> Drag & drop, or browse{" "}
            </span>
          )}
          {type && (
            <>
              {imageTypeImage
                .filter((i) => type === i.type)
                .map((d) => (
                  <img
                    src={d.image}
                    alt=""
                    style={{
                      margin: 0,
                      height: "30px",
                      width: "30px",
                    }}
                  />
                ))}
            </>
          )}
        </label>
        <input type="file" id="file" multiple name={name} onChange={onChange} />
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
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
const DocTitle = styled.p`
  font-weight: 500;
  font-size: clamp(12px, 1.5vw, 14px);
  color: #4e5152;
`;
const ErrorWrapper = styled.p`
  color: red;
  font-size: clamp(10px, 1.5vw, 12px); ;
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
  color: #959697;
`;
const UploadedTitle = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: clamp(35px, 3vw, 48px);
  border-radius: 8px;
  font-size: clamp(12px, 1.5vw, 14px);
  font-weight: 400;
  text-decoration-line: underline;
  color: #4e5152;
  border: 1px dashed #edf1f6;
`;
