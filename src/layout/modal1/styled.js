import styled from "styled-components";

export const modalStyle = {
  padding: 0,
  backgroundColor: "white",
  width: "100%",
  maxWidth: "962px",
  border: "solid red",
  borderRadius: "16px",
  boxShadow:
    "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)",
};

export const buttonStyles = {
  maxWidth: "197px",
  width: "20%",
  height: "clamp(45px, 6vw, 56px)",
  padding: "0",
  minWidth: "100px",
};

export const buttonContainerStyles = {
  justifyContent: "flex-end",
  gap: "24px",
  margin: "clamp(20px, 5%, 30px) 0 clamp(20px, 5%, 40px) 0",
};

export const Form = styled.form`
  padding: 0 clamp(20px, 3vw, 40px);
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

export const Title = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  font-size: clamp(15px, 1.5vw, 18px);
  font-weight: 400;
  color: #151717;
  padding: clamp(20px, 3vw, 40px) 0;
  border-bottom: 1px solid #edf1f7;
`;

export const TopIcons = styled.div`
  display: flex;
  gap: clamp(16px, 6vw, 60px);
`;

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: clamp(20px, 5%, 40px) 0;
`;

export const DeleteWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;
