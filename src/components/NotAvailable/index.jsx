import React from "react";
import { BoldText, Main, ParagraphText } from "./styled";

const NotAvailable = ({ availableText }) => {
  return (
    <Main>
      <BoldText>{availableText}</BoldText>
      <ParagraphText>{availableText}</ParagraphText>
    </Main>
  );
};

export default NotAvailable;
