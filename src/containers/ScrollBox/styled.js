import styled from 'styled-components'

export const ScrollContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  overflow-x: auto;
  max-width: 100%;
  padding-bottom: 32px;
  scroll-behavior: smooth;


  &::-webkit-scrollbar {
    height: 6px;
    background: #edf1f7;
    border-radius: 16px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 16px;
    background-color: #00a2d477;
  }
  &:hover {
    &::-webkit-scrollbar-thumb {
      background-color: #00a2d4;
    }
  }
`
export const Scroll = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 24px;
  width: max-content;
  
`
