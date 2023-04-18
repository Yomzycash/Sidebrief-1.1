import React from "react";
import { ReactComponent as PhoneIcon } from "asset/svg/phone.svg";
import { ReactComponent as EmailIcon } from "asset/svg/email.svg";

import {
  DetailWrapper,
  Email,
  EmailWrapper,
  IconWrapper,
  LowerContainer,
  NameWrapper,
  Phone,
  PhoneWrapper,
  Title,
  TitleWrapper,
  Top,
  Wrapper,
} from "./styles";
import {
  useAddBeneficialKYCMutation,
  useAddMemberKYCMutation,
  useGetAllEntitiesQuery,
} from "services/launchService";
import { useEffect } from "react";
import { useState } from "react";
import KYCFileUpload from "components/FileUpload/KYCFileUpload";
import { convertToLink } from "utils/LaunchHelper";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
const PdfCards = ({
  name = "",
  title = "",
  email = "",
  phone = "",
  code,
  beneCode,
  nin,
  proof,
  signature,
  passport,
  page,
  type,
}) => {
  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);

  const launchResponse = {
    launchCode: searchParams.get("launchCode"),
    registrationCountry: searchParams.get("registrationCountry"),
    registrationType: searchParams.get("registrationType"),
  };

  const countryISO = launchResponse.registrationCountry;
  const [addMemberKYC] = useAddMemberKYCMutation();
  const [addBeneficialKYC] = useAddBeneficialKYCMutation();
  const [isChanged, setIsChanged] = useState(false);
  const [requiredDocuments, setRequiredDocuments] = useState([]);

  const { data } = useGetAllEntitiesQuery(countryISO);


  const checkE = useGetAllEntitiesQuery(countryISO);


  useEffect(() => {
    const check = data?.find(
      (entity) => entity?.entityCode === launchResponse.registrationType
    );

    setRequiredDocuments(check?.entityRequiredDocuments);
  }, [data]);

  const handleChange = async (files, shareholder, beneficiary, type) => {
    const res = await convertToLink(files[0]);
    const formatType = type.split("_").join(" ");

    if (shareholder) {
      const requiredAddMemberData = {
        launchCode: launchResponse.launchCode,
        memberCode: shareholder,
        memberKYC: {
          documentType: formatType,
          documentLink: res.url,
          fileName: files[0].name,
          fileType: files[0].type,
        },
      };
      const response = await addMemberKYC(requiredAddMemberData);
      if (response.data) {
        toast.success("Document uploaded successfully");
        setIsChanged(!isChanged);
      } else if (response.error) {
        toast.error(response.error?.data.message);
      }
    }

    if (beneficiary) {
      const requiredBeneficialOwnerKYCData = {
        launchCode: launchResponse.launchCode,
        beneficialOwnerCode: beneficiary,
        beneficialOwnerKYC: {
          documentType: formatType,
          documentLink: res.url,
          fileName: files[0].name,
          fileType: files[0].type,
        },
      };

      const beneficialResult = await addBeneficialKYC(
        requiredBeneficialOwnerKYCData
      );
      if (beneficialResult.data) {
        let returnedArray = beneficialResult.data.beneficialOwnersKYC;
        let lastElememt = returnedArray[returnedArray.length - 1];

        toast.success("Document uploaded successfully");
        setIsChanged(!isChanged);
      } else if (beneficialResult.error) {
        toast.error(beneficialResult.error?.data.message);
      }
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
          {requiredDocuments?.map((document, index) => (
            <KYCFileUpload
              key={index}
              detailsPage
              isChanged={isChanged}
              documentComponentType={document}
              documentName={document}
              memberCode={code}
              beneficiaryCode={beneCode}
              onDrop={(files) => handleChange(files, code, beneCode, document)}
            />
          ))}
          {}
        </LowerContainer>
      </Wrapper>
    </>
  );
};

export default PdfCards;
