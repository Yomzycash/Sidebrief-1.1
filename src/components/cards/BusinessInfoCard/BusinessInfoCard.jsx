import React from 'react'
import { ReactComponent as EditIcon } from 'asset/Launch/Edit.svg'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const BusinessInfoCard = () => {
  const LaunchApplicationInfo = useSelector((store) => store.LaunchReducer)
  console.log(LaunchApplicationInfo)
  let navigate = useNavigate()
  const handleNavigate = () => {
    navigate('/launch/address')
  }
  return (
    <>
      <Wrapper>
        <TitleWrapper>
          <Title>Business Information</Title>
          <EditWrapper onClick={handleNavigate}>
            <EditIcon />
            <EditText>Edit</EditText>
          </EditWrapper>
        </TitleWrapper>
        <LowerContainer>
          <SubContainer>
            <Heading>Business Names in order of preference</Heading>
            <TagContainer>
              {LaunchApplicationInfo.businessNames.map(
                (businessName, index) => (
                  <>
                    <TagWrapper>
                      <Tag key={index}> {businessName}</Tag>
                    </TagWrapper>
                  </>
                ),
              )}
            </TagContainer>
          </SubContainer>
          <SubContainer>
            <Heading>Business Objectives</Heading>
            <TagContainer>
              {LaunchApplicationInfo.selectedObjectives.map(
                (objective, index) => (
                  <>
                    <TagWrapper>
                      <Tag key={index}> {objective}</Tag>
                    </TagWrapper>
                  </>
                ),
              )}
            </TagContainer>
          </SubContainer>
        </LowerContainer>
      </Wrapper>
    </>
  )
}

export default BusinessInfoCard

const Wrapper = styled.div`
  background: #ffffff;
  border: 1px solid #edf1f7;
  border-radius: 16px;
  padding: 40px;
  width: 100%;
`
const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`
const Title = styled.h3`
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  color: #151717;
`
const EditWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  cursor: pointer;
`

const EditText = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 27px;
  color: #00a2d4;
`

const LowerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 40px;
`
const SubContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  column-gap: 4px;
  width: 100%;
`
const Heading = styled.h3`
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #959697;
`
const TagContainer = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  row-gap: 4px;
  column-gap: 16px;
`
const TagWrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  padding: 11px 8px;
  background: #0082aa;
  border-radius: 8px;
  justify-content: space-between;
  align-items: center;
  color: #fafafa;
`

const Tag = styled.span`
  font-weight: 400;
  font-size: 14px;
  color: #fafafa;
`
