import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";
import { imageTypeImage } from "utils/config";
import { ReactComponent as DeleteIcon } from "asset/svg/delete.svg";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  useDeleteBeneficialKYCMutation,
  useDeleteMemberKYCMutation,
  useViewBeneficialsKYCMutation,
  useViewMembersKYCMutation,
} from "services/launchService";

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
}) => {
  const [viewMemberKYC] = useViewMembersKYCMutation();
  const [viewBeneficialsKYC] = useViewBeneficialsKYCMutation();
  const [documentInfo, setDocumentInfo] = useState({});
  const [deleteMemberKYC] = useDeleteMemberKYCMutation();
  const [deleteBeneficialKYC] = useDeleteBeneficialKYCMutation();
  const [deleted, setDeleted] = useState(false);

  const launchInfo = JSON.parse(localStorage.getItem("launchInfo"));

  const handleView = async () => {
    const response = await viewMemberKYC(launchInfo);
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
    const response = await viewBeneficialsKYC(launchInfo);
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
        launchCode: launchInfo.launchCode,
        beneficialOwnerCode: beneficiaryCode,
        documentCode: documentInfo.documentCode,
      };
      console.log("delete data to be", requiredDeleteData);
      const response = await deleteBeneficialKYC(requiredDeleteData);
      console.log("deleeeeeee", response?.data[0].message);
      if (response.data) {
        toast.success(response?.data[0].message);
        setDeleted(!deleted);
        setDocumentInfo({});
      } else if (response.error) {
        console.log(response.error?.data.message);
        toast.error(response.error?.data.message);
      }
    } else {
      const requiredDeleteData = {
        launchCode: launchInfo.launchCode,
        memberCode: memberCode,
        documentCode: documentInfo.documentCode,
      };
      console.log("delete data to be", requiredDeleteData);
      const response = await deleteMemberKYC(requiredDeleteData);
      console.log("deleeeeeee", response?.data[0].message);
      if (response.data) {
        toast.success(response?.data[0].message);
        setDeleted(!deleted);
        setDocumentInfo({});
      } else if (response.error) {
        console.log(response.error?.data.message);
        toast.error(response.error?.data.message);
      }
    }
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
  });
  console.log("files", acceptedFiles);
  return (
    <Container>
      <FileSection className="container">
        <Top htmlFor="file">
          <DocTitle>{TopText}</DocTitle>
          <ErrorWrapper>{errorMsg}</ErrorWrapper>
        </Top>
        <FileZone
          {...getRootProps({
            className: "dropzone",
            onClick: (event) => {
              if (Object.keys(documentInfo).length == 7) {
                event.stopPropagation();
                // toast.custom("delete the uploaded file");
              }
            },
          })}
          backgroundColor={
            Object.keys(documentInfo).length == 7 ? "#FAFAFA" : "ffffff"
          }
        >
          <input {...getInputProps()} />

          {Object.keys(documentInfo) && Object.keys(documentInfo).length > 0 ? (
            <NameWrapper>
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
              <p>{documentInfo.fileName}</p>
            </NameWrapper>
          ) : (
            <FileTitle>
              <FiUpload /> Drag & drop, or browse
            </FileTitle>
          )}
        </FileZone>
        {Object.keys(documentInfo).length == 7 && (
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

const Container = styled.div``;

const FileTitle = styled.p`
  font-size: 14px;
  line-height: 27px;
  align-items: center;
  color: #959697;
  text-align: center;
`;

const FileZone = styled.div`
  border: 1px dashed #edf1f7;
  border-radius: 8px;
  width: 100%;
  background-color: ${(props) => props.backgroundColor};
  padding: 10.5px 16px;
  p {
    color: #959697;
  }
`;

const FileSection = styled.div`
  /* #edf1f6 */
  /* border: 1px dashed red;
  border-radius: 8px; */
  position: relative;
`;
const DeleteWrapper = styled.div`
  position: absolute;
  right: 30px;
  bottom: 25px;
  /*z-index: 999; */
`;

const NameWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  align-items: center;
  width: 90%;
  background-color: #fafafa;
  padding: 0px 10px;
  /* border: 2px solid red; */
  position: relative;
  p {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
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
