import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
`

export const TableContainer = styled.div`
  width: 100%;
  background: #ffffff;
  border: 1px solid #edf1f7;
  border-radius: 20px;
  overflow: hidden;
`

export const Heading = styled.div`
  /* padding-inline: 24px; */
  /* padding-block: 30px 18px; */
  padding-bottom: 24px;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
  }
`

export const BottomText = styled.p`
  font-family: 'BR Firma';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.02em;
  color: #959697;
`

export const Title = styled.h3`
  font-family: 'BR Firma';
  font-weight: 600;
  font-size: 16px;
  line-height: 30px;
  letter-spacing: 0.01em;
  color: #242627;
  margin-left: 0;
`

export const ViewAllButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  height: 36px;
  padding-inline: 8px;
`

export const ThreeDotContainer = styled.button`
  border-radius: 2px;
  background: transparent;
  border: none;
  width: 24px;
  height: 24px;
`

export const Table = styled.table`
  width: 100%;
  border-spacing: 0;
`

export const Head = styled.thead`
  height: 56px;

  tr {
    background: #fafafa;
  }
`

export const HeadData = styled.th`
  text-align: left;

  ${Head} &:first-child {
    padding-left: 24px;
  }

  ${Head} &:last-child {
    padding-right: 24px;
  }
`

export const Row = styled.tr`
  height: 56px;
  padding-inline: 24px;
  background: grey;
  border-top: 1px solid #edf1f7;
  background: #fff;

  &:nth-child(even) {
    background: #fcfcfc;
  }

  & > :first-child {
    padding-left: 24px;
  }

  & > :last-child {
    padding-right: 24px;
    width: 48px;
  }
`

export const RowData = styled.td`
  border: none;
`

export const HeadText = styled.h5`
  font-family: 'BR Firma';
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  letter-spacing: 0.02em;

  color: #151717;
`

export const BodyText = styled.p`
  font-family: 'BR Firma';
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.02em;
  color: #151717;
`

export const Filter = styled.div`
  height: 64px;
  background: #ffffff;
  display: flex;
  align-items: stretch;
  gap: 24px;
  padding-inline: 24px;
`

export const FilterButton = styled.button`
  background: transparent;
  border: none;
  padding-inline: 8px;
  border-bottom: ${({ active }) => (active ? `4px solid #00a2d4` : `none`)};
  transition: 0.2s all;

  p {
    font-family: 'BR Firma';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    display: flex;
    align-items: center;
    color: ${({ active }) => (active ? `#242627` : `#959697`)};
  }
`
