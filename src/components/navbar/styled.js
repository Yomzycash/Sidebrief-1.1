import { motion } from "framer-motion";
import styled from "styled-components";

export const NavWrapper = styled(motion.div)`
  position: sticky;
  top: 0;
  align-items: center;
  display: flex;
  flex-direction: row;
  padding: 30px clamp(16px, 5%, 58px);
  background-color: white;
  box-shadow: ${(props) =>
    props.boxShadow === true ? "0px 10px 15px -5px #9596971a" : ""};
`;

export const Image = styled.img`
  max-width: 134px;
  width: 18%;
  min-width: 84px;
`;
