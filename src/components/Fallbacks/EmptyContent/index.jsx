import React from "react";
import { Container } from "./styled";
import EmptyContentImg from "asset/svg/EmptyContentSvg.svg";
import { CommonButton } from "components/button";

const EmptyContent = ({ emptyText, buttonText, action }) => {
  return (
    <Container>
      <img src={EmptyContentImg} alt="" />
      <p>{emptyText}</p>
      {buttonText && <CommonButton text={buttonText} action={action} />}
    </Container>
  );
};

export default EmptyContent;
