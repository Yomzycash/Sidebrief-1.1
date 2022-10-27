import styled from "styled-components";
import { motion } from "framer-motion";

export const AccountTypeMain = styled.div`
  display: flex;
  flex-flow: column;

  @media screen and (max-width: 700px) {
    /* max-width: 90%; */
    margin: auto;
  }
`;

export const AccountTypeCont = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: clamp(48px, 10vw, 134px);
  align-self: "center";
  padding-inline: clamp(24px, 6vw, 80px);
  margin-top: clamp(48px, 9vw, 112px);
`;

export const AccountTypeBody = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  gap: clamp(32px, 5.5vw, 64px);
  width: 100%;
  @media screen and (max-width: 700px) {
    align-items: flex-start;
  }
`;

export const Top = styled.div`
  @media screen and (max-width: 700px) {
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
    font-size: clamp(14px, 1.4vw, 16px);
    background-color: var(--PrimaryBlue);
    color: var(--SecondaryBlue);
    gap: 0.5rem;
    border-radius: 1rem;
    padding: 1rem;
    @media screen and (max-width: 700px) {
      width: 100%;
    }
  }
  @media screen and (max-width: 700px) {
    justify-content: flex-start;
    width: 100%;
  }
`;
export const Bottom = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  gap: clamp(20px, 3vw, 64px);
  width: 100%;
  @media screen and (max-width: 700px) {
    flex-flow: column;
    align-items: stretch;
    /* gap: 1rem; */
    justify-content: flex-start;
  }
`;
export const AccountFooter = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 85px;
  /* align-self: center;
  justify-self: center; */
  align-items: center;
  padding: 0px auto;
  /* max-width: 381px; */
  width: 100%;

  @media screen and (max-width: 700px) {
    padding: 0px 0px;
    justify-content: flex-start;
  }
`;
