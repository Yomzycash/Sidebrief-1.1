import styled from "styled-components";

export const TableContainer = styled.table`
  color: ${({ theme }) => theme.grey1};
  border-spacing: 0;
  background: #fafafa;
  min-width: 100%;

  tr {
    width: 100%;
  }

  th,
  td {
    font-size: clamp(14px, 1.4vw, 16px);
    line-height: 21px;
    text-align: left;
    padding: 20px 24px;
    margin: 0;
  }
`;

export const TableHead = styled.thead`
  width: 100%;
  background: #fafafa;
  color: #151717;
  font-size: 16px;

  th {
    color: #151717;
    font-weight: 500;
    max-width: 100px;
  }
`;

export const TableBody = styled.tbody`
  width: 100%;

  tr {
    cursor: ${({ $hasOnClick }) => ($hasOnClick ? "pointer" : "")};

    :nth-of-type(even) {
      background: #fafafa;
    }
    :nth-of-type(odd) {
      background: #fff;
    }
  }

  td {
    font-weight: 400;
    max-width: 100px;
    /* white-space: nowrap; */
    overflow: hidden;
    text-overflow: ellipsis;
  }

  div,
  a {
    display: flex;
    gap: 8px;
    align-items: center;
    text-decoration: none;

    img {
      width: 20px;
    }
  }
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background-color: #fff;
`;
