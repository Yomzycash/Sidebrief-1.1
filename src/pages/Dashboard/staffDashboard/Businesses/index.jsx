import StaffStatusCard from 'components/cards/BusinessAddressCard/StaffStatusCard'
import StaffBusinessCard from 'components/cards/StaffBusinessCard/StaffBusinessCard'
import Navbar from 'components/navbar'
import {BusinessHomeTable } from 'components/Staff/Tables'
import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { ReactComponent as AddIcon } from '../../../../../src/asset/svg/Plus.svg'
import StaffSidebar from 'components/sidebar/StaffSidebar'

const StaffBusinesses = (props) => {
  const layoutInfo = useSelector((store) => store.LayoutInfo)
  const { sidebarWidth } = layoutInfo

  const location = useLocation()
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate('/staff-dashboard/businesses/registration/all')
   }



  return (
    <Dashboard>
      <Navbar
        dashboard
        imgStyles={{ maxWidth: '100px' }}
        style={{ padding: '12px 24px' }}
      />
      <Body>
        <BodyLeft>
          <StaffSidebar />
        </BodyLeft>
        <BodyRight SidebarWidth={sidebarWidth}>
          <LeftContainer>
            <TopContainer>
              <SideWrapper>
                <Heading>Businesses</Heading>
                <LowerText>Jump right back in today</LowerText>
              </SideWrapper>
              <MonthWrapper>
                <TextDropdown>
                  <Text> This Month</Text>
                  <RiArrowDropDownLine />
                </TextDropdown>
              </MonthWrapper>
            </TopContainer>
            <MiddleContainer>
              <TitleWrapper>Business Summary</TitleWrapper>
              <RegistrationBlock>
                <AddIcon color={'#FFFFFF'} />
                <TextContent>Start Registration</TextContent>
              </RegistrationBlock>
            </MiddleContainer>
            <CardWrapper>
              <StaffStatusCard />
            </CardWrapper>

            <BusinessHomeTable
              data={[
                {
                  name: 'Ayomide Constructions and Husbands',
                  country: 'Nigeria',
                  date: '27/09/2022',
                },
                {
                  name: 'Slideshow Africa',
                  country: 'Nigeria',
                  date: '27/09/2022',
                },
                {
                  name: 'Image Deity Industries',
                  country: 'Nigeria',
                  date: '27/09/2022',
                },
                {
                  name: 'Bamidele Electronics and Appliances',
                  country: 'Nigeria',
                  date: '27/09/2022',
                },
                {
                  name: 'Bamidele Electronics and Appliances',
                  country: 'Nigeria',
                  date: '27/09/2022',
                },
                {
                  name: 'Image Deity Industries',
                  country: 'Nigeria',
                  date: '27/09/2022',
                },
                {
                  name: 'Ayomide Constructions and Husbands',
                  country: 'Nigeria',
                  date: '27/09/2022',
                },
              ]}
            />
          </LeftContainer>
          <RightContainer>
            <StaffBusinessCard country />
            <StaffBusinessCard entity />
          </RightContainer>
        </BodyRight>
      </Body>
    </Dashboard>
  )
}

export default StaffBusinesses
const Dashboard = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  flex: 1;
`
const Body = styled.div`
  display: flex;
  flex-flow: row nowrap;
`
const BodyLeft = styled.div``

const BodyRight = styled.div`
  display: flex;
  flex-flow: row;
  width: calc(100% - ${({ SidebarWidth }) => SidebarWidth});
  padding: 0px 0px 0px 40px;
  gap: 40px;

  @media screen and (max-width: 700px) {
    width: 100%;
  }
`
const LeftContainer = styled.div`
  width: 60%;
  margin-top: 40px;
`
const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`
const TopContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-block-end: 40px;
`
const SideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`
const Heading = styled.h3`
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 0.01em;
  color: #242627;
`
const LowerText = styled.h4`
  font-weight: 500;
  font-size: 14px;
  line-height: 26px;

  letter-spacing: 0.01em;

  color: #4e5152;
`
const MonthWrapper = styled.div`
  background: #f8f8f8;
  border-radius: 12px;
  width: 151px;
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
const TextDropdown = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 8px;
`
const Text = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.02em;
  color: #4e5152;
`
const MiddleContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-block-end: 24px;
`
const TitleWrapper = styled.h3`
  font-weight: 600;
  font-size: 16px;
  line-height: 30px;
  letter-spacing: 0.01em;
  color: #242627;
`
const RegistrationBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 24px;
  gap: 8px;
  width: 196px;
  height: 44px;
  background: #00a2d4;
  border-radius: 8px;
`
const TextContent = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.5px;
  color: #ffffff;
  cursor: pointer;
`
const CardWrapper = styled.div`
  margin-block-end: 40px;
`
