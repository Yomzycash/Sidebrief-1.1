import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const TextsWithLink = ({ text, textStyle, linkStyle, $mobileResponsive }) => {
  return (
    <TextContainer
      key="TextWithLink"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 10, opacity: 0 }}
      transition={{ duration: 0.5 }}
      $mobileResponsive={$mobileResponsive}
    >
      {text.map((element) => {
        return (
          <p key={element.text} style={{ ...textStyle }}>
            {" "}
            {element.text}{" "}
            <Link
              to={element.link.to} 
              style={{ ...linkStyle }}
              onClick={element.action && element.action}
             
            >
              <motion.span
                key="TextWithLinkSpan"
                whileHover={{ color: "#03769a" }}
              >
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
  font-size: 14px;

  p {
    display: inline;
    color: #4e5152;
    text-align: center;
  }
  span {
    color: var(--SecondaryBlue);
  }

  a {
    text-decoration: none;
  }

  @media screen and (max-width: 1000px) {
    display: ${({ $mobileResponsive }) => $mobileResponsive && "none"};
  }
`;
