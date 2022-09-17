import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const Heading = styled.h3`
  display: flex;
  justify-content: space-between;
  font-family: BR Firma;
  font-size: 24px;
  font-weight: 600;
  line-height: 21px;
  color: #00a2d4;
  /* letter-spacing: 0px; */

  span {
    font-size: 14px;
    font-weight: 400;
    color: red;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
`;
export const SectionContainer = styled.p`
  display: flex;
  justify-content: space-between;
  p {
    font-size: 18px;
    font-weight: 500px;
  }
`;
