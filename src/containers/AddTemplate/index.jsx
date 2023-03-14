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

const AddTemplate = () => {
  const [ templates, setTemplate] = useState([{ templateName: "" }])
  console.log("templates length", templates?.length)

  const handleTemplateAdd = () => {
    setTemplate([
      ...templates,
      {
        templateName:"",
      }
    ])
  }

  const deleteEachDoc = (index) => {
    setTemplate(templates.filter((_, i) => i !== index ))
  }

  return (
    <div>
      {templates?.map((doc, index) => (
        <Wrapper key={index}>
          <TopWrapper>
            <Label>Template Details {index + 1}</Label>
            {templates.length > 1 && (
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
                {/* Template Title field */}
                <InputWrapper>
                  <InputWithLabel
                    placeholder="Enter template title here"
                    type="text"
                    name="name"
                  />
                </InputWrapper>

                 {/* Template url field */}
                <InputWrapper>
                  <InputWithLabel
                    placeholder="Enter template url here"
                    type="text"
                    name="name"
                  />
                </InputWrapper>
              </InputTagWrapper>

             

            </LowerWrapper>
          </TopWrapper>

          {templates?.length - 1 === index && (
            <AddWrapper>
              <Addcontainer onClick={handleTemplateAdd}>
                <ImgContainer>
                  <img src={Add} alt="" />
                </ImgContainer>
                <TextContainer>Add New Template</TextContainer>
              </Addcontainer>
              <DoneWrapper> Done</DoneWrapper>
            </AddWrapper>
          )}
        </Wrapper>
      ))}
    </div>
  )
}

export default AddTemplate;
