import React from "react";
import editIcon from "../../../../src/asset/svg/editIcon.svg";
import deleteIcon from "../../../../src/asset/svg/deleteIcon.svg";
import {
  Wrapper,
  InnerWrapper,
  TopContainer,
  TextWrapper,
  EditDeleteWrapper,
  EditWrapper,
  EditText,
  DeleteText,
  LowerContainer,
  LinkContainer,
} from "./style.js";
import styled from "styled-components";

const TemplateCard = ({ docDetails }) => {
 
  return (
    <div>
      <Wrapper>
        <InnerWrapper>
          <TopContainer>
            <TextWrapper>National Identification Number</TextWrapper>
            <EditDeleteWrapper>
              <EditWrapper>
                <img src={editIcon} alt="edit" />
                <EditText> Edit </EditText>
              </EditWrapper>
              <EditWrapper>
                <img src={deleteIcon} alt="delete" />
                <DeleteText> Delete </DeleteText>
              </EditWrapper>
            </EditDeleteWrapper>
          </TopContainer>
          {docDetails && <TextContainer>
            <Text>
              {'Pdf'}, {'Png'}, {'Jpeg'}
            </Text>
          </TextContainer>}

          {!docDetails && (
            <LowerContainer>
              <LinkContainer>
                https://www.figma.com/file/GUMOWoToGvpB5PqInnkpTu/Dashboard
              </LinkContainer>
            </LowerContainer>
          )}
        </InnerWrapper>
      </Wrapper>
    </div>
  );
};

export default TemplateCard;
const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
`;
const Text = styled.h3`
  font-weight: 500;
  font-size: 14px;
  line-height: 27px;

  display: flex;
  align-items: center;

  color: #727474;
`;
