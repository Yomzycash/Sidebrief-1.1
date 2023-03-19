import React from "react";
import pdf from "../../../asset/svg/pdf.svg";
import {
  Document,
  DocumentSection,
  DocumentDownload,
  DocumentFrame,
  DocumentText,
  SmallText,
  InnerDocument,
} from "./style";

const ServiceReviewCard = () => {
  const DocContent = [
    {
      id: "1",
      fileImage: pdf,
      doctype: "National Identification Number",
    },
    {
      id: "2",
      fileImage: pdf,
      doctype: "Voter's Card",
    },
    {
      id: "3",
      fileImage: pdf,
      doctype: "Passport",
    },
    {
      id: "4",
      fileImage: pdf,
      doctype: "Court Affidavit",
    },
  ];
  return (
    <DocumentSection>
      <Document>
        {DocContent.map((doc, id) => (
          <DocumentDownload key={id}>
            <InnerDocument>
              <img src={doc.fileImage} alt="filetype" />
              <DocumentText>{doc.doctype}</DocumentText>
              <SmallText>file type: pdf, png, jpeg</SmallText>
            </InnerDocument>
          </DocumentDownload>
        ))}
      </Document>
    </DocumentSection>
  );
};

export default ServiceReviewCard;
