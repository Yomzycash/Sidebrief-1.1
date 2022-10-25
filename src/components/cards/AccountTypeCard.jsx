import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const AccountTypeCard = ({ title, body, to }) => {
  return (
    <NavLink to={to} style={{ textDecoration: "none" }}>
      <AccountType
        to={to}
        key="AccountType"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{
          scale: 1.07,
          border: "1px solid #00A2D4",
          transition: { duration: 0.3 },
        }}
      >
        <Title>{title}</Title>
        <Body> {body}</Body>
      </AccountType>
    </NavLink>
  );
};

export default AccountTypeCard;

const AccountType = styled(motion.div)`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: flex-start;
  border: 1px solid var(--BorderGrey);
  box-shadow: 0px 20px 25px -5px #9596971a, 0px 10px 10px -5px #9596970a;
  border-radius: 1rem;
  max-width: 25rem;
  padding: 2rem 1rem;
  gap: 0.5rem;
  height: 144px;
  background-color: white;

  @media screen and (max-width: 630px) {
    max-width: 100%;
  }
`;
const Title = styled.p`
  font-size: clamp(16px, 1.6vw, 20px);
  font-weight: 600;
  color: var(--SecondaryBlack);
`;
const Body = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: var(--PrimaryBlack);
  transition: 0.3s all ease;
`;
