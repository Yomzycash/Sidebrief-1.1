import styled from "styled-components";

export const DynamicFormWrapper = styled.form`
`;

export const Inputs = styled.div`
.service-form-input {
  height: 40px;
}

@media screen and (max-width: 700px) {
  display: flex;
  flex-flow: column;
  gap: 16px;
}
`

export const ButtonContainer = styled.div`
  padding-block: 32px;

`

export const buttonStyles = {
  maxWidth: "197px",
  width: "20%",
  height: "clamp(45px, 6vw, 56px)",
  padding: "0",
  minWidth: "100px",
};
