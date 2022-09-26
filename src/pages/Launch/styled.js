import styled from 'styled-components'
import { InputWrapper, Input } from 'components/input/styled'

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  background-color: #fcfcfc;
  flex: 1;
  min-height: 100vh;
`
export const Header = styled.div``
export const Body = styled.form`
  display: flex;
  flex-flow: column;
  height: 100%;
  margin: auto;
  width: 100%;
  max-width: 962px;
  background-color: white;
  border: 1px solid #edf1f6;
  border-top: none;
  flex: 1;
  padding-bottom: 100px;
  border-top: none;
`

export const AddMore = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 17px;
  cursor: pointer;
  font-size: clamp(16px, 1.5vw, 18px);
  color: #00a2d4;
`

export const Bottom = styled.div`
  display: flex;
  width: 100%;
  padding: 40px;
`
export const EntityCardsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: stretch;
  width: 100%;
  gap: 24px;
  margin-top: 36px;
`

export const CountryItem = styled.span`
  display: flex;
  gap: 16px;
  align-items: center;
`

export const Page = styled.div`
  padding-block: 32px;
  padding-inline: 8%;
`

export const Inputs = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(350px, 1fr));
  gap: 20px;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  .checkoutInput {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 0;

    ${InputWrapper} {
      margin-top: 0;
      height: 48px;

      ${Input} {
        height: 100%;
        width: 100%;
      }
    }
  }

  .checkoutInputLabel {
    font-family: 'BR Firma';
    font-weight: 500;
    font-size: clamp(13px, 1.5vw, 14px);
    line-height: 21px;
    color: #4e5152;
  }
`
