import React from 'react'
import styled from 'styled-components'
import { AiOutlineArrowRight } from 'react-icons/ai'
import Search from 'components/navbar/Search'

const StaffBusinessCard = ({ number = '37' }) => {
  return (
    <CardContainer>
      <Top>
        <Title>
          Countries <span>({number})</span>
        </Title>
        <ViewWrapper>
          <Text>View all</Text>
          <AiOutlineArrowRight color="#00A2D4" size={24} />
        </ViewWrapper>
      </Top>
      <BottomText>Countries we are currently available in</BottomText>
      <CountryContainer>
        <Search placeholder="Search a country" />
      </CountryContainer>
    </CardContainer>
  )
}

export default StaffBusinessCard
const CardContainer = styled.div`
  max-width: 422px;
  padding: 46px 28px 28px 28px;
  border-left: 1px solid #edf1f7;
`
const Top = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
`

const Title = styled.h2`
  font-weight: 600;
  font-size: 16px;
  line-height: 30px;
  letter-spacing: 0.01em;
  color: #242627;
`
const ViewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 24px;
  gap: 8px;
  cursor: pointer;
`
const Text = styled.h3`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.5px;
  color: #00a2d4;
`
const BottomText = styled.h3`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.02em;
  color: #959697;
`
const CountryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;
`
