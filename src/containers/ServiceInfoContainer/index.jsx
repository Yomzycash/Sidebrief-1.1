import React from "react";
import {
  AllContainer,
  AllWrapper,
  LastWrapper,
  SingleContainer,
  TitleWrapper,
  Wrapper,
} from "./style";

const ServiceInfoContainer = ({
  serviceDescription,
  serviceCategory,
  serviceCountry,
  servicePrice,
  serviceCurrency,
  serviceTimeline,
}) => {
  return (
    <>
      <AllContainer>
        <AllWrapper>
          <Wrapper>
            <TitleWrapper>Service Description</TitleWrapper>

            <SingleContainer>
              <TitleWrapper>{serviceDescription}</TitleWrapper>
            </SingleContainer>
          </Wrapper>
          <Wrapper>
            <TitleWrapper>Service Category</TitleWrapper>

            <SingleContainer>
              <TitleWrapper>{serviceCategory}</TitleWrapper>
            </SingleContainer>
          </Wrapper>

          <Wrapper>
            <TitleWrapper>Service Country</TitleWrapper>
            <SingleContainer>
              <TitleWrapper>{serviceCountry}</TitleWrapper>
            </SingleContainer>
          </Wrapper>

          <LastWrapper>
            <Wrapper>
              <TitleWrapper>Service Price</TitleWrapper>
              <SingleContainer>
                <TitleWrapper>
                  {servicePrice} {serviceCurrency}
                </TitleWrapper>
              </SingleContainer>
            </Wrapper>
            <Wrapper>
              <TitleWrapper>Service Timeline</TitleWrapper>
              <SingleContainer>
                <TitleWrapper>{serviceTimeline}</TitleWrapper>
              </SingleContainer>
            </Wrapper>
          </LastWrapper>
        </AllWrapper>
      </AllContainer>
    </>
  );
};

export default ServiceInfoContainer;
