import Button from 'components/button/mainButton/index'
import { ReactComponent as Close } from 'asset/images/close.svg'

import { InputWithLabel } from 'components/input'
import React from 'react'
import styled from 'styled-components'

const StaffModalCards = ({
  label = 'To confirm this, type delete',
  type = 'email',
  placeholder = ' Enter your email address',
}) => {
  return (
    <Wrapper>
      <CancelWrapper>
        <Close />
      </CancelWrapper>
      <Container>
        <TextContainer>
          <UpperText>Delete Business?</UpperText>
          <MiddleText>
            Deleting will remove all the information from database.
            <br />
            This cannot be undone.
          </MiddleText>
        </TextContainer>
        <InputWrapper>
          <InputWithLabel label={label} type={type} placeholder={placeholder} />
        </InputWrapper>
        <ButtonWrapper>
          <Button
            bg_color="#ffffff"
            outline="1px solid #00a2d4"
            title="Cancel"
            color="#00a2d4"
            hv_color="#ffffff"
            hover_bg_color="#00a2d4"
          />
          <Button
            bg_color="#ffffff"
            outline="1px solid #00a2d4"
            title="Delete Business"
            color="#00a2d4"
            hv_color="#ffffff"
            hover_bg_color="#00a2d4"
          />
        </ButtonWrapper>
      </Container>
    </Wrapper>
  )
}

export default StaffModalCards
const Wrapper = styled.div`
  max-width: 528px;
  max-height: 417px;
  background: #ffffff;
  border-radius: 16px;
  padding: 40px;
  border: 1px solid red;
`
const CancelWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 40px;
`
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 16px;
  text-align: center;
  width: 100%;
`
const UpperText = styled.h3`
  font-family: 'BR Firma';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.5px;
  color: #151717;
`
const MiddleText = styled.h3`
  font-family: 'BR Firma';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #757886;
`

const InputWrapper = styled.div`
  width: 100%;
`
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;
  width: 100%;
`
