import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  min-width: 150px;
`;

export const Select = styled.div`
  cursor: pointer;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;
  border: 1px solid #edf1f7;
  border-radius: 4px;
  font-weight: 400;
  font-size: 14px;
`;

export const Tags = styled.div``;

export const Options = styled.div`
  position: absolute;
  top: 40px;
  background-color: #fff;
  border: 1px solid #edf1f7;
  border-radius: 4px;
  z-index: 1;

  div {
    cursor: pointer;
    padding: 10px 15px;
    white-space: nowrap;
    font-weight: 400;
    font-size: 14px;
    transition: 0.3s ease all;

    :hover {
      background-color: #edf1f7;
    }
  }
`;
