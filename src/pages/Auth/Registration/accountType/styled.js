import styled from "styled-components";
import { motion } from "framer-motion";

export const AccountTypeMain = styled.div`
  @media screen and (max-width: 630px) {
    max-width: 90%;
    margin: auto;
  }
`;

export const AccountTypeCont = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 3rem;
  align-self: "center";
  padding: clamp(16px, 5%, 58px);
`;

export const AccountTypeBody = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  gap: 4rem;
  width: 100%;
  @media screen and (max-width: 630px) {
    align-items: flex-start;
  }
`;

export const Top = styled.div`
  @media screen and (max-width: 630px) {
    div {
      align-items: flex-start;
    }
  }
`;

export const Middle = styled(motion.div)`
  display: flex;
  justify-content: center;
  div {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    font-size: clamp(14px, 1.5vw, 16px);
    background-color: var(--PrimaryBlue);
    color: var(--SecondaryBlue);
    gap: 0.5rem;
    border-radius: 1rem;
    padding: 1rem;
    @media screen and (max-width: 630px) {
      width: 100%;
    }
  }
  @media screen and (max-width: 630px) {
    justify-content: flex-start;
    width: 100%;
  }
`;
export const Bottom = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  gap: 5%;
  width: 100%;
  @media screen and (max-width: 630px) {
    flex-flow: column;
    align-items: stretch;
    gap: 1rem;
    justify-content: flex-start;
  }
`;
export const AccountFooter = styled.div`
  display: flex;
  margin: 30px 0 20px;
  align-self: center;
  justify-self: center;
  align-items: center;
  padding: 0px auto;
  max-width: 381px;
  @media screen and (max-width: 630px) {
    padding: 0px 0px;
    justify-content: start;
  }
`;