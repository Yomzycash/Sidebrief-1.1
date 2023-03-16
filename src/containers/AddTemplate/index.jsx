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
  TopWrapper,
  Wrapper,
  AddWrapper,
  Addcontainer,
  ImgContainer,
  TextContainer,
  DeleteWrapper,
  DeleteEachContainer,
  IconWrapper,
  DeleteText,
  DoneWrapper,
} from "./style";
import Add from "../../../src/asset/svg/Blueadd.svg";
import DeleteIcon from "../../../src/asset/svg/deleteRed.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TemplateSchema } from "./TemplateSchema";

const AddTemplate = () => {
  const [templates, setTemplate] = useState([{ templateName: "" }]);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(TemplateSchema),
  });

  console.log("templates length", templates?.length);

  const handleTemplateAdd = () => {
    setTemplate([
      ...templates,
      {
        templateName: "",
      },
    ]);
  };

  const deleteEachDoc = (index) => {
    setTemplate(templates.filter((_, i) => i !== index));
  };
  const submitForm = async (formData) => {
    console.log(formData);
  };
  


  return (
    <div>
      {templates?.map((doc, index) => (
        <Wrapper key={index} onSubmit={handleSubmit(submitForm)}>
          <TopWrapper>
            <Label>Template Details {index + 1}</Label>
            {templates.length > 1 && (
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
                {/* Template Title field */}
                <InputWrapper>
                  <InputWithLabel
                    placeholder="Enter template title here"
                    type="text"
               
                    name="title"
                    register={register}
                    errorMessage={errors.title?.message}
                  />
                </InputWrapper>

                {/* Template url field */}
                <InputWrapper>
                  <InputWithLabel
                    placeholder="Enter template url here"
                    type="text"
                    name="url"
                    register={register}
                    errorMessage={errors.url?.message}
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
              <DoneWrapper type="submit"> Done</DoneWrapper>
            </AddWrapper>
          )}
        </Wrapper>
      ))}
    </div>
  );
};

export default AddTemplate;
