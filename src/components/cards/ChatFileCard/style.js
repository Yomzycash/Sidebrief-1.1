import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  gap: 24px;

  width: max-content;
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

  width: max-content;
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
`

export const FileText = styled.h3`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  color: #242627;
`
export const FileSize = styled.h4`
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;

  color: #4e5152;
`
export const ThreeDotContainer = styled.button`
  border-radius: 2px;
  background: transparent;
  border: none;
  cursor: pointer;
`
export const InvisibleBackDrop = styled.div`
  background-color: transparent;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 3;
`
export const ContextMenu = styled.div`
  position: absolute;
  z-index: 6;
  width: 192px;
  // height: 150px;
  top: 34px;
  right: 0px;

  background: #ffffff;
  border: 1px solid #edf1f7;
  box-shadow: -4px 10px 16px 8px #95969714, 0px 10px 10px -5px #9596970a;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`
export const ContextButton = styled.button`
  /* flex: 1; */
  height: 50px;
  border: none;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px;
  background-color: #ffffff;

  &:not(:last-child) {
    border-bottom: 1px solid #edf1f7;
  }

  &:hover {
    background-color: #fafafa;
  }

  font-family: 'BR Firma';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.01em;
  display: ${({ hide }) => (hide ? 'none' : 'flex')};

  color: ${({ look }) => (!(look === 'danger') ? `#727474` : '#ed4e3a')};

  svg {
    height: 16px;
    width: 16px;

    path {
      fill: currentColor;
    }
  }
`