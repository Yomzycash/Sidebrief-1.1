import React from "react";
import { manageDoc } from "./constant";
import { FileContainer, FileName, FileWrapper, InnerContainer, Wrapper, Loading } from "./style";
import { imageTypeImage } from "utils/config";
import { Puff } from "react-loading-icons";
const ManageCard = ({ document, loadingState }) => {
  return (
    <Wrapper>
      {loadingState?.isLoading && (
        <Loading height="50vh">
          <Puff stroke="#00A2D4" fill="white" />
        </Loading>
      )}

      <FileWrapper>
        {document?.map((el, index) => (
          <FileContainer key={index}>
            <InnerContainer>
              {imageTypeImage
                .filter((fil) => el?.fileType === fil.type)
                .map((m, i) => (
                  <img
                    src={m.image}
                    alt=""
                    key={i}
                    style={{
                      margin: 0,
                      height: "25px",
                      width: "25px",
                      marginRight: "8px",
                    }}
                  />
                ))}

              {/* <img src={el.fileType} alt="img " /> */}
              <FileName>{el.documentName}</FileName>
            </InnerContainer>
          </FileContainer>
        ))}
      </FileWrapper>
    </Wrapper>
  );
};

export default ManageCard;
