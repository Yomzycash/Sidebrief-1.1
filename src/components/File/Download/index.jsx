import { useState } from "react";
import { DocumentDownload, DocumentFrame, DocumentText } from "./styled";
import { CommonButton } from "components/button";
import { ReactComponent as DownloadWhite } from "asset/svg/DownloadWhite.svg";
import { ReactComponent as DocumentIcon } from "asset/svg/Document.svg";
import { downLoadImage } from "utils/staffHelper";
import { SpinningCircles } from "react-loading-icons";

export const Download = ({ docType, fileUrl, hideName, containerStyle, buttonStyle }) => {
  const [preparing, setPreparing] = useState(false);

  const download = async () => {
    setPreparing(true);
    // console.log(fileUrl);
    await downLoadImage(fileUrl, docType);
    setPreparing(false);
  };

  return (
    <DocumentDownload style={containerStyle}>
      <DocumentFrame>
        <DocumentIcon />
        <DocumentText>{docType}</DocumentText>
        <CommonButton
          text={"Download"}
          LeftIcon={DownloadWhite}
          action={download}
          loading={preparing}
          LoadingIcon={<SpinningCircles height={24} width={24} />}
          style={buttonStyle}
        />
      </DocumentFrame>
    </DocumentDownload>
  );
};
