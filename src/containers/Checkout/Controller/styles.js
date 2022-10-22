import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
  width: 100%;
  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column-reverse;
    gap: 27px;
    justify-content: center;
  }
`
