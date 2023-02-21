import React from 'react'
import pdf from '../../../asset/images/pdf.png'

import {
  Container,
  FileContainer,
  FileSize,
  FileText,
  InnerContainer,
  ThreeDotContainer,
} from './style'
import { useState } from 'react'
import { ThreeDotMenu } from 'components/Menu'

import { contextContent } from './constant'

const ChatFileCard = ({
  fileName = 'CAC-Registration.pdf',
  fileSize = '7.1 MB',
}) => {
  return (
    <Container>
      <InnerContainer>
        {/* {imageTypeImage
          .filter((fil) => data?.messageFiles[fileType] === fil.fileType)
          .map((m) => ( */}
        <img
          src={pdf}
          alt=""
          style={{
            margin: 0,
            height: '25px',
            width: '25px',
            marginRight: '8px',
          }}
        />
        {/* ))} */}
        <FileContainer>
          <FileText>{fileName}</FileText>
          <FileSize>{fileSize}</FileSize>
        </FileContainer>
      </InnerContainer>
      <ThreeDotMenu contextContent={contextContent} position="10px" />
    </Container>
  )
}

export default ChatFileCard
