import React from 'react'
import styled from 'styled-components'
import NigeriaFlag from '../../asset/images/NigeriaFlag.png'
import { FiArrowLeft } from 'react-icons/fi'
import { ReactComponent as Hide } from 'asset/svg/Hide.svg'
import { ReactComponent as GladeIcon } from '../../../src/asset/images/Glade.svg'
import ActiveNav from 'components/navbar/ActiveNav'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'

const RewardHeaderDetail = () => {
  const [subHeaderHovered, setSubHeaderHovered] = useState(false)
  return (
    <Container>
      <BackContainer>
        <FiArrowLeft color="#151717" size={24} />
        <Text>Back to Rewards</Text>
      </BackContainer>
      <TopContainer>
        <TitleContainer>
          <LHS>
            <GladeIcon />
            <DetailWrappper>
              <LittleWrapper>
                {' '}
                <TopText>
                  Get 25% off your first year of using Glade Finance
                </TopText>
                <MiddleText>Glade Finance</MiddleText>
              </LittleWrapper>
              <BottomText>
                Created 12th August, 2022 by Esther Ashimolowo
              </BottomText>
            </DetailWrappper>
          </LHS>
          <RHS>
            {' '}
            <RightWrapper>
              <Hide />
              <BlockText>Make Public</BlockText>
            </RightWrapper>
          </RHS>
        </TitleContainer>

        <SubHeader
          onMouseEnter={() => setSubHeaderHovered(true)}
          onMouseLeave={() => setSubHeaderHovered(false)}
          $hovered={subHeaderHovered}
        >
          <ActiveNav
            text={'Reward Details'}
            path={`/staff-dashboard/reward/details`}
          />
          <ActiveNav
            text={'Analytics'}
            path={`/staff-dashboard/reward/analytics`}
          />
        </SubHeader>

        <Outlet />
      </TopContainer>
    </Container>
  )
}

export default RewardHeaderDetail
const Container = styled.header`
  width: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 40px;

  border-top: none;
`
const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid #edf1f7;
  border-radius: 16px;
`

const Top = styled.div`
  padding-inline: 40px;
  padding-block: 40px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const BackContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  align-self: flex-start;

  @media screen and (max-width: 700px) {
    display: none;
  }
`

const Text = styled.p`
  font-family: 'BR Firma';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #151717;
`

const TitleContainer = styled.div`
  padding-block: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 40px;
  width: 100%;
`
const DetailWrappper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`
const LittleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`
const TopText = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;

  color: #242627;
`
const MiddleText = styled.h4`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;

  color: #4e5152;
`
const BottomText = styled.h4`
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;

  color: #959697;
`

const ImageWrapper = styled.div``
const CountryName = styled.h2`
  font-family: 'BR Firma';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */

  /* Grey 3 */

  color: #4e5152;
`

const LHS = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 24px;
`

const RHS = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 24px;
  width: 159px;
  height: 44px;
  background-color: #00a2d4;
  border-radius: 8px;
`

const RightWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 24px 12px;
  gap: 8px;
  width: inherit;
`
const BlockText = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.5px;

  color: #ffffff;
`

const SubHeader = styled.div`
  border-top: 1px solid #edf1f7;
  display: flex;
  gap: 24px;
  padding-inline: 24px;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    height: 5px;
    background: ${({ $hovered }) => ($hovered ? '#aaaaaa33' : '#fff')};
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ $hovered }) => ($hovered ? '#aaaaaa' : '#fff')};
    border-radius: 15px;
  }

  @media screen and (max-width: 700px) {
    /* border-width: 1px 0px;
      border-style: solid; */
    border-bottom: 1px solid #edf1f7;
    /* border-color: #edf1f7; */
  }
`
