import React from 'react'
import { ReactComponent as DeleteIcon } from 'asset/svg/delete.svg'
import { ReactComponent as EditIcon } from 'asset/svg/Edit.svg'
import { Container, IconWrapper, SharesWrapper, Top } from './styled'
import { updateLaunchShareHolder } from 'redux/Slices'
import { store } from 'redux/Store'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { ReactComponent as PdfIcon } from 'asset/svg/pdf.svg'

const LaunchSummaryCard = ({
  number,
  name,
  shares,
  sharesPercentage,
  email,
  phone,
  deleteAction,
  littleCard,
  icon,
}) => {
  return (
    <Container>
      <Top>
        <p>{`${number}. ${name}`}</p>
        <SharesWrapper shares={shares}>
          <div>{`${shares} - ${sharesPercentage}`}</div>
          {icon && (
            <IconWrapper>
              <EditIcon />
              <DeleteIcon onClick={deleteAction} />
            </IconWrapper>
          )}
        </SharesWrapper>
      </Top>
      <div>{email}</div>
      <div>{phone}</div>
      {littleCard && (
        <>
          {' '}
          <Wrapper>
            <PdfIcon />
            <Text>ID Card-Ope?Falana.pdf</Text>
          </Wrapper>
          <Wrapper>
            <PdfIcon />
            <Text>Utility Bill-Ope?Falana.pdf</Text>
          </Wrapper>
          <Wrapper>
            <PdfIcon />
            <Text>Passport-Photo-Ope?Falana.pdf</Text>
          </Wrapper>
        </>
      )}
    </Container>
  )
}

export default LaunchSummaryCard

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 16px 11px 0px 11px;
  margin-top: 16px;
  background: #fafafa;
`
const Text = styled.p`
  font-weight: 500;
  font-size: 16px;
  line-height: 27px;
  text-decoration-line: underline;
  color: #4e5152;
`
