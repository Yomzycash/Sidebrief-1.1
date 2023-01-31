import styled from 'styled-components'

export const Container = styled.div`
  border-right: 1px solid #edf1f7;
  height: calc(100vh - 56px);
  display: flex;
  flex-direction: column;
`

export const Head = styled.div`
  padding-inline: 24px;
  padding-top: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Heading = styled.h3`
  font-weight: 600;
  font-size: 24px;
  line-height: 24px;
  letter-spacing: -0.02em;
  color: #242627;
`

export const DropDown = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 12px;
  gap: 16px;
  background: #fafafa;
  width: 109px;
  height: 40px;
  border: 1px solid #f1f1f1;
  border-radius: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const TextContainer = styled.select`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  align-items: center;
  text-align: right;
  color: #4e5152;
  width: 100%;
  border: 0px;
  outline: 0px;
  background: #fafafa;
  -webkit-padding-start: 2px;
`
export const Option = styled.option`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  align-items: flex-end;
  text-align: right;
  color: #4e5152;
  width: 100%;
  border: 0px;
  outline: 0px;
`
export const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
`

export const SearchContainer = styled.div`
  padding-inline: 24px;
`
export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  /* border: 1px solid red; */
  height: 100%;
`
