import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  gap: 24px;
  position: relative;

  width: 100%;
  height: fit-content;

  /* Blue 3 */

  border: 1px solid #00c3ff;
  box-shadow: 0px 20px 25px -5px rgba(149, 150, 151, 0.1),
    0px 10px 10px -5px rgba(149, 150, 151, 0.04);
  border-radius: 10px;
`

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 8px;

  width: 90%;
  height: fit-content;
`

export const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
  width: max-content;
  height: fit-content;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const FileText = styled.h3`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  color: #242627;
`

export const ThreeDotContainer = styled.button`
  border-radius: 2px;
  background: transparent;
  border: none;
  cursor: pointer;
`

export const ContextContainer = styled.div`
  position: absolute;
  top: 8px;
  right: 10px;
`
