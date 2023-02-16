import React, { useEffect, useState } from "react";
import { ReactComponent as DeleteIcon } from "asset/svg/delete.svg";
import { ReactComponent as EditIcon } from "asset/svg/Edit.svg";
import { Container, IconWrapper, SharesWrapper, Top } from "./styled";
import { SpinningCircles } from "react-loading-icons";
import styled from "styled-components";
import { imageTypeImage } from "utils/config";
import {
  useGetAllEntitiesQuery,
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
  directorID,
  stake,
  occupation,
  isLoading,
  icon,
  memberCode,
  beneficialOwnerCode,
}) => {
  const launchInfo = JSON.parse(localStorage.getItem("launchInfo"));
  const countryISO = localStorage.getItem("countryISO");
  const [documentInfo, setDocumentInfo] = useState({});
  const [viewMemberKYC] = useViewMembersKYCMutation();
  const [viewBeneficials] = useViewBeneficialsKYCMutation();
  const [governmentId, setGovernmentId] = useState({});
  const [proofD, setProof] = useState({});
  const [passportD, setPassport] = useState({});
  const [signature, setSignature] = useState({});
  const [requiredDocuments, setRequiredDocuments] = useState([]);
  const [sameData, setSameData] = useState([]);

  const { data, isSuccess } = useGetAllEntitiesQuery(countryISO);
  useEffect(() => {
    const check = data?.find(
      (entity) => entity.entityCode === launchInfo.registrationType
    );
    setRequiredDocuments(check?.entityRequiredDocuments);
  }, [data]);

  // console.log("requierd", requiredDocuments);
  const handleShareHolder = async () => {
    const response = await viewMemberKYC(launchInfo);
    // console.log("checik res", response);
    const MemberKYCInfo = [...response.data.businessMembersKYC];
    // console.log("checik resmember", MemberKYCInfo);
    let fileInfo = MemberKYCInfo.filter(
      (member) => member.memberCode === memberCode
    );
    setSameData(fileInfo);

    // requiredDocuments?.forEach((required) => {
    //   fileInfo?.forEach((file) => {
    //     if (required === fileInfo.documentType) {
    //       setDocumentInfo()
    //     }
    //   })
    // })

    // const uploadedDetail = fileInfo.filter(
    //   (item) => item.documentType === "NIN Slip/Card"
    // );

    // let lastUploadDetail = uploadedDetail[uploadedDetail.length - 1];
    // // console.log("adddddddddddd", lastUploadDetail);
    // setGovernmentId(lastUploadDetail);

    // //nin
    // const uploadedProofDetail = fileInfo.filter(
    //   (item) => item.documentType === "Proof of address"
    // );

    // let lastUploadProofDetail =
    //   uploadedProofDetail[uploadedProofDetail.length - 1];
    // setProof(lastUploadProofDetail);

    // // signature

    // const uploadedSignatureDetail = fileInfo.filter(
    //   (item) => item.documentType === "E-signature"
    // );

    // let lastUploadSignatureDetail =
    //   uploadedSignatureDetail[uploadedSignatureDetail.length - 1];
    // setSignature(lastUploadSignatureDetail);

    // //
    // const uploadedPassportDetail = fileInfo.filter(
    //   (item) => item.documentType === "Passport Photograph"
    // );

    // let lastUploadPassportDetail =
    //   uploadedPassportDetail[uploadedPassportDetail.length - 1];
    // setPassport(lastUploadPassportDetail);
  };

  const handleBeneficiary = async () => {
    const response = await viewBeneficials(launchInfo);
    const MemberKYCInfo = [...response.data.beneficialOwnersKYC];
    // console.log(MemberKYCInfo);
    let fileInfo = MemberKYCInfo.filter(
      (member) => member.beneficialOwnerCode === beneficialOwnerCode
    );

    setSameData(fileInfo);

    // const uploadedDetail = fileInfo.filter(
    //   (item) => item.documentType === "NIN Slip/Card"
    // );

    // let lastUploadDetail = uploadedDetail[uploadedDetail.length - 1];
    // // console.log("adddddddddddd", lastUploadDetail);
    // setGovernmentId(lastUploadDetail);

    // //nin
    // const uploadedProofDetail = fileInfo.filter(
    //   (item) => item.documentType === "Proof of address"
    // );

    // let lastUploadProofDetail =
    //   uploadedProofDetail[uploadedProofDetail.length - 1];
    // setProof(lastUploadProofDetail);

    // // signature

    // const uploadedSignatureDetail = fileInfo.filter(
    //   (item) => item.documentType === "E-signature"
    // );

    // let lastUploadSignatureDetail =
    //   uploadedSignatureDetail[uploadedSignatureDetail.length - 1];
    // setSignature(lastUploadSignatureDetail);

    // //
    // const uploadedPassportDetail = fileInfo.filter(
    //   (item) => item.documentType === "Passport Photograph"
    // );

    // let lastUploadPassportDetail =
    //   uploadedPassportDetail[uploadedPassportDetail.length - 1];
    // setPassport(lastUploadPassportDetail);
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
          {directorID && <div>{`ID Number - ${directorID}`}</div>}
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
        {/* <PdfWrapper>
          {imageTypeImage.filter((fil) => passportD?.fileType === fil.type)
            .length === 0 && (
            <NotUploaded>Passport Photograph not uploaded yet</NotUploaded>
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
          <TextWrapper>{passportD?.documentType}</TextWrapper>
        </PdfWrapper>

        <PdfWrapper>
          {imageTypeImage?.filter((fil) => governmentId?.fileType === fil.type)
            .length === 0 && (
            <NotUploaded>NIN Slip not uploaded yet</NotUploaded>
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
          <TextWrapper>{governmentId?.documentType}</TextWrapper>
        </PdfWrapper>
        <PdfWrapper>
          {imageTypeImage.filter((fil) => signature?.fileType === fil.type)
            .length === 0 && (
            <NotUploaded> E-signature not uploaded yet</NotUploaded>
          )}
          {imageTypeImage
            .filter((fil) => signature?.fileType === fil.type)
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
          <TextWrapper>{signature?.documentType}</TextWrapper>
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
          <TextWrapper>{proofD?.documentType}</TextWrapper>
        </PdfWrapper> */}
        {/* {sameData?.map((set) => (
          <PdfWrapper>
            {imageTypeImage.filter((fil) => set?.fileType === fil.type)
              .length === 0 && (
              <NotUploaded>Proof of address not uploaded yet</NotUploaded>
            )}
            {imageTypeImage
              .filter((fil) => set?.fileType === fil.type)
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
            <TextWrapper>{set?.documentType}</TextWrapper>
          </PdfWrapper>
        ))} */}
        {requiredDocuments?.map((document) => {
          return (
            <PdfWrapper>
              {sameData?.filter((data) => document === data.documentType)
                .length === 0 && (
                <NotUploaded>{document} not uploaded yet</NotUploaded>
              )}

              {sameData?.map((data) => {
                if (document === data.documentType) {
                  return (
                    <>
                      {imageTypeImage
                        .filter((fil) => data?.fileType === fil.type)
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

                      {data.documentType ? (
                        <TextWrapper>{data.documentType}</TextWrapper>
                      ) : (
                        <TextWrapper>documentType</TextWrapper>
                      )}
                    </>
                  );
                }
              })}
            </PdfWrapper>
          );
        })}
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
  border: 3px dashed #edf1f7;
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
