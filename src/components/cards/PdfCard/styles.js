import styled from "styled-components";

export const Wrapper = styled.div`
  /* max-width: 618px; */
  width: 100%;
  max-height: 550px;
  background: #ffffff;
  border: 1px solid #edf1f7;
  box-shadow: 4px 4px 8px 4px #b9bec414;
  border-radius: 16px;
  padding: 40px 24px 56px 24px;
`;

export const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 48px;
`;

export const Top = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NameWrapper = styled.div`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 600;
  font-size: clamp(16px, 1.6vw, 18px);
  line-height: 30px;
  color: #151717;
`;

export const TitleWrapper = styled.div`
  padding: 4px 16px;
  background-color: ${({ type }) =>
    type === "company" ? "#d400cc0c" : "#00a2d40c"};
  border-radius: 12px;
  text-align: center;
`;

export const Title = styled.h3`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: ${({ type }) => (type === "company" ? "#D400CC" : "#00A2D4")};
`;

export const EmailWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const Email = styled.h4`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 500;
  font-size: clamp(14px, 1.6vw, 16px);
  line-height: 27px;
  text-decoration-line: underline;
  color: #151717;
`;

export const PhoneWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const Phone = styled.h4`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 500;
  font-size: clamp(14px, 1.6vw, 16px);
  line-height: 27px;
  text-decoration-line: underline;
  color: #151717;
`;

export const LowerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

export const PdfWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: #fafafa;
  padding: 16px;
  border: 1px solid #edf1f7;
  border-radius: 50px;
`;

export const PdfLowerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  gap: 10px;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const Details = styled.a`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 500;
  font-size: clamp(14px, 1.6vw, 16px);
  line-height: 27px;
  text-decoration-line: underline;
  color: #151717;
  cursor: pointer;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
