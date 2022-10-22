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
  titleStyle,
  bodyStyle,
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
      <Title titlealign={titlealign} style={{ ...titleStyle }}>
        {" "}
        {title}
      </Title>
      <Body bodyalign={bodyalign} style={{ ...bodyStyle }}>
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
  gap: ${(props) => props.gap || "clamp(4px, 1.4vw, 8px)"};
`;

const Title = styled.div`
  display: flex;
  text-align: ${(props) => props.titlealign || "left"};
  font-size: clamp(20px, 2vw, 24px);
  color: #242627;
  font-weight: 700;
`;

const Body = styled.div`
  text-align: ${(props) => props.bodyalign || "left"};
  font-size: 14px;
  color: var(--PrimaryBlack);
  font-weight: 400;
  span {
    color: #00a2d4;
  }
`;
