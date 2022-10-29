import React from 'react'
import styled from 'styled-components'

const BusinessesCard = ({ name, type }) => {
  return (
    <Wrapper>
      <InnerContainer>
        <NameWrapper>{name}</NameWrapper>
        <TypeWrapper>
          <TypeContent>{type}</TypeContent>
        </TypeWrapper>
      </InnerContainer>
    </Wrapper>
  )
}

export default BusinessesCard
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding: 24px 16px;
  background: #ffffff;
  border: 1px solid #edf1f7;
  box-shadow: 0px 10px 10px -5px rgba(149, 150, 151, 0.04);
  border-radius: 16px;
`
const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  gap: 24px;

  width: 100%;
  min-height: 42px;
`
const NameWrapper = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.02em;
  color: #242627;
`
const TypeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 16px;
  gap: 10px;
  background: rgba(0, 212, 72, 0.05);
  border-radius: 12px;
`
const TypeContent = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.01em;

  color: #00a2d4;
`