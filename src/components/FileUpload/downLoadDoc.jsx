import React from "react";
import styled from "styled-components";
// import {
//   FileTitle,
//   DownLoadPageTextWrapper,
//   DownLoadLeftHold,
//   DownLoadPageText,
//   DownloadSize,
//   FileZone,
// } from "./styled";
// import { ReactComponent as DownloadIcon } from "asset/svg/downloadp.svg";
// import { ReactComponent as PdfIcon } from "asset/svg/pdf.svg";
import { CommonButton } from "components/button";
import { ReactComponent as DownloadWhite } from "asset/svg/DownloadWhite.svg";
import { ReactComponent as DocumentIcon } from "asset/svg/Document.svg";

import { downLoadImage } from "utils/staffHelper";
const DownLoadDoc = ({ downloadDocumentName, downloadDocumentLink }) => {
  const download = () => {
    downLoadImage(downloadDocumentLink, downloadDocumentName);
  };

  return (
    // <FileZone border={"1.5px solid #edf1f7"} borderRadius={"8px"}>
    //   <FileTitle>
    //     <DownLoadPageTextWrapper
    //       onClick={() => downLoadImage(downloadDocumentLink, downloadDocumentName)}
    //     >
    //       <DownLoadLeftHold>
    //         <PdfIcon />
    //         <DownLoadPageText>
    //           {downloadDocumentName}
    //           <DownloadSize>567KB</DownloadSize>
    //         </DownLoadPageText>
    //       </DownLoadLeftHold>

    //       <DownloadIcon onClick={() => downLoadImage(downloadDocumentLink, downloadDocumentName)} />
    //     </DownLoadPageTextWrapper>
    //   </FileTitle>
    // </FileZone>

    <DocumentDownload>
      <DocumentFrame>
        {/* { icon && <DocumentIcon /> } 
            { docType && <DocumentText>{doc.doctype}</DocumentText> }  
            {action && <CommonButton text={"Download"} LeftIcon={DownloadWhite} />} */}
        <DocumentIcon />
        <DocumentText> {downloadDocumentName}</DocumentText>
        <CommonButton text={"Download"} LeftIcon={DownloadWhite} action={download} />
      </DocumentFrame>
    </DocumentDownload>
  );
};

export default DownLoadDoc;

const DocumentDownload = styled.div`
  width: 100%;
  max-width: 200px;
  min-height: 120px;
  max-height: 238px;
  background: #ffffff;
  border: 1px solid #edf1f7;
  box-shadow: 0px 10px 10px -5px #9596970a;
  border-radius: 16px;
  padding: clamp(16px, 1.5vw, 24px);
  margin: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 17px;
`;

const DocumentFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: clamp(16px, 1.6vw, 24px);
`;

const DocumentText = styled.p`
  color: #4e5152;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
`;

const SmallText = styled.h5`
  font-size: 8px;
  color: #4e5152;
  font-weight: 500;
  opacity: 0.5;
`;
