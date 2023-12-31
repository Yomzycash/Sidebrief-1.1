/**
 * MAKE TABLES RESPONSIVE
 *
 * 1. Add overflow-x scroll to Container (Wrapping the table)
 * 2. Add a padding to the text, both head and body
 * */

import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  border: 1px solid #edf1f7;
  font-size: 10px;
  border-radius: 0px 0px 16px 16px;
  // overflow: hidden;

  overflow-x: auto;
  overflow-y: hidden;
`;
export const TableWrapper = styled.div`
  overflow-y: scroll;
  margin-right: -17px;
`;
export const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  // position: relative;
`;

export const Head = styled.thead`
  tr {
    background: #fafafa;
    height: 56px;
  }
`;

export const Body = styled.tbody``;

export const HeadData = styled.th`
  text-align: left;
  // position: sticky;

  ${Head} &:first-child {
    padding-left: 3px;
  }

  ${Head} &:last-child {
    padding-right: 24px;
  }
`;

export const Row = styled.tr`
  height: 56px;
  // padding-inline: 24px;
  padding-left: 24px;
  background: grey;
  border-top: 1px solid #edf1f7;
  background: #fff;

  &:nth-child(even) {
    background: #fcfcfc;
  }

  & > :first-child {
    padding-left: 3px;
    ${({ selectionRow }) =>
      selectionRow
        ? `
               width: 48px;
                `
        : null}
  }

  & > :last-child {
    padding-right: 24px;
    ${({ normalLastRow }) =>
      !normalLastRow
        ? `
                    width: 50px;
                `
        : null}
  }
`;

export const RowData = styled.td`
  border: none;
  color: #ace123;
  font-size: 8px;
`;

export const HeadText = styled.h5`
  font-family: "BR Firma";
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  letter-spacing: 0.02em;
  padding-inline: 24px;

  color: #151717;
`;

export const BodyText = styled.p`
  font-family: "BR Firma";
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.02em;
  color: #151717;
  padding-inline: 24px;
  width: fit-content;
`;
