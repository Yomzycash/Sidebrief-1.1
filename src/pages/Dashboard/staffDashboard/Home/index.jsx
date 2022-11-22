import { BusinessesChartCard } from 'components/cards'
import AnalyticsChart from 'components/cards/businessesChart/analyticsChart'
import StatusCard from 'components/cards/StatusCard/StaffStatusCard'
import Navbar from 'components/navbar'
import MobileNavbar from 'components/navbar/MobileNavbar'
import Sidebar from 'components/sidebar'
import StaffSidebar from 'components/sidebar/StaffSidebar'
import { ApplicationTable } from 'components/Staff/Tables'
import { MockData } from 'components/Staff/Tables/ApplicationTable/constants'
import DashboardSection from 'layout/DashboardSection'
import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { StaffContainer, StatusCardContainer } from './styled'

const StaffHome = (props) => {
  const layoutInfo = useSelector((store) => store.LayoutInfo)
  const { sidebarWidth } = layoutInfo

  const location = useLocation()

  let hideSearch = location.pathname.includes('/dashboard/rewards')

  let hideMobileNav =
    location.pathname.includes('/dashboard/rewards') &&
    location.pathname.length > 31
  const analytics = {
    title: 'User Analytics',
    options: ['All time', 1, 2, 3, 4, 5, 6, 7],
    status1: {
      text: 'Total Users',
      total: 825,
      color: 'rgba(255, 255, 255, 0.4)',
    },
    status2: {
      text: 'Registrations',
      total: 450,
      color: '#ffffff',
    },
  }

  return (
    <Dashboard>
      <Navbar
        dashboard
        imgStyles={{ maxWidth: '100px' }}
        style={{ padding: '12px 24px' }}
      />
      <MobileNavbar hideNav={hideMobileNav} />
      <Body>
        <BodyLeft>
          <StaffSidebar />
        </BodyLeft>
        <BodyRight SidebarWidth={sidebarWidth}>
          <StaffContainer>
            <h3>Welcome back, Bamidele</h3>
            <StatusCardContainer>
              <StatusCard />
            </StatusCardContainer>
            <DashboardSection>
              <BusinessesChartCard analytics={analytics} staff />
              <AnalyticsChart />
            </DashboardSection>
            <DashboardSection>
              <ApplicationTable data={MockData} />
            </DashboardSection>
          </StaffContainer>
        </BodyRight>
      </Body>
    </Dashboard>
  )
}

export default StaffHome
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
  flex-flow: column;
  width: calc(100% - ${({ SidebarWidth }) => SidebarWidth});

  @media screen and (max-width: 700px) {
    width: 100%;
  }
`
