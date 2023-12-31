import styled from "styled-components";

export const Container = styled.div``;

export const FormContainer = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
  border-top: solid 1px #edf1f6;
  padding: clamp(18px, 1.8vw, 20px) clamp(24px, 3.4vw, 40px);

  @media screen and (max-width: 600px) {
    padding-inline: 24px;
  }
`;

export const Body = styled.div``;

export const formStyle = {};

export const formInputsStyle = {
  display: "grid",
  gridTemplateColumns: "auto auto",
  gap: "16px",
};

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
