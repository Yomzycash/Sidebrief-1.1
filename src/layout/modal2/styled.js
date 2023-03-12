import styled from "styled-components";

export const modalStyle = {
  backgroundColor: "white",
  width: "100% ",
  maxWidth: "962px",
  borderRadius: "16px",
  boxShadow:
    "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)",
  padding: "0 clamp(20px, 3vw, 40px)",
};

export const Top = styled.div`
  position: sticky;
  top: 0;
  padding-block: 15px;
  border-bottom: 1px solid #edf1f7;
  background-color: #fff;
  z-index: 2;
`;

export const Title = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  font-size: clamp(15px, 1.5vw, 18px);
  font-weight: 400;
  color: #151717;
  padding: clamp(18px, 3vw, 25px) 0;
`;

export const TopIcons = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(16px, 6vw, 60px);
`;

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: clamp(20px, 5%, 40px) 0;
  max-width: 100%;
  overflow-x: auto;
  position: relative;
`;

export const DeleteWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;

  input {
    color: #cb1b1b;
    padding: 8px 16px;
    width: 90%;
    border: 1px solid #cb1b1b;
    border-radius: 10px;
    background: none;
    outline: none;
    font-weight: 400;
    font-size: 14px;
    margin-right: 5px;
  }
`;

export const ProgressWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-bottom: 15px;
`;
