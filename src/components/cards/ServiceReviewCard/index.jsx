import React from "react";
import pdf from "../../../asset/images/pdf.png";
import jpg from "../../../asset/images/jpg.png";
import png from "../../../asset/images/png.png";
import {
  Document,
  DocumentSection,
  DocumentDownload,
  DocumentFrame,
  DocumentText,
  SmallText,
  InnerDocument,
} from "./style";

const ServiceReviewCard = ({ DocContent }) => {
  const imageTypeImage = {
    pdf: pdf,

    png: png,

    jpg: jpg,
  };

  return (
    <DocumentSection>
      <Document>
        {DocContent.map((doc, id) => (
          <DocumentDownload key={id}>
            <InnerDocument>
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
          </DocumentDownload>
        ))}
      </Document>
    </DocumentSection>
  );
};

export default ServiceReviewCard;
