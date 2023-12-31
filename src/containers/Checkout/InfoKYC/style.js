import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
`;

export const Name = styled.h3`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 88%;
  color: #151717;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(350px, 1fr));
  row-gap: 24px;
  column-gap: 20px;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;
