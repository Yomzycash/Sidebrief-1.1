import React from "react";
import {
  FileTitle,
  DownLoadPageTextWrapper,
  DownLoadLeftHold,
  DownLoadPageText,
  DownloadSize,
  FileZone,
} from "./styled";
import { ReactComponent as DownloadIcon } from "asset/svg/downloadp.svg";
import { ReactComponent as PdfIcon } from "asset/svg/pdf.svg";

import { downLoadImage } from "utils/staffHelper";
const DownLoadDoc = ({ downloadDocumentName, downloadDocumentLink }) => {
  return (
    <FileZone border={"1.5px solid #edf1f7"} borderRadius={"8px"}>
      <FileTitle>
        <DownLoadPageTextWrapper
          onClick={() => downLoadImage(downloadDocumentLink, downloadDocumentName)}
        >
          <DownLoadLeftHold>
            <PdfIcon />
            <DownLoadPageText>
              {downloadDocumentName}
              <DownloadSize>567KB</DownloadSize>
            </DownLoadPageText>
          </DownLoadLeftHold>

          <DownloadIcon onClick={() => downLoadImage(downloadDocumentLink, downloadDocumentName)} />
        </DownLoadPageTextWrapper>
      </FileTitle>
    </FileZone>
  );
};

export default DownLoadDoc;
