import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AiOutlineArrowRight } from 'react-icons/ai'
import Search from 'components/navbar/Search'
import {
  useGetAllCountriesQuery,
  useGetAllTheEntitiesQuery,
} from 'services/launchService'

const StaffBusinessCard = ({ country, entity }) => {
  const { data, error, isLoading, isSuccess } = useGetAllCountriesQuery()
  const allEntities = useGetAllTheEntitiesQuery()
  //console.log(allEntities)
  const [countries, setCountries] = useState([])
  const [entities, setEntities] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [SearchEntityTerm, setSearchEntitityTerm] = useState('')

  //console.log(data)

  useEffect(() => {
    if (data) {
      setCountries(data)
    }
  }, [data])
  useEffect(() => {
    if (allEntities.data) {
      setEntities(allEntities.data)
    }
  }, [allEntities.data])
  //   console.log(countries)

  //removing duplicates from allEntities
  const filteredEntities = []
  const unique = entities.filter((element) => {
    const isDuplicate = filteredEntities.includes(element.entityName)
    if (!isDuplicate) {
      filteredEntities.push(element.entityName)
    }
  })
  console.log(filteredEntities)
  return (
    <CardContainer>
      <Top>
        {country && (
          <Title>
            Countries <span>({countries.length})</span>
          </Title>
        )}
        {entity && (
          <Title>
            Business Entities <span>({filteredEntities.length})</span>
          </Title>
        )}
        <ViewWrapper>
          <Text>View all</Text>
          <AiOutlineArrowRight color="#00A2D4" size={24} />
        </ViewWrapper>
      </Top>
      {country && (
        <BottomText>Countries we are currently available in</BottomText>
      )}
      {entity && (
        <BottomText>Entities we currently provide our services in</BottomText>
      )}

      <CountryContainer>
        {country && (
          <Search
            placeholder="Search a country"
            onChange={(e) => {
              setSearchTerm(e.target.value)
            }}
          />
        )}

        {country && (
          <LowerContainer>
            {countries
              .filter((country) => {
                if (searchTerm == '') {
                  return country.countryName
                } else if (
                  country.countryName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return country.countryName
                }
              })
              .map((country) => {
                return (
                  <CountryWrapper key={country.countryISO}>
                    <TextWrapper>{country.countryName}</TextWrapper>
                  </CountryWrapper>
                )
              })}
          </LowerContainer>
        )}
        {entity && (
          <Search
            placeholder="Search an entity"
            onChange={(e) => {
              setSearchEntitityTerm(e.target.value)
            }}
          />
        )}
        {entity && (
          <LowerContainer>
            {' '}
            {filteredEntities
              .filter((entity) => {
                if (SearchEntityTerm == '') {
                  return entity
                } else if (
                  entity.toLowerCase().includes(SearchEntityTerm.toLowerCase())
                ) {
                  return entity
                }
              })
              .map((entity, index) => {
                return (
                  <CountryWrapper key={index}>
                    <TextWrapper>{entity}</TextWrapper>
                  </CountryWrapper>
                )
              })}
          </LowerContainer>
        )}
      </CountryContainer>
    </CardContainer>
  )
}

export default StaffBusinessCard
const CardContainer = styled.div`
  max-width: 422px;
  padding: 46px 28px 28px 28px;
  border-left: 1px solid #edf1f7;
  border-width: 0px 0px 0px 1px;
  border-style: solid;
  border-color: #edf1f7;
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
  margin-bottom: 24px;
`
const CountryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;
`
const LowerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
  width: 100%;
`
const CountryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 24px;
  width: 100%;
  background: #ffffff;
  border: 1px solid #edf1f7;
  border-radius: 20px;
`
const TextWrapper = styled.h3`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #242627;
`
