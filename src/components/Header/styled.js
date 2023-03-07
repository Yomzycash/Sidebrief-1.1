import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  background: #ffffff;
  border-bottom: 1px solid #edf1f7;
  display: flex;
  align-items: center;
  height: clamp(90px, 15vw, 164px);
  gap: 12%;
  position: sticky;
  z-index: 4;
  top: 0;
  /* padding-inline: 8%; */
  padding-inline: clamp(24px, 3.4vw, 40px);
  box-shadow: ${(props) =>
    props.headerShadow === true ? "0px 10px 15px -5px #9596971a" : null};
`;

export const BackContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;
export const Text = styled.h3`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #151717;

  @media screen and (max-width: 700px) {
    display: none;
  }
`;

export const ProgressWrapper = styled.div`
  position: relative;
  left: -6%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const ModalWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 40px 0px;
  flex-flow: column;
`;
export const ModalButton = styled.div`
  display: flex;
  width: 80%;
`;
export const Question = styled.p`
  margin-bottom: 30px;
  font-size: clamp(16px, 1.5vw, 20px);
`;
export const Top = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 80%;
`;

export const CloseWrapper = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  padding: 10px;
  border-radius: 100%;
  background-color: #d7d7d7;
  margin-bottom: 20px;
`;
