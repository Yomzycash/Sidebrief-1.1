import React from "react";
import { useSelector } from "react-redux";
import {
  Container,
  ContentWrapper,
  FullContentWrapper,
  Label,
  LinkText,
  Text,
  TextWithLabel,
  TextWrapper,
} from "./style";

const StaffRewardDetails = ({ selectedReward }) => {
  return (
    <Container>
      {selectedReward?.map((selected, idex) => (
        <>
          <ContentWrapper>
            <TextWithLabel>
              <Label>name</Label>
              <TextWrapper>
                <Text>
                  Get {selected?.rewardName} off your first year with{" "}
                  {selected?.rewardPartner}
                </Text>
              </TextWrapper>
            </TextWithLabel>
            <TextWithLabel>
              <Label>Partner</Label>
              <TextWrapper>
                <Text>{selected?.rewardPartner}</Text>
              </TextWrapper>
            </TextWithLabel>
          </ContentWrapper>
          <FullContentWrapper>
            <TextWithLabel>
              <Label>Description</Label>
              <TextWrapper>
                <Text>{selected.rewardDescription}</Text>
              </TextWrapper>
            </TextWithLabel>
          </FullContentWrapper>
          <ContentWrapper>
            <TextWithLabel>
              <Label>Category</Label>
              <TextWrapper>
                <Text>{selected.rewardCategory}</Text>
              </TextWrapper>
            </TextWithLabel>
            <TextWithLabel>
              <Label>Code</Label>
              <TextWrapper>
                <Text>{selected.rewardID}</Text>
              </TextWrapper>
            </TextWithLabel>
          </ContentWrapper>
          <ContentWrapper>
            <TextWithLabel>
              <Label>Link</Label>
              <TextWrapper>
                <LinkText>{selected.rewardLink}</LinkText>
              </TextWrapper>
            </TextWithLabel>
            <TextWithLabel>
              <Label>Image</Label>
              <TextWrapper>
                <LinkText>{selected.rewardImage}</LinkText>
              </TextWrapper>
            </TextWithLabel>
          </ContentWrapper>
        </>
      ))}
    </Container>
  );
};

export default StaffRewardDetails;
