import React from "react";
import styled from "styled-components";
import { ReactComponent as PhoneIcon } from "asset/svg/phone.svg";
import { ReactComponent as PdfIcon } from "asset/svg/pdf.svg";
import { ReactComponent as DeleteIcon } from "asset/svg/delete.svg";
import { ReactComponent as EmailIcon } from "asset/svg/email.svg";
const PdfCards = ({ name = "", title = "", email = "", phone = "" }) => {
  return (
    <>
      <Wrapper>
        <DetailWrapper>
          <Top>
            <NameWrapper>{name}</NameWrapper>
            {title ? (
              <TitleWrapper>
                <Title>{title}</Title>
              </TitleWrapper>
            ) : null}
          </Top>
          <EmailWrapper>
            <IconWrapper>
              <EmailIcon />
            </IconWrapper>
            <Email>{email}</Email>
          </EmailWrapper>
          <PhoneWrapper>
            <IconWrapper>
              <PhoneIcon />
            </IconWrapper>
            <Phone>{phone}</Phone>
          </PhoneWrapper>
        </DetailWrapper>
        <LowerContainer>
          <PdfWrapper>
            <PdfLowerWrapper>
              <IconWrapper>
                <PdfIcon />
              </IconWrapper>
              <Details>Proofof Address.pdf</Details>
            </PdfLowerWrapper>

            <IconWrapper>
              <DeleteIcon />
            </IconWrapper>
          </PdfWrapper>

          <PdfWrapper>
            <PdfLowerWrapper>
              <IconWrapper>
                <PdfIcon />
              </IconWrapper>
              <Details>ID Card-Ope?Falana.pdf</Details>
            </PdfLowerWrapper>

            <IconWrapper>
              <DeleteIcon />
            </IconWrapper>
          </PdfWrapper>

          <PdfWrapper>
            <PdfLowerWrapper>
              <IconWrapper>
                <PdfIcon />
              </IconWrapper>
              <Details>Passport - Ope_Falana.jpg</Details>
            </PdfLowerWrapper>

            <IconWrapper>
              <DeleteIcon />
            </IconWrapper>
          </PdfWrapper>
        </LowerContainer>
      </Wrapper>
    </>
  );
};

export default PdfCards;

const Wrapper = styled.div`
  /* max-width: 618px; */
  width: 100%;
  max-height: 469px;
  background: #ffffff;
  border: 1px solid #edf1f7;
  box-shadow: 4px 4px 8px 4px rgba(185, 190, 196, 0.08);
  border-radius: 16px;
  padding: 40px 24px 56px 24px;
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 48px;
`;
const Top = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NameWrapper = styled.div`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 600;
  font-size: clamp(16px, 1.6vw, 18px);
  line-height: 30px;
  color: #151717;
`;
const TitleWrapper = styled.div`
  padding: 4px 16px;
  background: rgba(0, 162, 212, 0.05);
  border-radius: 12px;
  text-align: center;
`;
const Title = styled.h3`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: #00a2d4;
`;
const EmailWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;
const Email = styled.h4`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 500;
  font-size: clamp(14px, 1.6vw, 16px);
  line-height: 27px;
  text-decoration-line: underline;
  color: #151717;
`;
const PhoneWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;
const Phone = styled.h4`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 500;
  font-size: clamp(14px, 1.6vw, 16px);
  line-height: 27px;
  text-decoration-line: underline;
  color: #151717;
`;

const LowerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;
const PdfWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: #fafafa;
  padding: 16px;
  border: 1px solid #edf1f7;
  border-radius: 50px;
`;
const PdfLowerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  gap: 24px;
`;
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const Details = styled.h3`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 500;
  font-size: clamp(14px, 1.6vw, 16px);
  line-height: 27px;
  text-decoration-line: underline;
  color: #151717;
  cursor: pointer;
`;
