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
  ImageLink,
} from "./style";

const StaffBankDetails = ({ selectedBank }) => {
  return (
    <Container>
      {selectedBank?.map((selected, index) => (
        <div key={index}>
          <ContentWrapper>
            <TextWithLabel>
              <Label>Bank name</Label>
              <TextWrapper>
                <Text>{selected?.bankName}</Text>
              </TextWrapper>
            </TextWithLabel>
            <TextWithLabel>
              <Label>Bank Code</Label>
              <TextWrapper>
                <Text>{selected?.bankCode}</Text>
              </TextWrapper>
            </TextWithLabel>
          </ContentWrapper>

          <FullContentWrapper>
            <TextWithLabel>
              <Label>Description</Label>
              <TextWrapper>
                <Text>{selected.bankDescription}</Text>
              </TextWrapper>
            </TextWithLabel>
          </FullContentWrapper>

          <ContentWrapper>
            <TextWithLabel>
              <Label>Country</Label>
              <TextWrapper>
                <Text>{selected.bankCountry}</Text>
              </TextWrapper>
            </TextWithLabel>
            <TextWithLabel>
              <Label>Bank Url</Label>
              <TextWrapper>
                <LinkText>{selected.bankUrl}</LinkText>
              </TextWrapper>
            </TextWithLabel>
          </ContentWrapper>

          <FullContentWrapper>
            <TextWithLabel>
              <Label>Image</Label>
              <TextWrapper>
                <ImageLink>{selected.bankLogo}</ImageLink>
              </TextWrapper>
            </TextWithLabel>
          </FullContentWrapper>
        </div>
      ))}
    </Container>
  );
};

export default StaffBankDetails;
