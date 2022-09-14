import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  background: #ffffff;
  border: 1px solid #edf1f7;
  box-shadow: 0px 10px 10px -5px rgba(149, 150, 151, 0.04);
  border-radius: 16px;
`;

export const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  padding-inline: 24px;
  padding-block: 30px 18px;
`;

export const Title = styled.h3`
  font-family: "BR Firma";
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.02em;
  color: #151717;
`;

export const ViewAllButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;

export const ThreeDotContainer = styled.button`
  border-radius: 2px;
  background: transparent;
  border: none;
  width: 24px;
  height: 24px;
`;

export const Table = styled.table`
  width: 100%;
  border-spacing: 0;
`;

export const Head = styled.thead`
  height: 56px;
`;

export const HeadData = styled.th`
  text-align: left;

  ${Head} &:first-child {
    padding-left: 24px;
  }

  ${Head} &:last-child {
    padding-right: 24px;
  }
`;

export const Row = styled.tr`
  height: 56px;
  padding-inline: 24px;
  background: grey;
  border-top: 1px solid #edf1f7;
  background: #fff;

  &:nth-child(odd) {
    background: #fcfcfc;
  }

  & > :first-child {
    padding-left: 24px;
  }

  & > :last-child {
    padding-right: 24px;
    width: 48px;
  }
`;

export const RowData = styled.td`
  border: none;
`;

export const HeadText = styled.h5`
  font-family: "BR Firma";
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.02em;
  color: #727474;
`;

export const BodyText = styled.p`
  font-family: "BR Firma";
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.02em;
  color: #151717;
`;
