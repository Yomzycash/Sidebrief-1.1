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
export const FileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
`
export const FileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10.5px 16px;

  width: 100%;
  height: fit-content;

  background: #fafafa;

  border: 1px dashed #edf1f7;
  border-radius: 8px;
`
export const FileName = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 27px;

  text-decoration-line: underline;

  color: #4e5152;
`
export const InnerContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 8px;
width:inherit
`