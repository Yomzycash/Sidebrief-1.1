import styled from "styled-components";

export const DynamicFormWrapper = styled.form`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  gap: 32px;
  flex: 1;
`;

export const Inputs = styled.div`
  display: flex;
  flex-flow: column;
  gap: 8px;
`;

export const ButtonContainer = styled.div`
  padding-block: 32px;
`;

export const Bottom = styled.div`
  display: flex;
  width: 100%;
  /* padding: 32px clamp(24px, 3.4vw, 40px); */
`;

export const buttonStyles = {
  maxWidth: "197px",
  width: "20%",
  height: "clamp(45px, 6vw, 56px)",
  padding: "0",
  minWidth: "100px",
};
