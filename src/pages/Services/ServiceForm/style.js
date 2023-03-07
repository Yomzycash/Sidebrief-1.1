import styled from "styled-components";

export const Container = styled.div``;

export const FormContainer = styled.div`
  border-top: solid 1px #edf1f6;
  padding: clamp(18px, 1.8vw, 20px) clamp(24px, 3.4vw, 40px);

  @media screen and (max-width: 600px) {
    padding-inline: 24px;
  }
`;

export const Bottom = styled.div`
  display: flex;
  width: 100%;
  padding: 32px clamp(24px, 3.4vw, 40px);
`;

export const Body = styled.div``;

export const formStyle = {};

export const formInputsStyle = {
  display: "grid",
  gridTemplateColumns: "auto auto",
  gap: "16px",
};
