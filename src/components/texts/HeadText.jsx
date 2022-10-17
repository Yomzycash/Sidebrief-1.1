import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const HeadText = ({
  title,
  body,
  align,
  justify,
  margintop,
  marginbottom,
  titlealign,
  bodyalign,
  gap,
  time,
}) => {
  return (
    <HeadTextCont
      key="HeadText"
      align={align}
      justify={justify}
      margintop={margintop}
      marginbottom={marginbottom}
      gap={gap}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 10, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title titlealign={titlealign}> {title}</Title>
      <Body bodyalign={bodyalign}>
        {body}
        <span> {time}</span>
      </Body>
    </HeadTextCont>
  );
};

export default HeadText;

const HeadTextCont = styled(motion.div)`
  display: flex;
  flex-flow: column wrap;
  align-items: ${(props) => props.align || "center"};
  justify-content: ${(props) => props.justify || "flex-start"};
  margin-top: ${(props) => props.margintop || "0"};
  margin-bottom: ${(props) => props.marginbottom || "0"};
  gap: ${(props) => props.gap || "8px"};
`;

const Title = styled.div`
  display: flex;
  text-align: ${(props) => props.titlealign || "left"};
  font-size: clamp(20px, 2vw, 28px);
  color: var(--SecondaryBlack);
  font-weight: 700;
`;
const Body = styled.div`
  text-align: ${(props) => props.bodyalign || "left"};
  font-size: clamp(14px, 1.5vw, 20px);
  color: var(--PrimaryBlack);
  font-weight: 400;
  /* max-width: 550px; */
  span {
    color: #00a2d4;
  }
`;
