import React, { useEffect, useState } from "react";
import { ReactComponent as DeleteIcon } from "asset/svg/delete.svg";
import { ReactComponent as EditIcon } from "asset/svg/Edit.svg";
import { Container, IconWrapper, SharesWrapper, Top } from "./styled";
import { SpinningCircles } from "react-loading-icons";
import styled from "styled-components";
import { imageTypeImage } from "utils/config";
import {
  useViewBeneficialsKYCMutation,
  useViewMembersKYCMutation,
} from "services/launchService";

const ReviewCard = ({
  number,
  name,
  shares,
  sharesPercentage,
  email,
  phone,
  editAction,
  deleteAction,
  director_role,
  stake,
  occupation,
  isLoading,
  icon,
  memberCode,
  beneficialOwnerCode,
}) => {
  const launchInfo = JSON.parse(localStorage.getItem("launchInfo"));

  const [documentInfo, setDocumentInfo] = useState({});
  const [viewMemberKYC] = useViewMembersKYCMutation();
  const [viewBeneficials] = useViewBeneficialsKYCMutation();
  const [governmentId, setGovernmentId] = useState({});
  const [proofD, setProof] = useState({});
  const [passportD, setPassport] = useState({});

  const handleShareHolder = async () => {
    const response = await viewMemberKYC(launchInfo);

    const MemberKYCInfo = [...response.data.businessMembersKYC];
    let fileInfo = MemberKYCInfo.filter(
      (member) => member.memberCode === memberCode
    );

    const uploadedDetail = fileInfo.filter(
      (item) => item.documentType === "government id"
    );

    let lastUploadDetail = uploadedDetail[uploadedDetail.length - 1];
    setGovernmentId(lastUploadDetail);

    //proof
    const uploadedProofDetail = fileInfo.filter(
      (item) => item.documentType === "proof of home address"
    );

    let lastUploadProofDetail =
      uploadedProofDetail[uploadedProofDetail.length - 1];
    setProof(lastUploadProofDetail);

    // passport

    const uploadedPassportDetail = fileInfo.filter(
      (item) => item.documentType === "passport photograph"
    );

    let lastUploadPassportDetail =
      uploadedPassportDetail[uploadedPassportDetail.length - 1];
    setPassport(lastUploadPassportDetail);
  };

  const handleBeneficiary = async () => {
    const response = await viewBeneficials(launchInfo);
    const MemberKYCInfo = [...response.data.beneficialOwnersKYC];
    // console.log(MemberKYCInfo);
    let fileInfo = MemberKYCInfo.filter(
      (member) => member.beneficialOwnerCode === beneficialOwnerCode
    );

    const uploadedDetail = fileInfo.filter(
      (item) => item.documentType === "government id"
    );
    // console.log(uploadedDetail);

    let lastUploadDetail = uploadedDetail[uploadedDetail.length - 1];
    // console.log(lastUploadDetail);
    setGovernmentId(lastUploadDetail);

    //proof
    const uploadedProofDetail = fileInfo.filter(
      (item) => item.documentType === "proof of home address"
    );
    // console.log(uploadedDetail);

    let lastUploadProofDetail =
      uploadedProofDetail[uploadedProofDetail.length - 1];
    // console.log(lastUploadDetail);
    setProof(lastUploadProofDetail);

    // passport

    const uploadedPassportDetail = fileInfo.filter(
      (item) => item.documentType === "passport photograph"
    );
    // console.log(uploadedDetail);

    let lastUploadPassportDetail =
      uploadedPassportDetail[uploadedPassportDetail.length - 1];
    // console.log(lastUploadPassportDetail);
    setPassport(lastUploadPassportDetail);
  };

  useEffect(() => {
    if (beneficialOwnerCode) {
      handleBeneficiary();
    } else {
      handleShareHolder();
    }
  }, []);

  return (
    <Container>
      <Top>
        <p>{`${number}. ${name}`}</p>
        <SharesWrapper shares={shares}>
          {shares && <div>{`${shares} - ${sharesPercentage}%`}</div>}
          {director_role && <div>{`Role - ${director_role}`}</div>}
          {stake && <div>{`Occupation: ${occupation} - Stake: ${stake}%`}</div>}
          {/* {!icon && ( */}
          <IconWrapper>
            <div style={{ cursor: "pointer" }} onClick={editAction}>
              <EditIcon /> Edit
            </div>
            {/* {isLoading ? (
                <SpinningCircles
                  stroke="#00A2D4"
                  fill="#00A2D4"
                  width={25}
                  height={25}
                />
              ) : (
                <div style={{ cursor: "pointer" }}>
                  <DeleteIcon onClick={deleteAction} />
                </div>
              )} */}
          </IconWrapper>
          {/* )} */}
        </SharesWrapper>
      </Top>
      <div>{email}</div>
      <div>{phone}</div>

      {/* {
  documentInfo.lastIndexOf((item) => item.documentType === "government id").map(())
} */}
      <PdfContainer>
        <PdfWrapper>
          {imageTypeImage?.filter((fil) => governmentId?.fileType === fil.type)
            .length === 0 && (
            <NotUploaded>Government ID not uploaded yet</NotUploaded>
          )}
          {imageTypeImage
            ?.filter((fil) => governmentId?.fileType === fil.type)
            .map((m) => (
              <img
                src={m.image}
                alt=""
                style={{
                  margin: 0,
                  height: "25px",
                  width: "25px",
                  marginRight: "8px",
                }}
              />
            ))}
          <TextWrapper>{governmentId?.fileName}</TextWrapper>
        </PdfWrapper>
        <PdfWrapper>
          {imageTypeImage.filter((fil) => proofD?.fileType === fil.type)
            .length === 0 && (
            <NotUploaded>Proof of address not uploaded yet</NotUploaded>
          )}
          {imageTypeImage
            .filter((fil) => proofD?.fileType === fil.type)
            .map((m) => (
              <img
                src={m.image}
                alt=""
                style={{
                  margin: 0,
                  height: "25px",
                  width: "25px",
                  marginRight: "8px",
                }}
              />
            ))}
          <TextWrapper>{proofD?.fileName}</TextWrapper>
        </PdfWrapper>
        <PdfWrapper>
          {imageTypeImage.filter((fil) => passportD?.fileType === fil.type)
            .length === 0 && (
            <NotUploaded>Passport photograph not uploaded yet</NotUploaded>
          )}
          {imageTypeImage
            .filter((fil) => passportD?.fileType === fil.type)
            .map((m) => (
              <img
                src={m.image}
                alt=""
                style={{
                  margin: 0,
                  height: "25px",
                  width: "25px",
                  marginRight: "8px",
                }}
              />
            ))}
          <TextWrapper>{passportD?.fileName}</TextWrapper>
        </PdfWrapper>
      </PdfContainer>
    </Container>
  );
};

export default ReviewCard;

const PdfContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  margin-top: 16px;
`;
const PdfWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10.5px 16px;
  width: 100%;
  height: 48px;
  background: #fafafa;
  border: 1px dashed #edf1f7;
  border-radius: 8px;
  margin-left: 0px !important;
`;
const TextWrapper = styled.h3`
  font-weight: 500;
  font-size: 16px;
  line-height: 27px;
  text-decoration-line: underline;
  color: #4e5152;
`;
const Document = styled.div`
  border: 1px dashed #edf1f7;
  border-radius: 8px;
  padding: 10.5px 16px;
  background-color: #fafafa;
  margin-bottom: 16px;
  width: 100%;
  display: flex;
  p {
    text-decoration: underline;
  }
`;

const NotUploaded = styled.p`
  font-size: 14px;
  color: #4e5152;
`;
