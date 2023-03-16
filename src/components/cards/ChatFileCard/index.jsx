import React from 'react'

import {
  Container,
  ContextContainer,
  FileContainer,
  FileText,
  InnerContainer,
} from './style'
import { ThreeDotMenu } from 'components/Menu'

import { imageTypeImage } from './constant'
import { DownloadSvg } from '../../../asset/svg'
import { useActions } from './actions'

const ChatFileCard = ({
  fileName = 'CAC-Registration.pdf',
  fileType,
  fileUrl,
}) => {
  const link = fileUrl
  const documentType = fileName

  const { downloadFileAction } = useActions({
    link,
    documentType,
  })

  const contextContent = [
    // {
    //   text: 'View',
    //   Icon: ViewSvg,
    //   action: '',
    //   style: 'normal',
    // },

    {
      text: 'Download',
      Icon: DownloadSvg,
      action: downloadFileAction,
      style: 'normal',
    },
  ]

  return (
    <Container>
      <InnerContainer>
        <img
          src={imageTypeImage[fileType]}
          alt={fileType}
          style={{
            margin: 0,
            height: '25px',
            width: '25px',
            marginRight: '8px',
          }}
        />

        <FileContainer>
          <FileText>{fileName}</FileText>
          {/* <FileSize>{fileSize}</FileSize> */}
        </FileContainer>
      </InnerContainer>
      <ContextContainer>
        <ThreeDotMenu contextContent={contextContent} position="-150px" />
      </ContextContainer>
    </Container>
  )
}

export default ChatFileCard
