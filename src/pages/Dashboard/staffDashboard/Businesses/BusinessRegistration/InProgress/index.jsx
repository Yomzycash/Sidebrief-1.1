import { MockData } from 'components/Staff/Tables/ApplicationTable/constants'
import { BusinessTable } from 'components/Tables'
import React from 'react'
import { Body, Container } from './styled'

const InProgress = () => {
  return (
    <Container>
      <Body>
        <BusinessTable data={MockData} />
      </Body>
    </Container>
  )
}

export default InProgress