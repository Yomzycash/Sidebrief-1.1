import React from "react";
import pdf from "asset/images/pdf.png";
import jpg from "asset/images/jpg.png";
import png from "asset/images/png.png";
import {
  Document,
  DocumentSection,
  DocumentDownload,
  DocumentText,
  InnerDocument,
  Download,
} from "./style";
import { handleDownloadFile } from "utils/LaunchHelper";
import { useLocation } from "react-router-dom";
import { downLoadImage } from "utils/staffHelper";
import { ReactComponent as DownloadWhite } from "asset/svg/DownloadWhite.svg";

const ServiceReviewCard = ({ DocContent, action }) => {
  const { pathname } = useLocation();
  let details = pathname.includes("details");

  const imageTypeImage = {
    pdf,
    png,
    jpg,
  };

  return (
    <DocumentSection>
      <Document>
        {DocContent?.map((doc, index) => (
          <DocumentDownload key={index}>
            <InnerDocument
              onClick={() => {
                details && downLoadImage(doc?.documentLink, doc?.documentName);
              }}
            >
              <img
                src={imageTypeImage[doc?.documentLink.slice(-3)]}
                alt="filetype"
                style={{
                  margin: 0,
                  height: "24px",
                  width: "24px",
                }}
              />
              <DocumentText>{doc?.documentName}</DocumentText>
              {/* <SmallText>file type: pdf, png, jpeg</SmallText> */}
            </InnerDocument>
            <Download
              onClick={async () => {
                await downLoadImage(doc?.documentLink, doc?.documentName);
              }}
              type="button"
            >
              <DownloadWhite />
            </Download>
          </DocumentDownload>
        ))}
      </Document>
    </DocumentSection>
  );
};

export default ServiceReviewCard;
