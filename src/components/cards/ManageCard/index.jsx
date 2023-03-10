import React, { useEffect, useState } from "react";
import { useViewComplyMutation } from "services/complyService";
import { imageTypeImage, manageDoc } from "./constant";
import { FileContainer, FileName, FileWrapper, InnerContainer, Wrapper } from "./style";

const ManageCard = () => {
  const [viewComply] = useViewComplyMutation();
  const [complyDocs, setComplyDocs] = useState([]);

  const handleData = async () => {
    let response = await viewComply({
      complyCode: "335928451015517734",
    });

    setComplyDocs(response?.data?.complyDocuments);
  };
  useEffect(() => {
    handleData();
  }, []);

  return (
    <Wrapper>
      <FileWrapper>
        {complyDocs?.map((el, index) => (
          <FileContainer key={index}>
            <InnerContainer>
              <img
                src={imageTypeImage[el.fileType]}
                alt="img "
                style={{
                  margin: 0,
                  height: "25px",
                  width: "25px",
                  marginRight: "8px",
                }}
              />
              <FileName>{el.fileName}</FileName>
            </InnerContainer>
          </FileContainer>
        ))}
      </FileWrapper>
    </Wrapper>
  );
};

export default ManageCard;
