import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 32px;
`;
export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  justify-content: center;
`;
export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #00a2d4;
`;
export const Title = styled.h3`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 21px;
`;
export const NumberPage = styled.h4`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.5px;
`;
export const DetailedSection = styled.div`
  display: flex;
  flex-direction: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
`;
