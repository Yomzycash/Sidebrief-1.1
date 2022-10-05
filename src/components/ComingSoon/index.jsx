import React from "react";
import { BoldText, ComingBtn, Image, Main, ParagraphText } from "./styled";
import image from "../../asset/images/coming.png";
import { useNavigate } from "react-router-dom";

const CommingSoon = () => {
  const navigate = useNavigate();
  return (
    <Main>
      <Image src={image} alt="" />
      <BoldText>Coming Soon...</BoldText>
      <ParagraphText align="center">
        Uh oh, our apologies. The page you’re looking for is unavailable at the
        moment. However once it’s live, you’ll be the first to know.
      </ParagraphText>
      <ComingBtn onClick={() => navigate("/dashboard/business-registration")}>
        Back to Dashboard
      </ComingBtn>
    </Main>
  );
};

export default CommingSoon;
