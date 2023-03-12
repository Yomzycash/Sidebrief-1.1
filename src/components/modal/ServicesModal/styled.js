import styled from "styled-components";

export const buttonStyles = {
  maxWidth: "197px",
  width: "20%",
  height: "clamp(45px, 6vw, 56px)",
  padding: "0",
  minWidth: "100px",
};

export const buttonContainerStyles = {
  justifyContent: "space-between",
  gap: "24px",
  margin: "clamp(20px, 5%, 30px) 0 clamp(20px, 5%, 40px) 0",
};

export const ServiceForms = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  gap: 0 clamp(20px, 3vw, 40px);

  /* left: ${({ progress }) =>
    progress === 1 ? 0 : progress === 2 ? "100%" : progress === 3 ? "200%" : ""}; */
`;

export const InputsWrapper = styled.div``;

export const Form = styled.form`
  padding: 0 clamp(20px, 3vw, 40px);
  min-width: 100%;
  width: 100%;
  max-width: 962px;

  .input-container-class {
    gap: clamp(6px, 0.6vw, 12px);
  }

  .input-label {
    font-size: clamp(12px, 1.2vw, 14px);
  }

  .input-class {
    height: clamp(40px, 3vw, 48px);
    margin-top: clamp(0, 0.4vw, 8px);
    padding: 0 clamp(12px, 1.2vw, 24px);

    input {
      font-size: clamp(12px, 1.2vw, 14px);
      ::placeholder {
        font-size: clamp(12px, 1.2vw, 14px);
      }
    }
  }

  .bottom-text-class {
    font-size: clamp(10px, 1.2vw, 12px);
    line-height: clamp(12px, 1.2vw, 21px);
  }
`;
