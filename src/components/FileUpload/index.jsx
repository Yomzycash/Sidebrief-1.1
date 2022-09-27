import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FiUpload } from "react-icons/fi";
import { ReactComponent as DeleteIcon } from "asset/svg/delete.svg";
import { fileFormSchema, imageTypeImage } from "utils/config";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAddMemberKYCMutation } from "services/launchService";
import { useSelector } from "react-redux";
import { store } from "redux/Store";

const FileUpload = ({
  TopText,
  BottomText,
  errorMsg,
  onChange,
  name,
  register,
}) => {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  // } = useForm({
  //   resolver: yupResolver(fileFormSchema),
  // });

  const [fileName, setFileName] = useState("");
  const [dep, setDep] = useState(false);
  const [type, setType] = useState("");

  // const [test, setTest] = useState({
  //   // file1: "",
  //   // file2: "",
  //   // file3: "",
  // });

  const [fileUploadedLink, setFileUploadedLink] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [addMemberKYC] = useAddMemberKYCMutation();
  const generatedLaunchCode = useSelector(
    (store) => store.LaunchReducer.generatedLaunchCode
  );
  const generatedMemberCode = useSelector(
    (store) => store.LaunchReducer.generatedMemberCode
  );
  const handleRemove = () => {
    setFileName("");
  };
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      //Make new FileReader
      let fileReader = new FileReader();
      // Convert the file to base64 text
      fileReader.readAsDataURL(file);
      // on reader load something
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      // if error occurs
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const HandleChange = async (e) => {
    // console.log(Object.keys(test));
    // let objectArr = Object.keys(test);
    // for (let i = 0; i < objectArr.length; i++) {
    //   console.log(objectArr[i]);
    //   if (objectArr[i] === name) {
    //     setFileName(e.target.value);
    //     console.log(fileName);
    //   }
    // }

    // let filePath = [...e.target.value];
    // console.log(filePath);
    // let valueIndex = e.target.value.lastIndexOf("\\");
    // console.log(valueIndex);
    // let fileNameArray = filePath.slice(valueIndex + 1);
    // console.log(fileNameArray);
    // let fileName = fileNameArray.join("");
    // console.log(fileName);
    // setFileName(fileName);
    // console.log(fileName);

    // let test = e.target.value;
    // console.log(e);

    const uploadedFile = e.target.files[0];
    console.log(uploadedFile);
    console.log(uploadedFile.name);
    setFileName(uploadedFile.name);
    setType(uploadedFile.type);
    // setDep(!dep);

    // setDocumentType(uploadedFile.type);
    // const base64 = await getBase64(uploadedFile);
    // console.log(base64);
    // setFileUploadedLink(base64);

    //   // const requiredAddMemberData = {
    //   //   launchCode: generatedLaunchCode,
    //   //   memberCode: generatedMemberCode,
    //   //   memberKYC: {
    //   //     documentType: documentType,
    //   //     documentLink: fileUploadedLink,
    //   //   },
    //   // };
    //   // const response = await addMemberKYC(requiredAddMemberData);
    //   // console.log(response);
    //   // if (response.data) {
    //   // } else if (response.error) {
    //   //   console.log(response.error?.data.message);
    //   //   toast.error(response.error?.data.message);
    //   // }
  };

  // useEffect(() => {
  //   onChange(fileName, name);
  // }, [dep]);
  // useEffect(() => {
  //   onChange(fileName, name);
  // }, [dep]);
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
                      marginRight: 5,
                      height: "30px",
                      width: "30px",
                    }}
                  />
                ))}
              <UploadedTitle>{fileName}</UploadedTitle>
              <DeleteIcon
                onClick={handleRemove}
                style={{
                  marginLeft: "50px",
                }}
              />
            </div>
          ) : (
            <span>
              <FiUpload /> Drag & drop, or browse{" "}
            </span>
          )}
        </label>
        <input
          type="file"
          id="file"
          name={name}
          // {...register(name, {
          //   required: true,
          // })}
          onChange={HandleChange}
        />
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
