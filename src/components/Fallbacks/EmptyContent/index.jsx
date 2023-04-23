import React from "react";
import { Container } from "./styled";
import { ReactComponent as EmptyContentSvg } from "asset/svg/EmptyContentSvg.svg";
import { CommonButton } from "components/button";

const EmptyContent = ({ emptyText, buttonText, action }) => {
  return (
    <Container>
      <EmptyContentSvg />
      <p>{emptyText}</p>
      {buttonText && <CommonButton text={buttonText} action={action} />}
    </Container>
  );
};

export default EmptyContent;
