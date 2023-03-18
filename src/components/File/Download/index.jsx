import React from 'react'
import { 
    Document,
    DocumentSection,
    DocumentDownload,
    DocumentFrame,
    DocumentText,
    Divider,
    Paragraph,
} from "./styled"
import { CommonButton } from "components/button";
import { ReactComponent as DownloadWhite } from "../../../../src/asset/svg/DownloadWhite.svg"
import { ReactComponent as DocumentIcon } from "../../../../src/asset/svg/Document.svg"

const Download = ({ icon, docType, fileExtension , action }) => {
    const DocContent = [
       { 
            "id":"1",
            "doctype": "National Identification Number"
        },
        {
            "id":"2",
            "doctype": "Voter's Card"
        },
        {
            "id":"3",
            "doctype": "Passport"
        },
        {
            "id":"4",
            "doctype": "Court Affidavit"
        }
    
    ]

    return (
        <DocumentSection>
            <h2>
                Documents
            </h2>
            
            <Paragraph>Download the following documents’ template (it will be required in the upload section)</Paragraph>
            <Document>
                {DocContent.map((doc, id) => (
                    <DocumentDownload key={id}>
                        <DocumentFrame>
                           {/* { icon && <DocumentIcon /> } 
                           { docType && <DocumentText>{doc.doctype}</DocumentText> }  
                           {action && <CommonButton text={"Download"} LeftIcon={DownloadWhite} />} */}
                            <DocumentIcon /> 
                            <DocumentText>{doc.doctype}</DocumentText>
                            <CommonButton text={"Download"} LeftIcon={DownloadWhite} />
                        </DocumentFrame>
                    </DocumentDownload>
                ))}
                
            </Document>
            
        
        </DocumentSection>
    )
}

export default Download;