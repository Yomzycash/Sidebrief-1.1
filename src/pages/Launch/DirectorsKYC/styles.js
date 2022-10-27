import styled from "styled-components";

export const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  margin-bottom: 20px;
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

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 40px;
  height: ${({ height }) => height && height};
`;
