import React from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";
import { imageTypeImage } from "utils/config";
import { ReactComponent as DeleteIcon } from "asset/svg/delete.svg";

const KYCFileUpload = ({
  TopText,
  errorMsg,
  BottomText,
  onDrop,
  fileName = "nameTest",
  handleRemove,
}) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  console.log("files", acceptedFiles);
  return (
    <Container>
      <FileSection className="container">
        <Top htmlFor="file">
          <DocTitle>{TopText}</DocTitle>
          <ErrorWrapper>{errorMsg}</ErrorWrapper>
        </Top>
        <FileZone
          {...getRootProps({ className: "dropzone" })}
          backgroundColor={acceptedFiles.length > 0 ? "#FAFAFA" : "ffffff"}
        >
          <input {...getInputProps()} name={fileName} />

          {acceptedFiles && acceptedFiles.length > 0 ? (
            acceptedFiles.map((file) => (
              <NameWrapper>
                {imageTypeImage
                  .filter((i) => file.type === i.type)
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
                <p key={file.path}>{file.path}</p>
                <DeleteWrapper onClick={handleRemove}>
                  <DeleteIcon />
                </DeleteWrapper>
              </NameWrapper>
            ))
          ) : (
            <FileTitle>
              <FiUpload /> Drag & drop, or browse
            </FileTitle>
          )}
        </FileZone>
        <Bottom>
          <p>{BottomText}</p>
        </Bottom>
      </FileSection>
    </Container>
  );
};

export default KYCFileUpload;

const Container = styled.div``;

const FileTitle = styled.p`
  font-size: 14px;
  line-height: 27px;
  align-items: center;
  color: #959697;
  text-align: center;
`;

const FileZone = styled.div`
  border: 1px dashed #edf1f7;
  border-radius: 8px;
  width: 100%;
  background-color: ${(props) => props.backgroundColor};
  padding: 10.5px 16px;
  p {
    color: #959697;
  }
`;

const FileSection = styled.div`
  /* #edf1f6 */
  /* border: 1px dashed red;
  border-radius: 8px; */
`;
const DeleteWrapper = styled.div`
  /* border: solid blue; */
  /* position: absolute;
  right: -30px;
  z-index: 999; */
`;

const NameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  background-color: #fafafa;
  padding: 0px 10px;
  /* border: 2px solid red; */
  position: relative;
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
const Bottom = styled.div`
  font-size: clamp(11px, 1.5vw, 12px);
  color: #959697;
`;
