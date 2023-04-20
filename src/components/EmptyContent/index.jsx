import React from "react";
import { EmptyContainer } from "./styled";
import { ReactComponent as EmptyContentSvg } from "asset/svg/EmptyContentSvg.svg";
import { CommonButton } from "components/button";

const EmptyContent = ({ emptyText, buttonText }) => {
  return (
    <EmptyContainer>
      <EmptyContentSvg />
      <p>{emptyText}</p>
      {buttonText && <CommonButton text={buttonText} />}
    </EmptyContainer>
  );
};

export default EmptyContent;
