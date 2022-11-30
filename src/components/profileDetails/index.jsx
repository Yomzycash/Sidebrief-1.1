import { TextContainer } from "components/cards/RewardCard/styles";
import { InputWithLabel } from "components/input";
import React from "react";
import {
  AlternateEmailDetails,
  EmailDetails,
  EmailWrapper,
  PasswordDetails,
  PhotoDetails,
  PhotoImage,
  ProfileContainer,
  ProfileLeftContainer,
  ProfileRightContainer,
  TextParagraph,
  TextTitle,
} from "./style";

const ProfileDetails = () => {
  return (
    <ProfileContainer>
      <PhotoDetails>
        <TextContainer>
          <TextTitle>Your Photo</TextTitle>
          <TextParagraph>This will be displayed on your profile</TextParagraph>
        </TextContainer>
        <PhotoImage></PhotoImage>
      </PhotoDetails>

      <EmailDetails>
        <TextContainer>
          <TextTitle>Work email address</TextTitle>
          <TextParagraph>This cannot be changed by you</TextParagraph>
        </TextContainer>
        <EmailWrapper>
          <p>akinyemibamidele2@gmail.com</p>
        </EmailWrapper>
      </EmailDetails>

      <AlternateEmailDetails>
        <TextContainer>
          <TextTitle>Alternate email address</TextTitle>
          <TextParagraph>
            This will be used to contact you as an alternate means
          </TextParagraph>
        </TextContainer>
        <InputWithLabel placeholder={"akinyemibamidele2@gmail.com"} />
      </AlternateEmailDetails>

      <PasswordDetails>
        <TextContainer>
          <TextTitle>Password</TextTitle>
        </TextContainer>
        <InputWithLabel password placeholder={"123456"} />
      </PasswordDetails>
    </ProfileContainer>
  );
};

export default ProfileDetails;
