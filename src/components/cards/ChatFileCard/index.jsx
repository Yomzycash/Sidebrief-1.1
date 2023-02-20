import React from 'react'
import pdf from '../asset/images/pdf.png'
import png from '../asset/images/png.png'
import jpg from '../asset/images/jpg.png'
import doc from '../asset/images/doc.png'

const ChatFileCard = () => {
  const imageTypeImage = [
    {
      id: '1',
      fileUrl: 'www.link.com',
      fileName: 'passportlocal',
      fileType: 'pdf',
      image: pdf,
    },

    {
      id: '2',
      fileUrl: 'www.link.com',
      fileName: 'passportlocal',
      fileType: 'png',
      image: png,
    },
    {
      id: '4',
      fileUrl: 'www.link.com',
      fileName: 'passportlocal',
      fileType: 'jpg',
      image: jpg,
    },
  ]
  return (
    <Container>
      <InnerContainer>
        {imageTypeImage
          .filter((fil) => data?.messageFiles[fileType] === fil.fileType)
          .map((m) => (
            <img
              src={m.image}
              alt=""
              style={{
                margin: 0,
                height: '25px',
                width: '25px',
                marginRight: '8px',
              }}
            />
          ))}
              <FileContainer>
                  
              </FileContainer>
              
      </InnerContainer>
    </Container>
  )
}

export default ChatFileCard
