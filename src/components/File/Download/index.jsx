import React from "react";
import { DocumentDownload, DocumentFrame, DocumentText } from "./styled";
// import { 
//     Document,
//     DocumentSection,
//     DocumentDownload,
//     DocumentFrame,
//     DocumentText,
//     Divider,
//     SmallText,
//     Paragraph,
// } from "./styled"
import { CommonButton } from "components/button";
import { ReactComponent as DownloadWhite } from "asset/svg/DownloadWhite.svg";
import { ReactComponent as DocumentIcon } from "asset/svg/Document.svg";
import { downLoadImage } from "utils/staffHelper";

export const Download = ({ icon, docType, fileUrl, fileExtension }) => {
  const download = () => {
    console.log(fileUrl);
    downLoadImage(fileUrl, docType);
  };

  return (
    <DocumentDownload>
      <DocumentFrame>
        {/* { icon && <DocumentIcon /> } 
            { docType && <DocumentText>{doc.doctype}</DocumentText> }  
            {action && <CommonButton text={"Download"} LeftIcon={DownloadWhite} />} */}
        <DocumentIcon />
        <DocumentText>{docType}</DocumentText>
        <CommonButton text={"Download"} LeftIcon={DownloadWhite} action={download} />
      </DocumentFrame>
    </DocumentDownload>
  );
};
