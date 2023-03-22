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

export const Download = ({ docType, fileUrl }) => {
  const download = () => {
    console.log(fileUrl);
    downLoadImage(fileUrl, docType);
  };

  return (
    <DocumentDownload>
      <DocumentFrame>
        <DocumentIcon />
        <DocumentText>{docType}</DocumentText>
        <CommonButton text={"Download"} LeftIcon={DownloadWhite} action={download} />
      </DocumentFrame>
    </DocumentDownload>
  );
};
