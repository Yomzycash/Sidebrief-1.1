import React from "react";
import { ReactComponent as PhoneIcon } from "asset/svg/phone.svg";
import { ReactComponent as PdfIcon } from "asset/svg/pdf.svg";
import { ReactComponent as DeleteIcon } from "asset/svg/delete.svg";
import { ReactComponent as EmailIcon } from "asset/svg/email.svg";
import { imageTypeImage } from "utils/config";

import {
  DetailWrapper,
  Details,
  Email,
  EmailWrapper,
  IconWrapper,
  LowerContainer,
  NameWrapper,
  PdfLowerWrapper,
  PdfWrapper,
  Phone,
  PhoneWrapper,
  Title,
  TitleWrapper,
  Top,
  Wrapper,
} from "./styles";
import { downLoadImage } from "utils/staffHelper";
import { useNavigate } from "react-router-dom";
const PdfCards = ({
  name = "",
  title = "",
  email = "",
  phone = "",
  nin,
  proof,
  signature,
  passport,
  page,
}) => {
  const navigate = useNavigate();
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
                {nin?.fileType ? (
                  <img
                    src={
                      imageTypeImage?.find((el) => el?.type === nin?.fileType)
                        .image
                    }
                    alt="icon"
                    style={{
                      margin: 0,
                      height: "25px",
                      width: "25px",
                      marginRight: "8px",
                    }}
                  />
                ) : (
                  <PdfIcon />
                )}
              </IconWrapper>
              {nin ? (
                <Details
                  onClick={() =>
                    downLoadImage(nin.documentLink, nin.documentType)
                  }
                >
                  {nin.documentType}
                </Details>
              ) : (
                <Details onClick={() => navigate(`/launch/${page}-kyc`)}>
                  upload your NIN
                </Details>
              )}
            </PdfLowerWrapper>

            <IconWrapper>
              <DeleteIcon />
            </IconWrapper>
          </PdfWrapper>

          <PdfWrapper>
            <PdfLowerWrapper>
              <IconWrapper>
                {proof ? (
                  <img
                    src={
                      imageTypeImage?.find((el) => el?.type === proof?.fileType)
                        ?.image
                    }
                    alt="icon"
                    style={{
                      margin: 0,
                      height: "25px",
                      width: "25px",
                      marginRight: "8px",
                    }}
                  />
                ) : (
                  <PdfIcon />
                )}
              </IconWrapper>
              {proof ? (
                <Details
                  onClick={() =>
                    downLoadImage(proof.documentLink, proof.documentType)
                  }
                >
                  {proof.documentType}
                </Details>
              ) : (
                <Details onClick={() => navigate(`/launch/${page}-kyc`)}>
                  upload proof of address
                </Details>
              )}
            </PdfLowerWrapper>

            <IconWrapper>
              <DeleteIcon />
            </IconWrapper>
          </PdfWrapper>

          <PdfWrapper>
            <PdfLowerWrapper>
              <IconWrapper>
                {signature ? (
                  <img
                    src={
                      imageTypeImage?.find(
                        (el) => el?.type === signature?.fileType
                      )?.image
                    }
                    alt="icon"
                    style={{
                      margin: 0,
                      height: "25px",
                      width: "25px",
                      marginRight: "8px",
                    }}
                  />
                ) : (
                  <PdfIcon />
                )}
              </IconWrapper>
              {signature ? (
                <Details
                  onClick={() =>
                    downLoadImage(
                      signature.documentLink,
                      signature.documentType
                    )
                  }
                >
                  {signature.documentType}
                </Details>
              ) : (
                <Details onClick={() => navigate(`/launch/${page}-kyc`)}>
                  upload your signature
                </Details>
              )}
            </PdfLowerWrapper>

            <IconWrapper>
              <DeleteIcon />
            </IconWrapper>
          </PdfWrapper>

          <PdfWrapper>
            <PdfLowerWrapper>
              <IconWrapper>
                {passport ? (
                  <img
                    src={
                      imageTypeImage?.find(
                        (el) => el?.type === passport?.fileType
                      )?.image
                    }
                    alt="icon"
                    style={{
                      margin: 0,
                      height: "25px",
                      width: "25px",
                      marginRight: "8px",
                    }}
                  />
                ) : (
                  <PdfIcon />
                )}
              </IconWrapper>
              {passport ? (
                <Details
                  onClick={() =>
                    downLoadImage(passport.documentLink, passport.documentType)
                  }
                >
                  {passport.documentType}
                </Details>
              ) : (
                <Details onClick={() => navigate(`/launch/${page}-kyc`)}>
                  upload your passport photograph
                </Details>
              )}
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
