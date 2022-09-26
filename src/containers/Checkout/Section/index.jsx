import React from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Heading,
  ContentWrapper,
  SectionContainer,
  CheckBox,
} from './styles'

export const CheckoutSection = ({
  title,
  children,
  review,
  sectionTitle,
  linkTitle,
  HeaderParagraph,
  checkbox,
  checkBoxAction,
  to,
}) => {
  const handleCheckbox = (e) => {
    checkBoxAction(e.target.checked)
  }

  return (
    <Container>
      <Heading>{title}</Heading>
      {HeaderParagraph && <p>{HeaderParagraph}</p>}
      {checkbox && (
        <CheckBox>
          <input type="checkbox" id="checkbox" onClick={handleCheckbox} />
          <label htmlFor="checkbox">
            Click here to use Sidebrief's <span>{checkbox}</span> until you
            sustain your own
          </label>
        </CheckBox>
      )}
      {review && (
        <SectionContainer>
          <p>{sectionTitle}</p>

          <Link
            to={to}
            style={{
              textDecoration: 'none',
              fontSize: '14px',
              color: '#00A2D4',
              cursor: 'pointer',
            }}
          >
            {linkTitle}
          </Link>
        </SectionContainer>
      )}
      <ContentWrapper>{children}</ContentWrapper>
    </Container>
  )
}
