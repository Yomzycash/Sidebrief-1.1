import React, { useState } from 'react'
import {
  Container,
  TextContainer,
  ThreeDotContainer,
  Name,
  Top,
  Description,
} from './styles'
import { ReactComponent as ThreeDot } from 'asset/svg/threeDot.svg'
import { StatusIndicator } from 'components/Indicators'
import { useNavigate } from 'react-router-dom'
import { navigateToDetailPage } from 'components/Tables/BusinessTable/constants'

export const StatusCard = ({
  name, // string
  status,
  ShortDescription,
  type,
  code,
  countryISO,
}) => {
  const navigate = useNavigate()
  const launchInfo = {
    launchCode: code,
    registrationCountry: countryISO,
    registrationType: type,
  }
  const [hover, setHover] = useState(false)

  return (
    <Container
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      hover={hover}
      onClick={() => navigateToDetailPage(navigate, launchInfo)}
    >
      <TextContainer>
        <Top>
          <Name>{name}</Name>
          <StatusIndicator status={status} />
        </Top>
        <ThreeDotContainer>
          {/* Doesn't exactly have a function yet */}
          <ThreeDot />
        </ThreeDotContainer>
      </TextContainer>
      <Description hover={hover}>{ShortDescription}</Description>
    </Container>
  )
}
