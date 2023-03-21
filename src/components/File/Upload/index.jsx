import React from "react";
import { DocumentDownload, DocumentFrame, DocumentText, SmallText } from "./styled";
import { CommonButton } from "components/button";
import { ReactComponent as UploadIcon } from "asset/svg/Upload.svg";
import { ReactComponent as DocumentIcon } from "asset/svg/Document.svg";
import { convertToLink } from "utils/LaunchHelper";

export const Upload = ({ icon, docType, fileExtension, action }) => {
  function handleButtonClick() {
    const input = document.getElementById("upload-file");
    input.click();
  }

  const collectFile = (file) => {
    const uploadedFile = convertToLink(file);
    // get link and call action here
    console.log(uploadedFile);
  };

  return (
    <DocumentDownload>
      <DocumentFrame>
        {/* { icon && ( <DocumentIcon />) } 
                { docType && (<DocumentText>{doc.doctype}</DocumentText>) }  
                {action && (<CommonButton text={"Download"} LeftIcon={DownloadWhite} /> )}  */}
        <DocumentIcon />
        <DocumentText>{docType}</DocumentText>
        <SmallText>file type: pdf, png, jpeg</SmallText>
        <CommonButton text={"Upload"} LeftIcon={UploadIcon} action={handleButtonClick} />
        <input
          id={"upload-file"}
          type={"file"}
          style={{
            display: "none",
          }}
          onChange={(event) => collectFile(event.target.files[0])}
        />
      </DocumentFrame>
    </DocumentDownload>
  );
};
