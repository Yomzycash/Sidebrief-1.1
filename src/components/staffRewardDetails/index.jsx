import React from "react";
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

const StaffRewardDetails = () => {
  return (
    <Container>
      <ContentWrapper>
        <TextWithLabel>
          <Label>name</Label>
          <TextWrapper>
            <Text>Get 25% off your first year with Glade Finance</Text>
          </TextWrapper>
        </TextWithLabel>
        <TextWithLabel>
          <Label>Partner</Label>
          <TextWrapper>
            <Text>Glade Fiance</Text>
          </TextWrapper>
        </TextWithLabel>
      </ContentWrapper>
      <FullContentWrapper>
        <TextWithLabel>
          <Label>Description</Label>
          <TextWrapper>
            <Text>Get 25% off your first year with Glade Finance</Text>
          </TextWrapper>
        </TextWithLabel>
      </FullContentWrapper>
      <ContentWrapper>
        <TextWithLabel>
          <Label>Category</Label>
          <TextWrapper>
            <Text>Get 25% off your first year with Glade Finance</Text>
          </TextWrapper>
        </TextWithLabel>
        <TextWithLabel>
          <Label>Code</Label>
          <TextWrapper>
            <Text>KLMAIRS56</Text>
          </TextWrapper>
        </TextWithLabel>
      </ContentWrapper>
      <ContentWrapper>
        <TextWithLabel>
          <Label>Link</Label>
          <TextWrapper>
            <LinkText>
              https://www.gladefinance.com/sidebriefXgladereward
            </LinkText>
          </TextWrapper>
        </TextWithLabel>
        <TextWithLabel>
          <Label>Image</Label>
          <TextWrapper>
            <LinkText>
              https://www.gladefinance.com/sidebriefXgladereward
            </LinkText>
          </TextWrapper>
        </TextWithLabel>
      </ContentWrapper>
    </Container>
  );
};

export default StaffRewardDetails;
