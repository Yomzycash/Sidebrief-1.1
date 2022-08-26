import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const TextsWithLink = (props) => {
  return (
    <TextContainer
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 10, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {props.text.map((element) => {
        return (
          <p key={element.text}>
            {" "}
            {element.text}{" "}
            <Link to={element.link.to} style={{ textDecoration: "none" }}>
              <motion.span whileHover={{ color: "#03769a" }}>
                {element.link.text}
              </motion.span>
            </Link>
          </p>
        );
      })}
    </TextContainer>
  );
};

export default TextsWithLink;

const TextContainer = styled(motion.div)`
  display: inline;
  flex-flow: row wrap;
  font-size: clamp(14px, 1.8vw, 18px);
  p {
    display: inline;
    color: #4e5152;
  }
  span {
    color: var(--SecondaryBlue);
  }
`;
