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
import { useLocation, useNavigate } from "react-router-dom";
import { checkPaymentStatus } from "pages/Launch/actions";
import {
  useGetAllEntitiesQuery,
  useViewLaunchRequestQuery,
  useViewPayLaunchMutation,
} from "services/launchService";
import { store } from "redux/Store";
import { setLaunchPaid, setLaunchResponse } from "redux/Slices";
import { useEffect } from "react";
import { useState } from "react";
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
  type,
}) => {
  const navigate = useNavigate();
  let location = useLocation();
  const [viewPayLaunch] = useViewPayLaunchMutation();
  const launchInfo = JSON.parse(localStorage.getItem("launchInfo"));
  const countryISO = localStorage.getItem("countryISO");

  // // const { data, isLoading, isSuccess, refetch } =
  // //   useViewLaunchRequestQuery(launchInfo);
  // // const members = isSuccess ? data.businessMembers : [];
  // // const memberKYC = isSuccess ? data.businessMembersKYC : [];
  // const [requiredDocuments, setRequiredDocuments] = useState([]);

  // const { data, isSuccess } = useGetAllEntitiesQuery(countryISO);
  // console.log(data);
  // useEffect(() => {
  //   const check = data?.find(
  //     (entity) => entity.entityCode === launchInfo.registrationType
  //   );
  //   console.log(data);
  //   setRequiredDocuments(check?.entityRequiredDocuments);
  // }, [data]);

  const handleDocumentClick = async () => {
    const launchInfo = JSON.parse(localStorage.getItem("launchInfo"));

    let paymentInfo = await checkPaymentStatus({
      ...launchInfo,
      viewPayLaunch,
    });
    if (paymentInfo?.data) {
      localStorage.setItem("paymentDetails", JSON.stringify(paymentInfo?.data));
      store.dispatch(setLaunchPaid(paymentInfo));
      store.dispatch(setLaunchResponse(launchInfo));
      localStorage.setItem("countryISO", launchInfo.registrationCountry);
      navigate(`/launch/${page}-kyc`);
      // navigate(`/launch/review-${page}`);
      localStorage.setItem("navigatedFrom", location.pathname);
    }
  };
  return (
    <>
      <Wrapper>
        <DetailWrapper>
          <Top>
            <NameWrapper>{name}</NameWrapper>
            {title ? (
              <TitleWrapper type={type}>
                <Title type={type}>{title}</Title>
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
          {/* {requiredDocuments.map((document) => ( */}
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
                <Details onClick={handleDocumentClick}>
                  upload your passport photograph
                </Details>
              )}
            </PdfLowerWrapper>

            {/* <IconWrapper>
                    <DeleteIcon />
                  </IconWrapper> */}
          </PdfWrapper>

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
                <Details onClick={handleDocumentClick}>upload your NIN</Details>
              )}
            </PdfLowerWrapper>

            {/* <IconWrapper>
              <DeleteIcon />
            </IconWrapper> */}
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
                <Details onClick={handleDocumentClick}>
                  upload your signature
                </Details>
              )}
            </PdfLowerWrapper>

            {/* <IconWrapper>
              <DeleteIcon />
            </IconWrapper> */}
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
                <Details onClick={handleDocumentClick}>
                  upload proof of address
                </Details>
              )}
            </PdfLowerWrapper>

            {/* <IconWrapper>
              <DeleteIcon />
            </IconWrapper> */}
          </PdfWrapper>
        </LowerContainer>
      </Wrapper>
    </>
  );
};

export default PdfCards;
