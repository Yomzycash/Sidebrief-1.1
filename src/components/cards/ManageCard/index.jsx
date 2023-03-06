import React from 'react'
import { manageDoc } from './constant'
import { FileContainer, FileName, FileWrapper, InnerContainer, Wrapper } from './style'

const ManageCard = () => {
  return (
    <Wrapper>
      <FileWrapper>
        {manageDoc?.map((el, index) => (
            <FileContainer key={index}>
                <InnerContainer>
            <img src={el.fileType} alt="img " />
                    <FileName>{el.fileName}</FileName>
                    </InnerContainer>
          </FileContainer>
        ))}
      </FileWrapper>
    </Wrapper>
  )
}

export default ManageCard
