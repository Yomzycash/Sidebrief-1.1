import React from "react";
import pdf from "../../../asset/svg/pdf.svg";
import addc from "../../../asset/svg/addc.svg";
import editc from "../../../asset/svg/editc.svg";
import {
  Document,
  DocumentSection,
  DocumentDownload,
  DocumentFrame,
  DocumentText,
  SmallText,
  InnerDocument,
} from "./style";

const ServiceReviewCard = ({documents }) => {
  const getFileIcon = (fileImage) => {
    switch (fileImage) {
      case "pdf":
        return pdf;
      case "jpg":
        return addc;
      case "png":
        return editc;
      default:
        return null;
    }
  }

  return (
    <DocumentSection>
      <Document>
        {documents.map((doc, id) => (
          <DocumentDownload key={id}>
            <InnerDocument>
              {/* <img src={getFileIcon(doc.fileImage)} alt="filetype" /> */}
              <img src={(doc.fileImage)} alt="filetype" />
              <DocumentText>{doc.doctype}</DocumentText>
            </InnerDocument>
          </DocumentDownload>
        ))}
      </Document>
    </DocumentSection>
  );
};

const DocumentCard = () => {
  // documents on api consuption
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

  return <ServiceReviewCard documents={DocContent}/>
}


export default DocumentCard;



