import React from 'react'
import styled from 'styled-components'

const StaffBusinessInfoCard = ({
  businessNames,
  businessObjectives,
  address,
  type,
}) => {
  return (
    <>
      <AllContainer>
        <AllWrapper>
          <Wrapper>
            <TitleWrapper>Business Names</TitleWrapper>
            {Object.keys(businessNames).map((id) => {
              return (
                <SingleContainer key={id}>
                  <TitleWrapper>{businessNames[id]}</TitleWrapper>
                </SingleContainer>
              )
            })}
          </Wrapper>
          <Wrapper>
            <TitleWrapper>Business Objectives</TitleWrapper>
            {Object.keys(businessObjectives).map((id) => {
              if (businessObjectives[id] === 'null') {
                return ``
              }
              return (
                <SingleContainer key={id}>
                  <TitleWrapper>{businessObjectives[id]}</TitleWrapper>
                </SingleContainer>
              )
            })}
          </Wrapper>
          {address ? (
            <Wrapper>
              <TitleWrapper>Business Address</TitleWrapper>
              <SingleContainer>
                <TitleWrapper>
                  {`${address.addressNumber}, ${address.addressStreet},  ${address.addressCity},  ${address.addressState},  ${address.addressCountry}`}
                </TitleWrapper>
              </SingleContainer>
            </Wrapper>
          ) : null}
          <LastWrapper>
            <Wrapper>
              <TitleWrapper>Operational Country</TitleWrapper>
              <SingleContainer>
                <TitleWrapper>{address?.addressCountry}</TitleWrapper>
              </SingleContainer>
            </Wrapper>
            <Wrapper>
              <TitleWrapper>Business Type</TitleWrapper>
              <SingleContainer>
                <TitleWrapper>{type}</TitleWrapper>
              </SingleContainer>
            </Wrapper>
          </LastWrapper>
        </AllWrapper>
      </AllContainer>
    </>
  )
}

export default StaffBusinessInfoCard

const AllContainer = styled.div`
  max-width: 825px;
  background: #ffffff;
  border: 1px solid #edf1f7;
  box-shadow: 0px 10px 10px -5px rgba(149, 150, 151, 0.04);
  border-radius: 16px;
  //padding : 40px 245px 42px 24px;
  padding-block: 40px;
  padding-inline-end: 245px;
  padding-inline-start: 24px;

  @media screen and (max-width: 700px) {
    padding-inline-end: 0;
    padding-inline-start: 0px;
    border: 0;
    padding-block: 0;
    width: 100%;
  }
`
const AllWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  max-width: 800px;
  width: 100%;
  @media screen and (min-width: 701px) {
    max-width: 544px;
  }
  @media screen and (max-width: 850px) {
    max-width: 700px;
    width: 100%;
  }
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  max-width: 800px;
  width: 100%;
  @media screen and (min-width: 701px) {
    max-width: 544px;
  }
`
const TitleWrapper = styled.h3`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #4e5152;
`
const SingleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 24px;
  gap: 16px;
  width: 100%;
  height: 48px;
  background: #fafafa;
  border: 1px solid #edf1f7;
  border-radius: 8px;
`
const LastWrapper = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  width: 100%;
  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
`
