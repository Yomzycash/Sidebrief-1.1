import StaffEntityCard from 'components/cards/StaffEntityCard'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { EntityCardDetails } from 'utils/config'

const CountryEntities = () => {
  

  return (
    <Wrapper>
      <CardContainer>
        <CardWrapper>
          {EntityCardDetails.map((entity, index) => (
            <StaffEntityCard
              key={entity.id}
              entityName={entity.entityName}
              shareholderType={entity.entityName}
              entityTimeline={entity.entityTimeline}
              entityType={entity.entityType}
              countryCode={entity.countryCode}
              entityPackage={entity.entityPackage}
            />
          ))}
        </CardWrapper>
      </CardContainer>
    </Wrapper>
  )
}

export default CountryEntities
const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
  border: 1px solid #edf1f7;
  border-top: 0;
  margin-top:0;
`
const CardContainer = styled.div`
  border-top: 0;
  margin: 0 40px;
  width: 100%;
  height: 100%;
  padding-inline: 24px;
  padding-block: 40px;
`
const CardWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto auto;
  gap: 24px;
  @media screen and (min-width: 1900px) {
    grid-template-columns: auto auto auto;
    gap: 24px;
  }
`
