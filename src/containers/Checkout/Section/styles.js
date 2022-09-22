import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 40px 40px 20px 40px;
  p {
    font-size: 14px;
    color: #151717;
    margin-top: 40px;
  }
`;

export const Heading = styled.h3`
  display: flex;
  justify-content: space-between;
  font-family: BR Firma;
  font-size: 24px;
  font-weight: 600;
  line-height: 21px;
  color: #151717;
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
    font-size: 14px;
    font-weight: 500px;
  }
`;
