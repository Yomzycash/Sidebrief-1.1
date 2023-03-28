import React from 'react'
import { 
    Document,
    DocumentSection,
    DocumentDownload,
    DocumentFrame,
    DocumentText,
    SmallText,
} from "./styled"
import { CommonButton } from "components/button";
import { ReactComponent as DownloadIcon } from "../../../src/asset/svg/DownloadWhite.svg"
import { ReactComponent as UploadIcon } from "../../../src/asset/svg/Upload.svg"
import { ReactComponent as DocumentIcon } from "../../../src/asset/svg/Document.svg"

const DocumentComponent = ({ type, documents }) => {
    const icon = type === 'download' ? <DownloadIcon /> : <UploadIcon />;
    const buttonText = type === 'download' ? 'Download' : 'Upload';

    return (
        <DocumentSection>
            <Document>
                {documents.map((doc, id) => (
                    <DocumentDownload key={id}>
                        <DocumentFrame>
                            {DocumentIcon} 
                            <DocumentText>{doc.doctype}</DocumentText>
                            <CommonButton text={buttonText} LeftIcon={icon} />
                        </DocumentFrame>
                    </DocumentDownload>
                ))}
            </Document>
        </DocumentSection>
    )
}

export default DocumentComponent;

