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
} from "./style";
import Add from "../../../src/asset/svg/Blueadd.svg";

const AddDocument = () => {
  const [fileArr, setFileArr] = useState([]);
  const [documentList, setDocumentList] = useState([{ documentName: "" }]);

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

  const removeTags = (index) => {
    setFileArr(fileArr.filter((el, i) => i !== index));
  };
  const handleDocumentAdd = () => {
      setDocumentList([...documentList, { documentName: "" }]);
    //   let emptyArr = []
    // setFileArr(emptyArr)
  };

  return (
    <div>
      {documentList?.map((single, index) => (
        <Wrapper key={index}>
          <TopWrapper>
            <Label>Document {index + 1}</Label>
            <LowerWrapper>
              <InputTagWrapper>
                <TagWrapper>
                  {fileArr?.map((el, i) => (
                    <TagTextWrapper key={index}>
                      <TagText>{el}</TagText>
                      <CancelWrapper onClick={() => removeTags(index)}>X</CancelWrapper>
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
                  {FileType?.map((el, i) => (
                    <FileButton
                      key={el.id}
                      onClick={() => setFileArr((oldArray) => [...oldArray, el?.format])}
                      disabled={
                        fileArr[0] === el?.format ||
                        fileArr[1] === el?.format ||
                        fileArr[2] === el?.format
                      }
                    >
                      <Text>{el?.format}</Text>
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
                <TextContainer>Add new document</TextContainer>
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

const AddWrapper = styled.div`
  max-width: 410px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 33px;
`;
const Addcontainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 8px;
  cursor: pointer;
`;
const ImgContainer = styled.div``;
const TextContainer = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 27px;

  display: flex;
  align-items: center;

  color: #00a2d4;
`;

const DoneWrapper = styled.button`
  width: 132px;
  height: 34px;
  left: 278px;
  top: 249px;

  background: #f8f8f8;
  /* Blue 2 */

  border: 1px dashed #00a2d4;
  border-radius: 5px;
`;
