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
import { ReactComponent as UploadIcon } from "../../../../src/asset/svg/Upload.svg"
import { ReactComponent as DocumentIcon } from "../../../../src/asset/svg/Document.svg"

const Upload = ({ icon, docType, fileExtension , action }) => {
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
            <Paragraph>Upload the following Documents</Paragraph>
            <Document>
                {DocContent.map((doc, id) => (
                    <DocumentDownload key={id}>
                        <DocumentFrame>
                           {/* { icon && ( <DocumentIcon />) } 
                           { docType && (<DocumentText>{doc.doctype}</DocumentText>) }  
                           {action && (<CommonButton text={"Download"} LeftIcon={DownloadWhite} /> )}  */}
                            <DocumentIcon /> 
                            <DocumentText>{doc.doctype}</DocumentText> 
                            <SmallText>fileType: pdf, png, jpeg</SmallText>
                            <CommonButton text={"Upload"} LeftIcon={UploadIcon} />
                        </DocumentFrame>
                    </DocumentDownload>
                ))}   
            </Document>
            
        
        </DocumentSection>
    )
}

export default Upload;