import React from 'react'
import styled from 'styled-components'

const CountryDetails = ({
  countryName = 'Ghana',
  countryCode = '+234',
  countryCurrency = 'Naira',
  countryISO = 'NGA',
  date = '12th August, 2022',
  name = ' Oluwole Sayo',
}) => {
  return (
    <Container>
      <Wrapper>
        <LeftContainer>
          <ContentContainer>
            <ContentWrapper>
              <Label>Country Name</Label>
              <TextContainer>
                <TextWrapper>{countryName}</TextWrapper>
              </TextContainer>
            </ContentWrapper>
            <Flex>
              <ContentWrapper>
                <Label>Country Code</Label>
                <TextContainer>
                  <TextWrapper>{countryCode}</TextWrapper>
                </TextContainer>
              </ContentWrapper>
              <ContentWrapper>
                <Label>Country ISO</Label>
                <TextContainer>
                  <TextWrapper>{countryISO}</TextWrapper>
                </TextContainer>
              </ContentWrapper>
            </Flex>
            <Flex>
              <ContentWrapper>
                <Label>Country Currency</Label>
                <TextContainer>
                  <TextWrapper>{countryCurrency}</TextWrapper>
                </TextContainer>
              </ContentWrapper>
              <ContentWrapper>
                <Label>Country ISO</Label>
                <TextContainer>
                  <TextWrapper>{countryISO}</TextWrapper>
                </TextContainer>
              </ContentWrapper>
            </Flex>
          </ContentContainer>
        </LeftContainer>
        <RightContainer>
          <InnerWrapper>
            <Circle />
            <LastWrapper>
              <StatusWrapper>
                <Text>created</Text>
              </StatusWrapper>
              <LightText>{date}</LightText>
              <LightText>by {name}</LightText>
            </LastWrapper>
          </InnerWrapper>
        </RightContainer>
      </Wrapper>
      <BottomWrapper>
        <TitleWrapper>Update Changes</TitleWrapper>
      </BottomWrapper>
    </Container>
  )
}

export default CountryDetails
const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: column;
  gap: 40px;
  height: 100%;
`

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
`
const LeftContainer = styled.div`
  max-width: 825px;
  padding-block: 40px;
  padding-inline: 24px 267px;

  background: #ffffff;

  border: 1px solid #edf1f7;
  box-shadow: 0px 10px 10px -5px rgba(149, 150, 151, 0.04);
  border-radius: 16px;
`
const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;
`
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;

  width: 544px;
`
const Label = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #4e5152;
`
const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 24px;
  width: 100%;
  background: #fafafa;
  border: 1px solid #edf1f7;
  border-radius: 8px;
`
const TextWrapper = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  align-items: center;
  color: #242627;
`
const Flex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;

  width: 100%;
`
const RightContainer = styled.div`
  max-width: 275px;
  width: 100%;
  background: #ffffff;
  padding-inline-start: 24px;
  padding-block: 40px;
  border: 1px solid #edf1f7;
  box-shadow: 0px 10px 10px -5px rgba(149, 150, 151, 0.04);
  border-radius: 16px;
`
const InnerWrapper = styled.div`
  display: flex;

  gap: 16px;
`

const Circle = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #00a2d4;
`
const LastWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
`
const StatusWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 4px 16px;
  gap: 10px;

  width: 90px;

  background: rgba(0, 162, 212, 0.05);
  border-radius: 12px;
`
const Text = styled.h4`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.01em;

  color: #00a2d4;
`
const LightText = styled.h4`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #4e5152;
`
const BottomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 24px;
  gap: 10px;
  width: fit-content;
  min-height: 27px;
  background: rgba(0, 162, 212, 0.72);
  border-radius: 8px;
  margin-left: 24px;
  cursor: pointer;
`
const TitleWrapper = styled.h4`
  font-weight: 500;
  font-size: 14px;
  line-height: 27px;
  /* identical to box height, or 193% */

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.5px;

  color: rgba(255, 255, 255, 0.64);
`
