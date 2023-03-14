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
  IconWrapper, 
  DeleteText, 
  DoneWrapper
} from "./style";
import Add from "../../../src/asset/svg/Blueadd.svg";
import DeleteIcon from "../../../src/asset/svg/deleteRed.svg";

const AddDocument = () => {
  // const [fileArr, setFileArr] = useState([]);
  const [documentList, setDocumentList] = useState([{ documentName: "" , InputFileTypes:[] }]);

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
      if(documentIndex === index) {
        return {
          ...doc,
          InputFileTypes: doc.InputFileTypes.filter((_, i) => i !== fileTypeIndex),
        };
      }
      return doc;
    })
    setDocumentList(updatedDocumentList)

  };

  const handleDocumentAdd = () => {
      setDocumentList([
        ...documentList, 
        { 
          documentName: "" , 
          InputFileTypes: [] 
        }
      ]);
    //   let emptyArr = []
    // setFileArr(emptyArr)
  };
  
 
  const HandleFileType = (documentIndex, format) => {
    const updatedDocumentList = documentList.map((doc, index) => {
      if( documentIndex === index) {
        if(doc.InputFileTypes.includes(format)) {
          return doc;
        }
        return { 
          ...doc, 
          InputFileTypes: [...doc.InputFileTypes, format]
        };
      }
      return doc;
    })
    setDocumentList(updatedDocumentList)
  }

  const deleteEachDoc = (index) => {
    setDocumentList(documentList.filter((_, i) => i !== index ))
  }

  return (
    <div>
      {documentList?.map((doc, index) => (
        <Wrapper key={index}>
          <TopWrapper>
            <Label>Document {index + 1}</Label>
            {documentList.length > 1 && (
              <div style={{justifyContent: "flex-end", position:"relative", bottom:"20px"}}>
                <DeleteEachContainer onClick={() => deleteEachDoc(index)}> 
                <IconWrapper>
                  <img src={DeleteIcon} alt="" />
                </IconWrapper>
                <DeleteText>Delete</DeleteText>
              </DeleteEachContainer>
              </div>
              
            )}
            <LowerWrapper>
              <InputTagWrapper>
                <TagWrapper>
                  {doc.InputFileTypes.map((fileType, fileTypeIndex) => (
                    <TagTextWrapper key={fileTypeIndex}>
                      <TagText>{fileType}</TagText>
                      <CancelWrapper onClick={() => removeTags(index, fileTypeIndex)}>X</CancelWrapper>
                    </TagTextWrapper>
                  ))}
                </TagWrapper>

                <InputWrapper>
                  <InputWithLabel placeholder="Enter Document name here" type="text" name="name" />
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
              <DoneWrapper> Done</DoneWrapper>
            </AddWrapper>
          )}
        </Wrapper>
      ))}
    </div>
  );
};

export default AddDocument;

