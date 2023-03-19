import React, { useEffect, useState } from "react";
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
import {
  useDeleteServiceDocumentMutation,
  useViewServiceDocumentMutation,
} from "services/complyService";
import {
  Container,
  FileTitle,
  FileZone,
  FileSection,
  DeleteWrapper,
  NameWrapper,
  Top,
  DocTitle,
  ErrorWrapper,
  Bottom,
  Details,
  DownLoadPageTextWrapper,
  DownLoadLeftHold,
  DownLoadPageText,
  DownloadSize,
  DetailsPage,
  KYCPage,
} from "./styled";

const KYCFileUpload = ({
  TopText,
  errorMsg,
  BottomText,
  onDrop,
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
  downloadDocumentLink,
  complyCode,
}) => {
  const [viewMemberKYC] = useViewMembersKYCMutation();
  const [viewBeneficialsKYC] = useViewBeneficialsKYCMutation();
  const [documentInfo, setDocumentInfo] = useState({});
  const [deleteMemberKYC] = useDeleteMemberKYCMutation();
  const [deleteBeneficialKYC] = useDeleteBeneficialKYCMutation();
  const [deleted, setDeleted] = useState(false);
  const [viewServiceDocument] = useViewServiceDocumentMutation();
  const [deleteServiceDocument] = useDeleteServiceDocumentMutation();

  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);

  const launchResponse = {
    launchCode: searchParams.get("launchCode"),
    registrationCountry: searchParams.get("registrationCountry"),
    registrationType: searchParams.get("registrationType"),
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

  const handleServiceDocumentView = async () => {
    const requiredData = {
      complyCode: complyCode,
    };
    const response = await viewServiceDocument(requiredData);
    let fileInfo = [...response?.data?.complyDocuments] || [];
    fileInfo.forEach((info) => {
      if (info.documentType === documentComponentType) {
        setDocumentInfo(info);
      }
    });
  };

  const handleView = async () => {
    const response = await viewMemberKYC(launchResponse);
    const MemberKYCInfo = [...response.data.businessMembersKYC];
    let fileInfo = MemberKYCInfo.filter((member) => member.memberCode === memberCode);
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
    handleServiceDocumentView();
  }, [isChanged, deleted, Object.keys(documentInfo).length >= 6]);

  useEffect(() => {
    handleView();
  }, [isChanged, deleted, Object.keys(documentInfo).length >= 6]);

  useEffect(() => {
    handleBeneficiary();
  }, [isChanged, deleted, Object.keys(documentInfo).length >= 6]);

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
    } else if (complyCode) {
      const requiredData = {
        complyCode: complyCode,
        documentCode: documentInfo.documentCode,
      };
      const response = await deleteServiceDocument(requiredData);
      if (response.data) {
        console.log(response.data);
        toast.success("document deleted successfully"); //no message from the server
        setDeleted(!deleted);
        setDocumentInfo({});
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
              if (Object.keys(documentInfo).length >= 6) {
                event.stopPropagation();
                // toast.custom("delete the uploaded file");
              }
            },
          })}
          backgroundColor={
            Object.keys(documentInfo).length >= 6 ? (detailsPage ? "ffffff" : "#FAFAFA") : "ffffff"
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
                    downLoadImage(documentInfo.documentLink, documentInfo.documentType)
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

                  <DownloadIcon
                    onClick={() => downLoadImage(downloadDocumentLink, downloadDocumentName)}
                  />
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
        {Object.keys(documentInfo).length >= 6 && !detailsPage && (
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
