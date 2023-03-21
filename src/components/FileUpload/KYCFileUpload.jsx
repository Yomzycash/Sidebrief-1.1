import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";
import { imageTypeImage } from "utils/config";
import { ReactComponent as DeleteIcon } from "asset/svg/delete.svg";
import { ReactComponent as DownloadIcon } from "asset/svg/downloadp.svg";
import { ReactComponent as PdfIcon } from "asset/svg/pdf.svg";
import toast from "react-hot-toast";
import {
  useDeleteBeneficialKYCMutation,
  useDeleteMemberKYCMutation,
  useViewBeneficialsKYCMutation,
  useViewMembersKYCMutation,
} from "services/launchService";
import { downLoadImage } from "utils/staffHelper";
import { useLocation } from "react-router-dom";

const KYCFileUpload = ({
  TopText,
  errorMsg,
  BottomText,
  onDrop,
  fileDataName,
  isChanged,
  memberCode,
  beneficiaryCode,
  documentComponentType,
  style,
  detailsPage,
  documentName,
  downloadPage,
  handleRefetch,
  downloadDocumentName,
}) => {
  const [viewMemberKYC] = useViewMembersKYCMutation();
  const [viewBeneficialsKYC] = useViewBeneficialsKYCMutation();
  const [documentInfo, setDocumentInfo] = useState({});
  const [deleteMemberKYC] = useDeleteMemberKYCMutation();
  const [deleteBeneficialKYC] = useDeleteBeneficialKYCMutation();
  const [deleted, setDeleted] = useState(false);

  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);

  const launchInfo = JSON.parse(localStorage.getItem("launchInfo"));
  console.log(launchInfo);
  console.log("dddd", searchParams);
  const launchResponse = {
    launchCode: launchInfo
      ? launchInfo.launchCode
      : searchParams.get("launchCode"),
    registrationCountry: launchInfo
      ? launchInfo.registrationCountry
      : searchParams.get("registrationCountry"),
    registrationType: launchInfo
      ? launchInfo.registrationType
      : searchParams.get("registrationType"),
  };

  const nameLengthValidator = (file) => {
    if (file.name.length <= 0) {
      return {
        code: "no file",
        message: `Please upload a document`,
      };
    }

    return null;
  };

  const handleView = async () => {
    const response = await viewMemberKYC(launchResponse);
    const MemberKYCInfo = [...response.data.businessMembersKYC];
    let fileInfo = MemberKYCInfo.filter(
      (member) => member.memberCode === memberCode
    );
    fileInfo.forEach((info) => {
      if (info.documentType === documentComponentType) {
        setDocumentInfo(info);
      }
    });
  };

  const handleBeneficiary = async () => {
    const response = await viewBeneficialsKYC(launchResponse);
    const BeneficialKYCInfo = [...response.data.beneficialOwnersKYC];
    let fileInfo = BeneficialKYCInfo.filter(
      (beneficiary) => beneficiary.beneficialOwnerCode === beneficiaryCode
    );
    fileInfo.forEach((info) => {
      if (info.documentType === documentComponentType) {
        setDocumentInfo(info);
      }
    });
  };

  useEffect(() => {
    handleView();
  }, [isChanged, deleted, Object.keys(documentInfo).length == 7]);

  useEffect(() => {
    handleBeneficiary();
  }, [isChanged, deleted, Object.keys(documentInfo).length == 7]);

  const handleRemove = async () => {
    if (beneficiaryCode) {
      const requiredDeleteData = {
        launchCode: launchResponse.launchCode,
        beneficialOwnerCode: beneficiaryCode,
        documentCode: documentInfo.documentCode,
      };
      const response = await deleteBeneficialKYC(requiredDeleteData);
      if (response.data) {
        toast.success(response?.data[0].message);
        setDeleted(!deleted);
        setDocumentInfo({});
        handleRefetch();
      } else if (response.error) {
        // console.log(response.error?.data.message);
        toast.error(response.error?.data.message);
      }
    } else {
      const requiredDeleteData = {
        launchCode: launchResponse.launchCode,
        memberCode: memberCode,
        documentCode: documentInfo.documentCode,
      };
      const response = await deleteMemberKYC(requiredDeleteData);
      if (response.data) {
        toast.success(response?.data[0].message);
        setDeleted(!deleted);
        setDocumentInfo({});
        handleRefetch();
      } else if (response.error) {
        toast.error(response.error?.data.message);
      }
    }
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    validator: nameLengthValidator,
  });
  return (
    <Container style={{ ...style }} width="100%">
      <FileSection className="container" width="100%">
        <Top htmlFor="file">
          <DocTitle>{TopText}</DocTitle>
          <ErrorWrapper>{errorMsg}</ErrorWrapper>
        </Top>
        <FileZone
          padding={downloadPage && "5px 16px"}
          border={
            detailsPage
              ? "1.5px solid #edf1f7"
              : downloadPage
              ? "1.5px solid #edf1f7"
              : "1.5px dashed #edf1f7"
          }
          borderRadius={detailsPage ? "50px" : "8px"}
          {...getRootProps({
            className: "dropzone",
            onClick: (event) => {
              if (Object.keys(documentInfo).length === 7) {
                event.stopPropagation();
                // toast.custom("delete the uploaded file");
              }
            },
          })}
          backgroundColor={
            Object.keys(documentInfo).length === 7
              ? detailsPage
                ? "ffffff"
                : "#FAFAFA"
              : "ffffff"
          }
        >
          <input {...getInputProps()} />

          {Object.keys(documentInfo) && Object.keys(documentInfo).length > 0 ? (
            <NameWrapper backgroundColor={detailsPage ? "white" : "#fafafa"}>
              {imageTypeImage
                .filter((i) => documentInfo.fileType === i.type)
                .map((d) => (
                  <img
                    src={d.image}
                    alt=""
                    style={{
                      margin: 0,
                      height: "30px",
                      width: "30px",
                    }}
                  />
                ))}

              {detailsPage ? (
                <DetailsPage
                  onClick={() =>
                    downLoadImage(
                      documentInfo.documentLink,
                      documentInfo.documentType
                    )
                  }
                >
                  {documentInfo.documentType}
                </DetailsPage>
              ) : (
                <KYCPage>{documentInfo.fileName}</KYCPage>
              )}
            </NameWrapper>
          ) : (
            <FileTitle>
              {detailsPage ? (
                <Details>
                  {" "}
                  <PdfIcon /> Please Upload {documentName}
                </Details>
              ) : downloadPage ? (
                <DownLoadPageTextWrapper>
                  <DownLoadLeftHold>
                    <PdfIcon />
                    <DownLoadPageText>
                      {downloadDocumentName}
                      <DownloadSize>567KB</DownloadSize>
                    </DownLoadPageText>
                  </DownLoadLeftHold>

                  <DownloadIcon />
                </DownLoadPageTextWrapper>
              ) : (
                <>
                  {" "}
                  <FiUpload /> Drag & drop, or browse
                </>
              )}
            </FileTitle>
          )}
        </FileZone>
        {Object.keys(documentInfo).length === 7 && !detailsPage && (
          <DeleteWrapper onClick={handleRemove}>
            <DeleteIcon />
          </DeleteWrapper>
        )}
        <Bottom>
          <p>{BottomText}</p>
        </Bottom>
      </FileSection>
    </Container>
  );
};

export default KYCFileUpload;

const Container = styled.div`
  width: ${(props) => (props.width ? props.width : "")};
`;

const FileTitle = styled.p`
  font-size: 14px;
  line-height: 27px;
  align-items: center;
  color: #959697;
  text-align: center;
`;

const FileZone = styled.div`
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  width: 100%;
  background-color: ${(props) => props.backgroundColor};
  padding: ${(props) => (props.padding ? props.padding : "10.5px 16px")};
`;

const FileSection = styled.div`
  width: ${(props) => (props.width ? props.width : "")};
  position: relative;
`;
const DeleteWrapper = styled.div`
  position: absolute;
  right: 30px;
  bottom: 25px;
`;

const NameWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  align-items: center;
  width: 90%;
  background-color: ${(props) => props.backgroundColor};
  padding: 0px 10px;
  /* border: 2px solid red; */
  position: relative;
`;
const Top = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
const DocTitle = styled.p`
  font-weight: 500;
  font-size: clamp(12px, 1.5vw, 14px);
  color: #4e5152;
`;
const ErrorWrapper = styled.p`
  color: red;
  font-size: clamp(10px, 1.5vw, 12px); ;
`;
const Bottom = styled.div`
  font-size: clamp(11px, 1.5vw, 12px);
  color: #959697;
`;
const Details = styled.div`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 500;
  font-size: clamp(14px, 1.6vw, 16px);
  line-height: 27px;
  text-decoration-line: underline;
  color: #151717;
  gap: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;
const DownLoadPageTextWrapper = styled.div`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
  padding-inline: 24px;
  display: flex;
  align-items: center;
`;

const DownLoadLeftHold = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const DownLoadPageText = styled.div`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 400;
  font-size: clamp(14px, 1.6vw, 16px);
  color: #242627;
  flex-direction: column;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;
const DownloadSize = styled.p`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #4e5152;
  margin-top: -10px;
`;

const DetailsPage = styled.p`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: #151717;
  text-decoration-line: underline;
  cursor: pointer;
`;

const KYCPage = styled.p`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: #959697;
`;
