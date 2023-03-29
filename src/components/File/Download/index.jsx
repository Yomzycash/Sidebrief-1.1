import { useState } from "react";
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
  const [preparing, setPreparing] = useState(false);

  const download = async () => {
    setPreparing(true);
    // console.log(fileUrl);
    await downLoadImage(fileUrl, docType);
    setPreparing(false);
  };

  return (
    <DocumentDownload>
      <DocumentFrame>
        <DocumentIcon />
        <DocumentText>{docType}</DocumentText>
        <CommonButton
          text={"Download"}
          LeftIcon={DownloadWhite}
          action={download}
          loading={preparing}
        />
      </DocumentFrame>
    </DocumentDownload>
  );
};
