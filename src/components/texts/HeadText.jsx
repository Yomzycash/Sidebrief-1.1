import React from "react";
import styled from "styled-components";

const HeadText = ({
  title,
  body,
  align,
  justify,
  marginT,
  marginB,
  titleAlign,
  bodyAlign,
  gap,
}) => {
  return (
    <HeadTextCont
      align={align}
      justify={justify}
      marginT={marginT}
      marginB={marginB}
      gap={gap}
    >
      <Title titleAlign={titleAlign}> {title}</Title>
      <Body bodyAlign={bodyAlign}>{body}</Body>
    </HeadTextCont>
  );
};

export default HeadText;

const HeadTextCont = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: ${(props) => props.align || "center"};
  justify-content: ${(props) => props.justify || "flex-start"};
  margin-top: ${(props) => props.marginT || "0"};
  margin-bottom: ${(props) => props.marginB || "0"};
  gap: ${(props) => props.gap || "8px"};
`;

const Title = styled.div`
  display: flex;
  text-align: ${(props) => props.titleAlign || "left"};
  font-size: clamp(20px, 2vw, 28px);
  color: var(--SecondaryBlack);
  font-weight: 700;
`;
const Body = styled.div`
  text-align: ${(props) => props.bodyAlign || "left"};
  font-size: clamp(14px, 1.5vw, 20px);
  color: var(--PrimaryBlack);
  font-weight: 400;
  max-width: 550px;
`;
