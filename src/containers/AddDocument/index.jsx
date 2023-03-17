import { InputWithLabel } from "components/input";
import React, { useState } from "react";
import styled from "styled-components";
import {
  ButtonWrapper,
  CancelWrapper,
  FileButton,
  InputTagWrapper,
  InputWrapper,
  Label,
  LowerWrapper,
  TagText,
  TagTextWrapper,
  TagWrapper,
  Text,
  TextBtnWrapper,
  TextWrapper,
  TopWrapper,
  Wrapper,
  AddWrapper,
  Addcontainer,
  ImgContainer,
  TextContainer,
  DeleteEachContainer,
  DeleteWrapper,
  IconWrapper,
  DeleteText,
  DoneWrapper,
} from "./style";
import Add from "../../../src/asset/svg/Blueadd.svg";
import DeleteIcon from "../../../src/asset/svg/deleteRed.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DocSchema } from "./DocSchema";

const AddDocument = () => {
  // const [fileArr, setFileArr] = useState([]);
  const [documentList, setDocumentList] = useState([{ documentName: "", InputFileTypes: [] }]);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(DocSchema),
  });
  const submitForm = async (formData) => {
    console.log(formData);
  };

  const FileType = [
    {
      id: "1",
      format: "Pdf",
    },
    {
      id: "2",
      format: "Png",
    },
    {
      id: "3",
      format: "Jpeg",
    },
  ];

  const removeTags = (documentIndex, fileTypeIndex) => {
    const updatedDocumentList = documentList.map((doc, index) => {
      if (documentIndex === index) {
        return {
          ...doc,
          InputFileTypes: doc.InputFileTypes.filter((_, i) => i !== fileTypeIndex),
        };
      }
      return doc;
    });
    setDocumentList(updatedDocumentList);
  };

  const handleDocumentAdd = () => {
    setDocumentList([
      ...documentList,
      {
        documentName: "",
        InputFileTypes: [],
      },
    ]);
    //   let emptyArr = []
    // setFileArr(emptyArr)
    };
    

  const HandleFileType = (documentIndex, format) => {
    const updatedDocumentList = documentList.map((doc, index) => {
      if (documentIndex === index) {
        if (doc.InputFileTypes.includes(format)) {
          return doc;
        }
        return {
          ...doc,
          InputFileTypes: [...doc.InputFileTypes, format],
        };
      }
      return doc;
    });
    setDocumentList(updatedDocumentList);
  };

  const deleteEachDoc = (index) => {
    setDocumentList(documentList.filter((_, i) => i !== index));
    };

//     const handleDocumentNameChange = (e, index)=>{
//         const { name, value } = e.target;
//         const list = [...documentList.documentName];
//         list[index][name] = value;
//         setDocumentList(...documentList, documentName : list)
    
// }
    

  return (
    <div>
      {documentList?.map((doc, index) => (
          <Wrapper key={index}
          onSubmit = {handleSubmit(submitForm)}>
          <TopWrapper>
            <Label>Document {index + 1}</Label>
            {documentList.length > 1 && (
              <DeleteWrapper>
                <DeleteEachContainer onClick={() => deleteEachDoc(index)}>
                  <IconWrapper>
                    <img src={DeleteIcon} alt="" />
                  </IconWrapper>
                  <DeleteText>Delete</DeleteText>
                </DeleteEachContainer>
              </DeleteWrapper>
            )}
            <LowerWrapper>
              <InputTagWrapper>
                <TagWrapper>
                  {doc.InputFileTypes.map((fileType, fileTypeIndex) => (
                    <TagTextWrapper key={fileTypeIndex}>
                      <TagText>{fileType}</TagText>
                      <CancelWrapper onClick={() => removeTags(index, fileTypeIndex)}>
                        X
                      </CancelWrapper>
                    </TagTextWrapper>
                  ))}
                </TagWrapper>

                <InputWrapper>
                  <InputWithLabel
                    placeholder="Enter Document name here"
                    type="text"
                    name="title"
                    register={register}
                                  errorMessage={errors.title?.message}
                                  value
                  />
                </InputWrapper>
              </InputTagWrapper>
              <TextBtnWrapper>
                <TextWrapper>Choose acceptable document format(s)</TextWrapper>

                <ButtonWrapper>
                  {FileType.map((fileType) => (
                    <FileButton
                      key={fileType.id}
                      onClick={() => HandleFileType(index, fileType.format)}
                      disabled={doc.InputFileTypes.includes(fileType.format)}
                    >
                      <Text>{fileType.format}</Text>
                    </FileButton>
                  ))}
                </ButtonWrapper>
              </TextBtnWrapper>
            </LowerWrapper>
          </TopWrapper>

          {documentList?.length - 1 === index && (
            <AddWrapper>
              <Addcontainer onClick={handleDocumentAdd}>
                <ImgContainer>
                  <img src={Add} alt="" />
                </ImgContainer>
                <TextContainer>Add New document</TextContainer>
              </Addcontainer>
              <DoneWrapper type ='submit'> Done</DoneWrapper>
            </AddWrapper>
          )}
        </Wrapper>
      ))}
    </div>
  );
};

export default AddDocument;
