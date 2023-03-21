import React from 'react'
import { 
    Document,
    DocumentSection,
    DocumentDownload,
    DocumentFrame,
    DocumentText,
    Divider,
    SmallText,
    Paragraph,
} from "./styled"
import { CommonButton } from "components/button";
import { ReactComponent as DownloadIcon } from "../../../../src/asset/svg/download.svg"
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
         
            <Document>
                {DocContent.map((doc, id) => (
                    <DocumentDownload key={id}>
                        <DocumentFrame>
                            <DocumentIcon /> 
                            <DocumentText>{doc.doctype}</DocumentText>
                            <CommonButton text={"Download"} LeftIcon={DownloadIcon} />
                        </DocumentFrame>
                    </DocumentDownload>
                ))}   
            </Document>
            
        
        </DocumentSection>
    )
}

export default Download;