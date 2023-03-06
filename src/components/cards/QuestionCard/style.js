import styled from 'styled-components'

export const Wrapper = styled.div`
  /* max-width: 618px; */
  width: 100%;
  max-height: max-content;
  background: #ffffff;
  border: 1px solid #edf1f7;
  box-shadow: 4px 4px 8px 4px #b9bec414;
  border-radius: 16px;
  padding: 40px 24px 56px 24px;
`
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
`
export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding: 0px;
  gap: 8px;
  width: inherit;
  height: max-content;
`
export const Question = styled.h3`
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #959697;
`
export const Answer = styled.h3`
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #151717;
`
