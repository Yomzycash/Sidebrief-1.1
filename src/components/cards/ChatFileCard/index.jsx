import React from "react";
import pdf from "../../../asset/images/pdf.png";

import { Container, FileContainer, FileText, InnerContainer } from "./style";
import { ThreeDotMenu } from "components/Menu";

import { imageTypeImage } from "./constant";
import { ViewSvg, DownloadSvg } from "../../../asset/svg";
import { useActions } from "./actions";

const ChatFileCard = ({
  fileName = "CAC-Registration.pdf",
  fileType,
  fileUrl,
}) => {
  const link = fileUrl;
  const documentType = fileType;

  const { downloadFileAction } = useActions({
    link,
    documentType,
  });

  const contextContent = [
    // {
    //   text: 'View',
    //   Icon: ViewSvg,
    //   action: '',
    //   style: 'normal',
    // },

    {
      text: "Download",
      Icon: DownloadSvg,
      action: downloadFileAction,
      style: "normal",
    },
  ];

  return (
    <Container>
      <InnerContainer>
        <img
          src={imageTypeImage[fileType]}
          alt={fileType}
          style={{
            margin: 0,
            height: "25px",
            width: "25px",
            marginRight: "8px",
          }}
        />

        <FileContainer>
          <FileText>{fileName}</FileText>
          {/* <FileSize>{fileSize}</FileSize> */}
        </FileContainer>
      </InnerContainer>
      <ThreeDotMenu contextContent={contextContent} position="10px" />
    </Container>
  );
};

export default ChatFileCard;
